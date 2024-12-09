import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/navigation/navigation-button.js';

import { SbbButtonBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbNavigationActionCommonElementMixin } from '@sbb-esta/lyne-angular/navigation/common/navigation-action-common.js';

@Directive({
  selector: 'sbb-navigation-button',
  standalone: true,
})
export class SbbNavigationButton extends SbbNavigationActionCommonElementMixin(
  SbbButtonBaseElement,
) {}
