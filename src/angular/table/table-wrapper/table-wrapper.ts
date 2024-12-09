import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/table/table-wrapper.js';

import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-table-wrapper',
  standalone: true,
})
export class SbbTableWrapper extends SbbNegativeMixin(HTMLElement) {}
