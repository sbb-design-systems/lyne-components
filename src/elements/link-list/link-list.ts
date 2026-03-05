/** @entrypoint */
import { SbbLinkListElement } from './link-list.component.ts';

export * from './link-list.component.ts';

SbbLinkListElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link-list/link-list.js' has been deprecated.
Use either '@sbb-esta/elements/link-list.js' or '@sbb-esta/elements/link-list.pure.js' instead.`);
