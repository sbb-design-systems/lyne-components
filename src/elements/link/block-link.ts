/** @entrypoint */
import { SbbBlockLinkElement } from '../link.pure.ts';

export * from './block-link/block-link.component.ts';

SbbBlockLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link/block-link.js' has been deprecated.
Use either '@sbb-esta/elements/link.js' or '@sbb-esta/elements/link.pure.js' instead.`);
