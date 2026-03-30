/** @entrypoint */
import { SbbLinkButtonElement } from '../link.pure.ts';

export * from './link-button/link-button.component.ts';

SbbLinkButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link/link-button.js' has been deprecated.
Use either '@sbb-esta/elements/link.js' or '@sbb-esta/elements/link.pure.js' instead.`);
