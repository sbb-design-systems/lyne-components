/**
 * This file was AI generated.
 */

/**
 * Lists commits from `main` that are NOT present in a target branch.
 *
 * Usage:
 *   node scripts/missing-cherry-picks.ts --since <date> --target <branch> [--main <branch>]
 *
 * Required:
 *   --since   Start date (e.g. 2025-12-01)
 *   --target  Target branch to compare against (e.g. 4.x)
 *
 * Optional:
 *   --main    Source branch (default: main)
 *
 * Examples:
 *   node scripts/missing-cherry-picks.ts --since 2026-01-01 --target 4.x
 *   node scripts/missing-cherry-picks.ts --since 2025-12-01 --main main --target 4.x
 */

import { execSync } from 'node:child_process';

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

function getArg(name: string): string | undefined;
function getArg(name: string, fallback: string): string;
function getArg(name: string, fallback?: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

function requireArg(name: string): string {
  const value = getArg(name);
  if (!value) {
    console.error(`❌  Missing required argument: --${name}`);
    console.error(
      `\nUsage: node scripts/missing-cherry-picks.ts --since <date> --target <branch> [--main <branch>]`,
    );
    process.exit(1);
  }
  return value;
}

const since = requireArg('since');
const targetBranch = requireArg('target');
const mainBranch = getArg('main', 'main');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function run(cmd: string): string {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

interface Commit {
  hash: string;
  shortHash: string;
  date: string;
  subject: string;
  body: string;
}

/**
 * Parses `git log` output with the format `%H%x00%h%x00%as%x00%s%x00%b` (NUL-separated fields,
 * records separated by a unique delimiter) into an array of Commit objects.
 */
function parseLog(raw: string): Commit[] {
  if (!raw) return [];
  return raw
    .split('--COMMIT_END--\n')
    .map((record) => record.split('\x00'))
    .filter((parts) => parts.length >= 4)
    .map(([hash, shortHash, date, subject, body = '']) => ({
      hash: hash.trim(),
      shortHash,
      date,
      subject,
      body,
    }))
    .filter((c) => !!c.hash);
}

// ---------------------------------------------------------------------------
// Fetch latest refs (non-fatal – works in offline environments too)
// ---------------------------------------------------------------------------
try {
  console.log('Fetching latest refs …');
  run(`git fetch origin ${mainBranch} ${targetBranch} --quiet`);
} catch {
  console.warn('⚠️  Could not fetch from remote – using local refs.\n');
}

// ---------------------------------------------------------------------------
// Collect commits from `main` since the given date
// ---------------------------------------------------------------------------
const mainLog = run(
  `git log origin/${mainBranch} --since="${since}" --format="%H%x00%h%x00%as%x00%s%x00%b--COMMIT_END--"`,
);
const mainCommits = parseLog(mainLog);

if (mainCommits.length === 0) {
  console.log(`No commits found on ${mainBranch} since ${since}.`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Collect ALL commit subjects from target to detect cherry-picks.
//
// Git cherry-picks change the commit hash but preserve the subject line
// (unless edited manually).  We therefore match by:
//   1. Identical commit hash (direct merge / identical commit)
//   2. "Cherry-pick-of" notation: git sometimes records the original hash in
//      the commit message as "(cherry picked from commit <hash>)".
//   3. Identical subject line (heuristic, covers the vast majority of cases).
// ---------------------------------------------------------------------------
const targetFullLog = run(
  `git log origin/${targetBranch} --since="${since}" --format="%H%x00%h%x00%as%x00%s%x00%b--COMMIT_END--"`,
);
const targetCommits = parseLog(targetFullLog);

// Also collect the full commit messages of target commits to detect
// "(cherry picked from commit <hash>)" annotations.
const targetMessages = run(
  `git log origin/${targetBranch} --since="${since}" --format="%B%x00END_OF_COMMIT%x00"`,
);

// Build lookup sets for fast matching
const targetHashes = new Set(targetCommits.map((c) => c.hash));
const targetSubjects = new Set(targetCommits.map((c) => c.subject));

// Extract all "cherry picked from commit <hash>" hashes from target messages
const cherryPickedHashes = new Set<string>();
const cherryPickRegex = /cherry picked from commit ([0-9a-f]{40})/gi;
for (const match of targetMessages.matchAll(cherryPickRegex)) {
  cherryPickedHashes.add(match[1]);
}

// ---------------------------------------------------------------------------
// Find commits from `main` that are not accounted for in target branch
// ---------------------------------------------------------------------------
const RENOVATE_PATTERN = /^chore\(deps(-dev)?\):/i;
const BREAKING_CHANGE_PATTERN = /^breaking change:/im;
const CHANGELOG_PATTERN = /changelog/i;

const missing = mainCommits.filter(
  (c) =>
    !RENOVATE_PATTERN.test(c.subject) &&
    !BREAKING_CHANGE_PATTERN.test(c.body) &&
    !BREAKING_CHANGE_PATTERN.test(c.subject) &&
    !CHANGELOG_PATTERN.test(c.subject) &&
    !targetHashes.has(c.hash) &&
    !cherryPickedHashes.has(c.hash) &&
    !targetSubjects.has(c.subject),
);

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
const remoteUrl = (() => {
  try {
    return run('git remote get-url origin').replace(/\.git$/, '');
  } catch {
    return null;
  }
})();

const isGitHub = remoteUrl?.includes('github.com');

console.log('');
console.log('='.repeat(72));
console.log(`Commits on '${mainBranch}' since ${since} NOT found in '${targetBranch}'`);
console.log('='.repeat(72));
console.log('');

if (missing.length === 0) {
  console.log('✅  All commits from main are present in the target branch.');
} else {
  console.log(`Found ${missing.length} commit(s) that appear to be missing:\n`);

  for (const c of missing) {
    const link = isGitHub && remoteUrl ? `  ${remoteUrl}/commit/${c.hash}` : '';
    console.log(`  ${c.date}  ${c.shortHash}  ${c.subject}${link ? `\n${link}` : ''}`);
  }

  console.log('');
  console.log(
    'Note: Matching is done by commit hash, cherry-pick annotation, and\n' +
      'subject line. Commits with manually edited subjects may still appear\n' +
      'here even if they were cherry-picked.',
  );
}
