import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import type { SbbTrainElement } from '@sbb-esta/lyne-elements/train/train.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/train/train.js';

@Directive({
  selector: 'sbb-train',
  standalone: true,
})
export class SbbTrain {
  #element = inject(ElementRef<SbbTrainElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'direction-label' })
  public set directionLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.directionLabel = value));
  }
  public get directionLabel(): string {
    return this.#element.nativeElement.directionLabel;
  }

  @Input({ alias: 'direction-label-level' })
  public set directionLabelLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.directionLabelLevel = value));
  }
  public get directionLabelLevel(): SbbTitleLevel {
    return this.#element.nativeElement.directionLabelLevel;
  }

  @Input()
  public set station(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.station = value));
  }
  public get station(): string {
    return this.#element.nativeElement.station;
  }

  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input()
  public set direction(value: 'left' | 'right') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.direction = value));
  }
  public get direction(): 'left' | 'right' {
    return this.#element.nativeElement.direction;
  }

  @Output() public trainSlotChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'trainSlotChange',
  );
}
