import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import type {
  InterfaceSbbJourneySummaryAttributes,
  SbbJourneySummaryElement,
} from '@sbb-esta/lyne-elements-experimental/journey-summary.js';
import '@sbb-esta/lyne-elements-experimental/journey-summary.js';

@Directive({
  selector: 'sbb-journey-summary',
  standalone: true,
})
export class SbbJourneySummary extends HTMLElement {
  #element = inject(ElementRef<SbbJourneySummaryElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set trip(value: InterfaceSbbJourneySummaryAttributes) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trip = value));
  }
  public get trip(): InterfaceSbbJourneySummaryAttributes {
    return this.#element.nativeElement.trip;
  }

  @Input({ alias: 'trip-back' })
  public set tripBack(value: InterfaceSbbJourneySummaryAttributes) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.tripBack = value));
  }
  public get tripBack(): InterfaceSbbJourneySummaryAttributes {
    return this.#element.nativeElement.tripBack;
  }

  @Input({ alias: 'round-trip', transform: booleanAttribute })
  public set roundTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.roundTrip = value));
  }
  public get roundTrip(): boolean {
    return this.#element.nativeElement.roundTrip;
  }

  @Input({ alias: 'header-level' })
  public set headerLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.headerLevel = value));
  }
  public get headerLevel(): SbbTitleLevel {
    return this.#element.nativeElement.headerLevel;
  }

  @Input({ alias: 'disable-animation', transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  @Input({ alias: 'a11y-footpath', transform: booleanAttribute })
  public set a11yFootpath(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.a11yFootpath = value));
  }
  public get a11yFootpath(): boolean {
    return this.#element.nativeElement.a11yFootpath;
  }

  @Input()
  public set now(value: SbbDateLike | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): SbbDateLike | undefined {
    return this.#element.nativeElement.now;
  }
}
