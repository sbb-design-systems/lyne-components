import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/button-link.js';

import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import {
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbLinkBaseElement,
} from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-button-link',
  standalone: true,
})
export class SbbButtonLink extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {}
