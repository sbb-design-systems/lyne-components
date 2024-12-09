import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbCheckboxSize } from '@sbb-esta/lyne-elements/checkbox.js';
import type { SbbVisualCheckboxElement } from '@sbb-esta/lyne-elements/visual-checkbox.js';
import '@sbb-esta/lyne-elements/visual-checkbox.js';

import { booleanAttribute, SbbDisabledMixin, SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-visual-checkbox',
  standalone: true,
})
export class SbbVisualCheckbox extends SbbDisabledMixin(SbbNegativeMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbVisualCheckboxElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  @Input({ transform: booleanAttribute })
  public set indeterminate(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.indeterminate = value));
  }
  public get indeterminate(): boolean {
    return this.#element.nativeElement.indeterminate;
  }

  @Input()
  public set size(value: SbbCheckboxSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbCheckboxSize {
    return this.#element.nativeElement.size;
  }
}
