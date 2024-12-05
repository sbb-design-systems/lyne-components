import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbAccordionElement } from '@sbb-esta/lyne-elements/accordion.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/accordion.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-accordion',
  standalone: true,
})
export class SbbAccordion extends HTMLElement {
  #element = inject(ElementRef<SbbAccordionElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: 's' | 'l') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' {
    return this.#element.nativeElement.size;
  }

  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.titleLevel;
  }

  @Input({ transform: booleanAttribute })
  public set multi(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multi = value));
  }
  public get multi(): boolean {
    return this.#element.nativeElement.multi;
  }
}
