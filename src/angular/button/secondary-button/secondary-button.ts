import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/secondary-button.js';
import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-secondary-button',
  standalone: true,
})
export class SbbSecondaryButton extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}
