/** @entrypoint */
import { SbbTagElement } from './tag/tag.component.ts';

export * from './tag/tag.component.ts';

SbbTagElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/tag/tag.js' has been deprecated.
Use either '@sbb-esta/elements/tag.js' or '@sbb-esta/elements/tag.pure.js' instead.`);
