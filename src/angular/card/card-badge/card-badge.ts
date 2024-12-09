import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbCardBadgeElement } from '@sbb-esta/lyne-elements/card/card-badge.js';
import '@sbb-esta/lyne-elements/card/card-badge.js';

@Directive({
  selector: 'sbb-card-badge',
  standalone: true,
})
export class SbbCardBadge extends HTMLElement {
  #element = inject(ElementRef<SbbCardBadgeElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set color(value: 'charcoal' | 'white') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'charcoal' | 'white' {
    return this.#element.nativeElement.color;
  }
}
