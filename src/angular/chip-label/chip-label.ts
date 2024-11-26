import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbChipLabelElement } from '@sbb-esta/lyne-elements/chip-label.js';
import '@sbb-esta/lyne-elements/chip-label.js';

@Directive({
  selector: 'sbb-chip-label',
  standalone: true,
})
export class SbbChipLabel {
  #element = inject(ElementRef<SbbChipLabelElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: 'xxs' | 'xs' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xxs' | 'xs' | 's' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set color(value: 'milk' | 'charcoal' | 'white' | 'granite') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'milk' | 'charcoal' | 'white' | 'granite' {
    return this.#element.nativeElement.color;
  }
}