import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, extname } from 'path';

import type { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';

import type { Meta } from '../../src/visual-regression-app/src/interfaces.ts';

const metaFileName = 'meta.json';
const branch =
  process.env.GITHUB_REF_NAME ??
  process.env.BRANCH ??
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const baselineUrl = process.env.GITHUB_ACTIONS
  ? 'http://visual-regression:8080/'
  : 'https://lyne-visual-regression-baseline.app.sbb.ch/';

// Importing distDir doesn't work
const screenshotsDir = new URL(`screenshots/`, new URL('../../dist/', import.meta.url));

let meta: Partial<Meta> = {
  gitSha: process.env.RELEVANT_SHA ?? 'local',
};

let baselineMeta;
try {
  const response = await fetch(`${baselineUrl}${metaFileName}`);
  baselineMeta = JSON.parse(await response.text()) satisfies Meta;
  meta = { ...meta, baselineGitSha: baselineMeta.gitSha ?? 'N/A' };
} catch {
  meta = { ...meta, baselineGitSha: 'N/A' };
}

if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}
writeFileSync(new URL(`./${metaFileName}`, screenshotsDir), JSON.stringify(meta), 'utf8');

export const visualRegressionConfig = {
  baseDir: 'dist/screenshots',
  diffOptions: { threshold: 0.03 },
  async getBaseline({ filePath, name }) {
    const baselineFileUrl = baselineUrl + name + extname(filePath);
    const infoFilePath = filePath + '.json';
    const info = existsSync(infoFilePath) ? JSON.parse(readFileSync(infoFilePath, 'utf8')) : {};
    if (existsSync(filePath) && info.branch === branch) {
      return readFileSync(filePath);
    } else if (existsSync(filePath) && info.etag) {
      try {
        const response = await fetch(baselineFileUrl, {
          method: 'HEAD',
          headers: { 'if-none-match': info.etag },
        });

        if (response.status === 304) {
          return readFileSync(filePath);
        } else if (response.status === 404) {
          return undefined;
        }
      } catch {
        return undefined;
      }
    }

    // If the image address is not reachable, fetch throws, so we wrap it in try/catch.
    try {
      const response = await fetch(baselineFileUrl);
      if (response.ok) {
        const etag = response.headers.get('etag');
        const buffer = Buffer.from(await response.arrayBuffer());
        mkdirSync(dirname(filePath), { recursive: true });
        writeFileSync(filePath, buffer);
        writeFileSync(infoFilePath, JSON.stringify({ etag }, null, 2), 'utf8');

        return buffer;
      }
    } catch {
      return undefined;
    }
  },
  saveBaseline({ filePath, content }) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
    writeFileSync(
      filePath + '.json',
      JSON.stringify({ branch, etag: createHash('sha256').update(content).digest('hex') }),
      'utf8',
    );
  },
} satisfies Parameters<typeof visualRegressionPlugin>[0];
