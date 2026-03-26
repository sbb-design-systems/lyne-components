/** @entrypoint */
import { SbbBlockLinkStaticElement } from '../link.pure.ts';

export * from './block-link-static/block-link-static.component.ts';

SbbBlockLinkStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link/block-link-static.js' has been deprecated.
Use either '@sbb-esta/elements/link.js' or '@sbb-esta/elements/link.pure.js' instead.`);
