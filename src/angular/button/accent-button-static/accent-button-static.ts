import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/accent-button-static.js';

import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-accent-button-static',
  standalone: true,
})
export class SbbAccentButtonStatic extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(HTMLElement),
) {}
