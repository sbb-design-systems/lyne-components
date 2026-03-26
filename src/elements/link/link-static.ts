/** @entrypoint */
import { SbbLinkStaticElement } from '../link.pure.ts';

export * from './link-static/link-static.component.ts';

SbbLinkStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/link/link-static.js' has been deprecated.
Use either '@sbb-esta/elements/link.js' or '@sbb-esta/elements/link.pure.js' instead.`);
