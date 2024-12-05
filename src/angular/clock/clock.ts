import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbClockElement } from '@sbb-esta/lyne-elements/clock.js';
import '@sbb-esta/lyne-elements/clock.js';
import type { SbbTime } from '@sbb-esta/lyne-elements/core/interfaces.js';

@Directive({
  selector: 'sbb-clock',
  standalone: true,
})
export class SbbClock extends HTMLElement {
  #element = inject(ElementRef<SbbClockElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set now(value: SbbTime | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): SbbTime | null {
    return this.#element.nativeElement.now;
  }
}
