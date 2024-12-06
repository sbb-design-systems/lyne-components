import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbToggleOptionElement } from '@sbb-esta/lyne-elements/toggle/toggle-option.js';

import '@sbb-esta/lyne-elements/toggle/toggle-option.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-toggle-option',
  standalone: true,
})
export class SbbToggleOption extends SbbIconNameMixin(HTMLElement) {
  #element = inject(ElementRef<SbbToggleOptionElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input()
  public set value(value: any) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): any {
    return this.#element.nativeElement.value;
  }
}
