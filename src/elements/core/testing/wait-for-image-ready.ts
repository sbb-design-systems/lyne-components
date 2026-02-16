import type { SbbImageElement } from '../../image.ts';
import { isSafari } from '../dom.ts';

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

  if (!imgElement.complete) {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject('image loading timeout'), timeoutInMilliseconds);
      imgElement.addEventListener('load', () => {
        clearTimeout(timeout);

        if (!imgElement.complete || isSafari) {
          imgElement.decode().then(() => resolve());
        } else {
          resolve();
        }
      });

      imgElement.addEventListener('error', () => {
        clearTimeout(timeout);
        reject('image error');
      });
    });
  } else if (isSafari) {
    await imgElement.decode();
  }
}
