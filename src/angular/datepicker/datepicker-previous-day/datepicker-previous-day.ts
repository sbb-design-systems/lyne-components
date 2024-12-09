import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/datepicker/datepicker-previous-day.js';

import { SbbDatepickerButton } from '@sbb-esta/lyne-angular/datepicker/common/datepicker-button';

@Directive({
  selector: 'sbb-datepicker-previous-day',
  standalone: true,
})
export class SbbDatepickerPreviousDay<T = Date> extends SbbDatepickerButton<T> {}
