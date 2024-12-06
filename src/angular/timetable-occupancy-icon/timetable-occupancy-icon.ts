import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.ts';
import type { SbbTimetableOccupancyIconElement } from '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';

import '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';
import { SbbIconBase } from '@sbb-esta/lyne-angular/icon/icon-base';

@Directive({
  selector: 'sbb-timetable-occupancy-icon',
  standalone: true,
})
export class SbbTimetableOccupancyIcon extends SbbNegativeMixin(SbbIconBase) {
  #element = inject(ElementRef<SbbTimetableOccupancyIconElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set occupancy(value: SbbOccupancy) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.occupancy = value));
  }
  public get occupancy(): SbbOccupancy {
    return this.#element.nativeElement.occupancy;
  }
}
