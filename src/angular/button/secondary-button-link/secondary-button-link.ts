import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/secondary-button-link.js';
import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import {
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbLinkBaseElement,
} from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-secondary-button-link',
  standalone: true,
})
export class SbbSecondaryButtonLink extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {}
