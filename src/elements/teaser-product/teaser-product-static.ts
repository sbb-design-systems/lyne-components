/** @entrypoint */
import { SbbTeaserProductStaticElement } from './teaser-product-static/teaser-product-static.component.ts';

export * from './teaser-product-static/teaser-product-static.component.ts';

SbbTeaserProductStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/teaser-product/teaser-product-static.js' has been deprecated.
Use either '@sbb-esta/elements/teaser-product.js' or '@sbb-esta/elements/teaser-product.pure.js' instead.`);
