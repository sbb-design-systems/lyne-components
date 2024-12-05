import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/accent-button.js';
import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-accent-button',
  standalone: true,
})
export class SbbAccentButton extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}
