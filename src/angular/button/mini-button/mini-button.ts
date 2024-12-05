import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/button/mini-button.js';
import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbNegativeMixin,
} from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-mini-button',
  standalone: true,
})
export class SbbMiniButton extends SbbDisabledTabIndexActionMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbButtonBaseElement)),
) {}
