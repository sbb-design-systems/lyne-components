import type { SbbImageElement } from '../../image.js';
import { isSafari } from '../dom.js';

export async function waitForImageReady(
  element: HTMLImageElement | SbbImageElement,
  timeoutInMilliseconds = 2 * 1000,
): Promise<void> {
  if (!element.complete) {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject('image loading timeout'), timeoutInMilliseconds);
      element.addEventListener('load', () => {
        clearTimeout(timeout);
        if (element instanceof HTMLImageElement) {
          element.decode().then(resolve);
        } else if (isSafari && element.localName === 'sbb-image') {
          // On a test this is only happening once (first time an image is loaded). Therefore, the impact is very small.
          setTimeout(resolve, 200);
        } else {
          resolve();
        }
      });
      element.addEventListener('error', () => {
        clearTimeout(timeout);
        reject('image error');
      });
    });
  } else if (element instanceof HTMLImageElement) {
    await element.decode();
  }
}
