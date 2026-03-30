/** @entrypoint */
import { SbbBlockLinkButtonElement } from '../link.pure.ts';

export * from './block-link-button/block-link-button.component.ts';

SbbBlockLinkButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link/block-link-button.js' has been deprecated.
Use either '@sbb-esta/elements/link.js' or '@sbb-esta/elements/link.pure.js' instead.`);
