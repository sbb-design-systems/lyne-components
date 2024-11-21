import type { SbbImageElement } from '../../image.js';
import { isSafari } from '../dom.js';

export async function waitForImageReady(
  element: HTMLImageElement | SbbImageElement,
  timeoutInMilliseconds = 2 * 1000,
): Promise<void> {
  const imgElement =
    element.localName === 'sbb-image'
      ? (element.shadowRoot?.querySelector<HTMLImageElement>('.sbb-image__img') ?? null)
      : (element as HTMLImageElement);

  if (!imgElement) {
    throw new Error('img tag not found');
  }

  if (!element.complete) {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject('image loading timeout'), timeoutInMilliseconds);
      element.addEventListener('load', () => {
        clearTimeout(timeout);

        imgElement.decode().then(() => {
          if (isSafari && element.localName === 'sbb-image') {
            // On a test page this is only happening once (first time an image is loaded). Therefore, the impact is very small.
            setTimeout(resolve, 100);
          } else {
            resolve();
          }
        });
      });

      element.addEventListener('error', () => {
        clearTimeout(timeout);
        reject('image error');
      });
    });
  } else {
    await imgElement.decode();
  }
}
