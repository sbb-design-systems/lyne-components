import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbMapContainerElement } from '@sbb-esta/lyne-elements/map-container.js';
import '@sbb-esta/lyne-elements/map-container.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-map-container',
  standalone: true,
})
export class SbbMapContainer extends HTMLElement {
  #element = inject(ElementRef<SbbMapContainerElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'hide-scroll-up-button', transform: booleanAttribute })
  public set hideScrollUpButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideScrollUpButton = value));
  }
  public get hideScrollUpButton(): boolean {
    return this.#element.nativeElement.hideScrollUpButton;
  }
}
