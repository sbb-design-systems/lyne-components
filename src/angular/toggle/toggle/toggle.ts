import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbToggleElement } from '@sbb-esta/lyne-elements/toggle/toggle.js';
import type { SbbToggleOptionElement } from '@sbb-esta/lyne-elements/toggle.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/toggle/toggle.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-toggle',
  standalone: true,
})
export class SbbToggle extends HTMLElement {
  #element = inject(ElementRef<SbbToggleElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ transform: booleanAttribute })
  public set even(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.even = value));
  }
  public get even(): boolean {
    return this.#element.nativeElement.even;
  }

  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Output() public change: Observable<void> = fromEvent(this.#element.nativeElement, 'change');

  public get options(): SbbToggleOptionElement[] {
    return this.#element.nativeElement.options;
  }
}
