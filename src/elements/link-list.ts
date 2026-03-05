/** @entrypoint */
import { SbbLinkListAnchorElement } from './link-list-anchor.pure.ts';
import { SbbLinkListElement } from './link-list.pure.ts';

export * from './link-list.pure.ts';

SbbLinkListElement.define();
// TODO(breaking-change): Remove anchor variant export
SbbLinkListAnchorElement.define();
