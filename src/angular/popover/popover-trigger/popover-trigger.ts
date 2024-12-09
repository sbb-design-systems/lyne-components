import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/popover/popover-trigger.js';

import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbNegativeMixin,
} from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-popover-trigger',
  standalone: true,
})
export class SbbPopoverTrigger extends SbbDisabledTabIndexActionMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbButtonBaseElement)),
) {}
