import type { SbbImageElement } from '../../image.js';
import { isSafari } from '../dom.js';

const safariAdditionalWaitTime = 500;

export async function waitForImageReady(
  element: HTMLImageElement | SbbImageElement,
  timeoutInMilliseconds = 2 * 1000,
): Promise<void> {
  if (!element.complete) {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject('image loading timeout'), timeoutInMilliseconds);
      element.addEventListener('load', () => {
        clearTimeout(timeout);
        if (isSafari) {
          setTimeout(resolve, safariAdditionalWaitTime);
        } else {
          resolve();
        }
      });
      element.addEventListener('error', () => {
        clearTimeout(timeout);
        reject('image error');
      });
    });
  } else if (isSafari) {
    await new Promise((resolve) => setTimeout(resolve, safariAdditionalWaitTime));
  }
}
