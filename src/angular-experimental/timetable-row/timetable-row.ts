import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { ITripItem } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type {
  Boarding,
  Price,
  SbbTimetableRowElement,
} from '@sbb-esta/lyne-elements-experimental/timetable-row.js';
import '@sbb-esta/lyne-elements-experimental/timetable-row.js';

@Directive({
  selector: 'sbb-timetable-row',
  standalone: true,
})
export class SbbTimetableRow extends HTMLElement {
  #element = inject(ElementRef<SbbTimetableRowElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set trip(value: ITripItem) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trip = value));
  }
  public get trip(): ITripItem {
    return this.#element.nativeElement.trip;
  }

  @Input()
  public set price(value: Price) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.price = value));
  }
  public get price(): Price {
    return this.#element.nativeElement.price;
  }

  @Input({ alias: 'disable-animation', transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  @Input()
  public set boarding(value: Boarding) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.boarding = value));
  }
  public get boarding(): Boarding {
    return this.#element.nativeElement.boarding;
  }

  @Input({ alias: 'loading-trip', transform: booleanAttribute })
  public set loadingTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loadingTrip = value));
  }
  public get loadingTrip(): boolean {
    return this.#element.nativeElement.loadingTrip;
  }

  @Input({ alias: 'a11y-footpath', transform: booleanAttribute })
  public set a11yFootpath(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.a11yFootpath = value));
  }
  public get a11yFootpath(): boolean {
    return this.#element.nativeElement.a11yFootpath;
  }

  @Input({ alias: 'loading-price', transform: booleanAttribute })
  public set loadingPrice(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loadingPrice = value));
  }
  public get loadingPrice(): boolean {
    return this.#element.nativeElement.loadingPrice;
  }

  @Input({ alias: 'card-action-label' })
  public set cardActionLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.cardActionLabel = value));
  }
  public get cardActionLabel(): string {
    return this.#element.nativeElement.cardActionLabel;
  }

  @Input({ alias: 'accessibility-expanded', transform: booleanAttribute })
  public set accessibilityExpanded(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityExpanded = value),
    );
  }
  public get accessibilityExpanded(): boolean {
    return this.#element.nativeElement.accessibilityExpanded;
  }

  @Input({ transform: booleanAttribute })
  public set active(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.active = value));
  }
  public get active(): boolean {
    return this.#element.nativeElement.active;
  }

  @Input()
  public set now(value: SbbDateLike | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): SbbDateLike | undefined {
    return this.#element.nativeElement.now;
  }
}
