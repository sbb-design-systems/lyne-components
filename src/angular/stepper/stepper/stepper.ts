import { Directive, ElementRef, Input, NgZone, inject, numberAttribute } from '@angular/core';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
import type { SbbStepperElement } from '@sbb-esta/lyne-elements/stepper/stepper.js';

import '@sbb-esta/lyne-elements/stepper/stepper.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-stepper',
  standalone: true,
})
export class SbbStepper {
  #element = inject(ElementRef<SbbStepperElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set linear(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linear = value));
  }
  public get linear(): boolean {
    return this.#element.nativeElement.linear;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  @Input({ alias: 'horizontal-from' })
  public set horizontalFrom(value: SbbHorizontalFrom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set selected(value: SbbStepElement) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): SbbStepElement {
    return this.#element.nativeElement.selected;
  }

  @Input({ alias: 'selected-index', transform: numberAttribute })
  public set selectedIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selectedIndex = value));
  }
  public get selectedIndex(): number {
    return this.#element.nativeElement.selectedIndex;
  }

  public get steps(): SbbStepElement[] {
    return this.#element.nativeElement.steps;
  }

  public next(): void {
    return this.#element.nativeElement.next();
  }

  public previous(): void {
    return this.#element.nativeElement.previous();
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }
}
