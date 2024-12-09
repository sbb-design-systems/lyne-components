import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/secondary-button-static.js';

import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-secondary-button-static',
  standalone: true,
})
export class SbbSecondaryButtonStatic extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(HTMLElement),
) {}
