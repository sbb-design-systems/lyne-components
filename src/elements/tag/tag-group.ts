/** @entrypoint */
import { SbbTagGroupElement } from './tag-group/tag-group.component.ts';

export * from './tag-group/tag-group.component.ts';

SbbTagGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/tag/tag-group.js' has been deprecated.
Use either '@sbb-esta/elements/tag.js' or '@sbb-esta/elements/tag.pure.js' instead.`);
