import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/form-error.js';

import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-form-error',
  standalone: true,
})
export class SbbFormError extends SbbNegativeMixin(HTMLElement) {}
