import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbCardElement } from '@sbb-esta/lyne-elements/card/card.js';
import '@sbb-esta/lyne-elements/card/card.js';

@Directive({
  selector: 'sbb-card',
  standalone: true,
})
export class SbbCard extends HTMLElement {
  #element = inject(ElementRef<SbbCardElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set color(
    value: 'white' | 'milk' | 'transparent-bordered' | 'transparent-bordered-dashed',
  ) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' | 'transparent-bordered' | 'transparent-bordered-dashed' {
    return this.#element.nativeElement.color;
  }
}
