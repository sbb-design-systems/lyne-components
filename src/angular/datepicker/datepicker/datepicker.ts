import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type {
  SbbDateLike,
  SbbValidationChangeEvent,
} from '@sbb-esta/lyne-elements/core/interfaces.js';
import type {
  SbbDatepickerElement,
  SbbInputUpdateEvent,
} from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/datepicker/datepicker.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-datepicker',
  standalone: true,
})
export class SbbDatepicker<T = Date> extends HTMLElement {
  #element = inject(ElementRef<SbbDatepickerElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  @Input()
  public set dateFilter(value: (date: T | null) => boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): (date: T | null) => boolean {
    return this.#element.nativeElement.dateFilter;
  }

  @Input()
  public set input(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.input = value));
  }
  public get input(): string | HTMLElement | null {
    return this.#element.nativeElement.input;
  }

  @Input()
  public set now(value: SbbDateLike<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): SbbDateLike<T> | null {
    return this.#element.nativeElement.now;
  }

  @Input()
  public set valueAsDate(value: SbbDateLike<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): SbbDateLike<T> | null {
    return this.#element.nativeElement.valueAsDate;
  }

  @Output() public change: Observable<void> = fromEvent(this.#element.nativeElement, 'change');

  @Output() public inputUpdated: Observable<SbbInputUpdateEvent> = fromEvent(
    this.#element.nativeElement,
    'inputUpdated',
  );

  @Output() public datePickerUpdated: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'datePickerUpdated',
  );

  @Output() public validationChange: Observable<SbbValidationChangeEvent> = fromEvent(
    this.#element.nativeElement,
    'validationChange',
  );

  public findPreviousAvailableDate(date: T): T {
    return this.#element.nativeElement.findPreviousAvailableDate(date);
  }

  public findNextAvailableDate(date: T): T {
    return this.#element.nativeElement.findNextAvailableDate(date);
  }
}
