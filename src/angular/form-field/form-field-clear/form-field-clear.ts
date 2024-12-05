import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/form-field/form-field-clear.js';
import { SbbButtonBaseElement, SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-form-field-clear',
  standalone: true,
})
export class SbbFormFieldClear extends SbbNegativeMixin(SbbButtonBaseElement) {}
