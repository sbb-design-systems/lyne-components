import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cacheLocation = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../node_modules/.cache/lyne-cdn',
);
const preloadFontList = [
  [400, 'https://cdn.app.sbb.ch/fonts/v1_9_subset/SBBWeb-Roman.woff2'],
  [700, 'https://cdn.app.sbb.ch/fonts/v1_9_subset/SBBWeb-Bold.woff2'],
  [300, 'https://cdn.app.sbb.ch/fonts/v1_9_subset/SBBWeb-Light.woff2'],
] as const;

export interface PreloadedFont {
  weight: number;
  font: string;
}

async function downloadFont(fontUrl: string): Promise<ArrayBuffer> {
  // Performing too many HTTP requests in parallel or sequence causes fetch to fail.
  // We add a delay for each request to prevent the request failure.
  await new Promise((r) => setTimeout(r, 20));

  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(fontUrl);
      return await r.arrayBuffer();
    } catch (e) {
      lastError = e;
      if (attempt < 3) {
        console.warn(`Failed to fetch ${fontUrl} (attempt ${attempt}/3), retrying in 1s...`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }
  throw lastError;
}

export async function preloadFonts(): Promise<PreloadedFont[]> {
  mkdirSync(cacheLocation, { recursive: true });

  const preloadedFonts: PreloadedFont[] = [];
  console.log(`Preloading fonts`);
  for (const [weight, fontUrl] of preloadFontList) {
    const fontFile = basename(fontUrl);

    // E.g. v1_9_subset
    const version = basename(dirname(fontUrl));
    const fontCachePath = join(cacheLocation, `${version}-${fontFile}`);
    if (!existsSync(fontCachePath)) {
      console.log(`Fetching ${fontFile} from ${fontUrl} and caching to ${fontCachePath}`);
      let font: ArrayBuffer;
      try {
        font = await downloadFont(fontUrl);
      } catch (e) {
        console.log(`Failed to fetch ${fontUrl}`);
        throw e;
      }

      writeFileSync(fontCachePath, Buffer.from(font), 'utf8');
    } else {
      console.log(`Using cached font ${fontFile} from ${fontCachePath}`);
    }
    const fontBuffer = readFileSync(fontCachePath);
    preloadedFonts.push({
      weight,
      font: `url(data:font-woff2;charset=utf-8;base64,${fontBuffer.toString('base64')}) format('woff2')`,
    });
    console.log(`${fontFile}:${createHash('sha256').update(fontBuffer).digest('hex')}`);
  }
  console.log(`Finished preloading fonts`);
  return preloadedFonts;
}
