import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const releaseVersion = process.env.VERSION?.trim() || null;
const dryRun = !process.env.CI;
const distDir = fileURLToPath(new URL('../dist/', import.meta.url));

interface PackageJson {
  name: string;
  version: string;
  keywords?: string[];
}

if (dryRun) {
  console.log('Running in dry-run mode. No packages will be published to npm.');
}

const packages = readdirSync(distDir, { withFileTypes: true, recursive: true })
  .filter((d) => d.name === 'package.json')
  .map((d) => join(d.parentPath, d.name));
for (const packagePath of packages) {
  const packageContent = readFileSync(packagePath, 'utf-8');
  const pkg = JSON.parse(packageContent) as PackageJson;
  if (!pkg.name.startsWith('@sbb-esta/')) {
    throw new Error(`Unexpected package name ${pkg.name} in ${packagePath}`);
  }

  const latestInfo = (await fetch(`https://registry.npmjs.org/${pkg.name}/latest`).then((r) =>
    r.json(),
  )) as PackageJson;
  const latestMajor = parseInt(latestInfo.version.split('.')[0]);
  const releaseMajor = parseInt(pkg.version.split('.')[0]);
  const tag = pkg.version.includes('-')
    ? 'next'
    : latestMajor <= releaseMajor
      ? 'latest'
      : `v${releaseMajor}-lts`;
  const publish = (): void => {
    console.log(`Publishing ${pkg.name} with version ${pkg.version} to npm with tag ${tag}`);
    execSync(`npm publish --tag ${tag}${dryRun ? ' --dry-run' : ''}`, {
      stdio: 'inherit',
      cwd: dirname(packagePath),
    });
  };

  if (releaseVersion) {
    publish();
  }

  pkg.name += '-dev';
  pkg.version += `-dev.${Math.floor(Date.now() / 1000)}`;
  pkg.keywords = [
    ...(pkg.keywords || []),
    `https://github.com/${process.env.GITHUB_REPOSITORY}/commit/${process.env.GITHUB_SHA}`,
  ];
  try {
    writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');
    publish();
  } finally {
    writeFileSync(packagePath, packageContent, 'utf8');
  }
}
