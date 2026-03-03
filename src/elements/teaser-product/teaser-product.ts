/** @entrypoint */
import { SbbTeaserProductElement } from './teaser-product/teaser-product.component.ts';

export * from './teaser-product/teaser-product.component.ts';

SbbTeaserProductElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/teaser-product/teaser-product.js' has been deprecated.
Use either '@sbb-esta/elements/teaser-product.js' or '@sbb-esta/elements/teaser-product.pure.js' instead.`);
