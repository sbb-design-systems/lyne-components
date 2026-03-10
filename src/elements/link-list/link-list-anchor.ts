/** @entrypoint */
import { SbbLinkListAnchorElement } from '../link-list-anchor.pure.ts';

export * from '../link-list-anchor/link-list-anchor.component.ts';

export * from './link-list.component.ts';

SbbLinkListAnchorElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link-list/link-list-anchor.js' has been deprecated.
Use either '@sbb-esta/elements/link-list-anchor.js' or '@sbb-esta/elements/link-list-anchor.pure.js' instead.`);
