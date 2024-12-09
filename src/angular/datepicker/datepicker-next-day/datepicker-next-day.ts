import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/datepicker/datepicker-next-day.js';

import { SbbDatepickerButton } from '@sbb-esta/lyne-angular/datepicker/common/datepicker-button';

@Directive({
  selector: 'sbb-datepicker-next-day',
  standalone: true,
})
export class SbbDatepickerNextDay<T = Date> extends SbbDatepickerButton<T> {}
