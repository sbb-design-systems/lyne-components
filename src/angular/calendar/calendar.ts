import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { CalendarView, SbbCalendarElement } from '@sbb-esta/lyne-elements/calendar.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/calendar.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-calendar',
  standalone: true,
})
export class SbbCalendar<T = Date> {
  #element = inject(ElementRef<SbbCalendarElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
  }

  @Input({ alias: 'date-filter' })
  public set dateFilter(value: ((date: T | null) => boolean) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): ((date: T | null) => boolean) | null {
    return this.#element.nativeElement.dateFilter;
  }

  @Output() public dateSelected: Observable<T> = fromEvent(
    this.#element.nativeElement,
    'dateSelected',
  );

  public get min(): T | null {
    return this.#element.nativeElement.min;
  }

  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  public get now(): T {
    return this.#element.nativeElement.now;
  }

  public get selected(): T | null {
    return this.#element.nativeElement.selected;
  }

  public resetPosition(): void {
    return this.#element.nativeElement.resetPosition();
  }
}
