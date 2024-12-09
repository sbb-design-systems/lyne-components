import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbTrainFormationElement } from '@sbb-esta/lyne-elements/train/train-formation.js';
import '@sbb-esta/lyne-elements/train/train-formation.js';

@Directive({
  selector: 'sbb-train-formation',
  standalone: true,
})
export class SbbTrainFormation {
  #element = inject(ElementRef<SbbTrainFormationElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set view(value: 'side' | 'top') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): 'side' | 'top' {
    return this.#element.nativeElement.view;
  }
}
