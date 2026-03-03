/** @entrypoint */
export * from './common/teaser-product-common.ts';

export { default as teaserProductCommonStyle } from './common/teaser-product-common.scss?lit&inline';

console.warn(`The entrypoint '@sbb-esta/elements/teaser-product/common.js' has been deprecated.
Use either '@sbb-esta/elements/teaser-product.js' or '@sbb-esta/elements/teaser-product.pure.js' instead.`);
