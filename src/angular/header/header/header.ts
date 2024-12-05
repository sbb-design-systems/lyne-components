import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbHeaderElement } from '@sbb-esta/lyne-elements/header/header.js';

import '@sbb-esta/lyne-elements/header/header.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-header',
  standalone: true,
})
export class SbbHeader {
  #element = inject(ElementRef<SbbHeaderElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  @Input({ alias: 'hide-on-scroll' })
  public set hideOnScroll(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideOnScroll = value));
  }
  public get hideOnScroll(): boolean {
    return this.#element.nativeElement.hideOnScroll;
  }

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  public get scrollOrigin(): string | HTMLElement | Document {
    return this.#element.nativeElement.scrollOrigin;
  }
}
