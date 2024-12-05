import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/menu/menu-button.js';
import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';
import { SbbMenuActionCommonElementMixin } from '@sbb-esta/lyne-angular/menu/common/menu-action-common';

@Directive({
  selector: 'sbb-menu-button',
  standalone: true,
})
export class SbbMenuButton extends SbbDisabledTabIndexActionMixin(
  SbbMenuActionCommonElementMixin(SbbButtonBaseElement),
) {}
