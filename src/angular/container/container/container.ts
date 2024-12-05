import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbContainerElement } from '@sbb-esta/lyne-elements/container/container.js';

import '@sbb-esta/lyne-elements/container/container.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-container',
  standalone: true,
})
export class SbbContainer extends HTMLElement {
  #element = inject(ElementRef<SbbContainerElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  @Input({ alias: 'background-expanded', transform: booleanAttribute })
  public set backgroundExpanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backgroundExpanded = value));
  }
  public get backgroundExpanded(): boolean {
    return this.#element.nativeElement.backgroundExpanded;
  }

  @Input()
  public set color(value: 'transparent' | 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'transparent' | 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }
}
