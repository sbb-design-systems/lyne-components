import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbDatepickerButton as SbbDatepickerButtonElement } from '@sbb-esta/lyne-elements/datepicker/common';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker/datepicker';

import { SbbButtonBaseElement, SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

export abstract class SbbDatepickerButton<T = Date> extends SbbNegativeMixin(SbbButtonBaseElement) {
  #element = inject(ElementRef<SbbDatepickerButtonElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datePicker = value));
  }
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datePicker;
  }
}
