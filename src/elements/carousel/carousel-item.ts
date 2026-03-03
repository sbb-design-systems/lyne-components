/** @entrypoint */
import { SbbCarouselItemElement } from './carousel-item/carousel-item.component.ts';

export * from './carousel-item/carousel-item.component.ts';

SbbCarouselItemElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/carousel/carousel-item.js' has been deprecated.
Use either '@sbb-esta/elements/carousel.js' or '@sbb-esta/elements/carousel.pure.js' instead.`);
