import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/accent-button-link.js';

import { SbbButtonCommonElementMixin } from '@sbb-esta/lyne-angular/button/common/button-common.js';
import {
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbLinkBaseElement,
} from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-accent-button-link',
  standalone: true,
})
export class SbbAccentButtonLink extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {}
