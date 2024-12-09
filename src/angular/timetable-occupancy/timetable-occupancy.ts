import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.ts';
import type { SbbTimetableOccupancyElement } from '@sbb-esta/lyne-elements/timetable-occupancy.js';
import '@sbb-esta/lyne-elements/timetable-occupancy.js';

import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-timetable-occupancy',
  standalone: true,
})
export class SbbTimetableOccupancy extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbTimetableOccupancyElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'first-class-occupancy' })
  public set firstClassOccupancy(value: SbbOccupancy | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.firstClassOccupancy = value));
  }
  public get firstClassOccupancy(): SbbOccupancy | null {
    return this.#element.nativeElement.firstClassOccupancy;
  }

  @Input({ alias: 'second-class-occupancy' })
  public set secondClassOccupancy(value: SbbOccupancy | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.secondClassOccupancy = value),
    );
  }
  public get secondClassOccupancy(): SbbOccupancy | null {
    return this.#element.nativeElement.secondClassOccupancy;
  }
}
