// TODO(breaking-change): Move to private testing and use aTimeout()

import type { SbbImageElement } from '../../image.js';
import { isSafari } from '../dom.js';

// Images in Safari are sometimes not displayed, even if it is complete or the load event was fired.
// After resizing, the image does render.
async function triggerImageRendering(
  imgElement: HTMLImageElement | SbbImageElement,
): Promise<void> {
  imgElement.style.width = '1px';
  await new Promise((resolve) => setTimeout(resolve, 0));
  imgElement.style.removeProperty('width');
  await new Promise((resolve) => setTimeout(resolve, 0));
}

export async function waitForImageReady(
  element: HTMLImageElement | SbbImageElement,
  timeoutInMilliseconds = 2 * 1000,
): Promise<void> {
  if (!element.complete) {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject('image loading timeout'), timeoutInMilliseconds);
      element.addEventListener('load', () => {
        clearTimeout(timeout);
        if (isSafari && element instanceof HTMLImageElement) {
          triggerImageRendering(element).then(resolve);
        } else {
          resolve();
        }
      });
      element.addEventListener('error', () => {
        clearTimeout(timeout);
        reject('image error');
      });
    });
  } else if (isSafari && element instanceof HTMLImageElement) {
    await triggerImageRendering(element);
  }
}
