/** @entrypoint */
import { SbbCarouselListElement } from './carousel-list/carousel-list.component.ts';

export * from './carousel-list/carousel-list.component.ts';

SbbCarouselListElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/carousel/carousel-list.js' has been deprecated.
Use either '@sbb-esta/elements/carousel.js' or '@sbb-esta/elements/carousel.pure.js' instead.`);
