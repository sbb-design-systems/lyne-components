import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';

const baselineUrl = 'http://localhost:8080/'; //'https://lyne-visual-regression-baseline.app.sbb.ch/';

export const visualRegressionConfig = (update) =>
  /** @type {Parameters<import('@web/test-runner-visual-regression/plugin').visualRegressionPlugin>[0]} */
  ({
    update,
    baseDir: 'dist/screenshots',
    async getBaseline({ filePath, baseDir, name }) {
      if (existsSync(filePath)) {
        return readFileSync(filePath);
      }

      const cacheFile = join(baseDir, '.cache', name + extname(filePath));
      const cacheFileDetails = cacheFile + '.json';
      mkdirSync(dirname(cacheFile), { recursive: true });
      const baselineFileUrl = baselineUrl + name + extname(filePath);
      const downloadFile = async () => {
        try {
          const response = await fetch(baselineFileUrl);

          if (response.ok) {
            writeFileSync(cacheFile, Buffer.from(new Uint8Array(await response.arrayBuffer())));
            writeFileSync(
              cacheFileDetails,
              JSON.stringify({ etag: response.headers.get('etag') }, null, 2),
              'utf8',
            );

            return readFileSync(cacheFile);
          }
        } catch {
          /* empty */
        }
      };

      if (existsSync(cacheFileDetails)) {
        const details = JSON.parse(readFileSync(cacheFileDetails));
        const response = await fetch(baselineFileUrl, {
          method: 'HEAD',
          headers: { 'if-none-match': details.etag },
        });
        if (response.status === 200) {
          return await downloadFile();
        } else if (response.status === 404) {
          unlinkSync(cacheFile);
          unlinkSync(cacheFileDetails);
        } else if (response.status === 304) {
          return readFileSync(cacheFile);
        } else {
          console.error(`Unexpected response from baseline service: ${response.status} (${name})`);
        }
      } else {
        return await downloadFile();
      }
    },
  });
