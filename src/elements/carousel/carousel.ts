/** @entrypoint */
import { SbbCarouselElement } from './carousel/carousel.component.ts';

export * from './carousel/carousel.component.ts';

SbbCarouselElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/carousel/carousel.js' has been deprecated.
Use either '@sbb-esta/elements/carousel.js' or '@sbb-esta/elements/carousel.pure.js' instead.`);
