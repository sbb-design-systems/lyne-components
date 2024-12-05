import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/transparent-button.js';
import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-transparent-button',
  standalone: true,
})
export class SbbTransparentButton extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}
