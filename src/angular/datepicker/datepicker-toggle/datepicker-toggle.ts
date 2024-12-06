import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { CalendarView } from '@sbb-esta/lyne-elements/calendar.js';
import type { SbbDatepickerToggleElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker.js';

import '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-datepicker-toggle',
  standalone: true,
})
export class SbbDatepickerToggle<T = Date> extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbDatepickerToggleElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datePicker = value));
  }
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datePicker;
  }

  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }
}
