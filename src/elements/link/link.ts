/** @entrypoint */
import { SbbLinkElement } from '../link.pure.ts';

export * from './link/link.component.ts';

SbbLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link/link.js' has been deprecated.
Use either '@sbb-esta/elements/link.js' or '@sbb-esta/elements/link.pure.js' instead.`);
