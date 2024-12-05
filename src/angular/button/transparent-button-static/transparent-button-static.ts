import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/transparent-button-static.js';
import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-transparent-button-static',
  standalone: true,
})
export class SbbTransparentButtonStatic extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(HTMLElement),
) {}
