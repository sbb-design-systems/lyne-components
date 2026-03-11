/** @entrypoint */
import { SbbCheckboxGroupElement } from './checkbox-group.pure.ts';
import { SbbCheckboxPanelElement } from './checkbox-panel.pure.ts';
import { SbbCheckboxElement } from './checkbox.pure.ts';

export * from './checkbox.pure.ts';
export * from './checkbox-group.pure.ts';
export * from './checkbox-panel.pure.ts';
// TODO(breaking-change): Remove group and panel exports/imports.

SbbCheckboxElement.define();
SbbCheckboxGroupElement.define();
SbbCheckboxPanelElement.define();
