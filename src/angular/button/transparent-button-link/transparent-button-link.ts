import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/transparent-button-link.js';
import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import {
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbLinkBaseElement,
} from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-transparent-button-link',
  standalone: true,
})
export class SbbTransparentButtonLink extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {}
