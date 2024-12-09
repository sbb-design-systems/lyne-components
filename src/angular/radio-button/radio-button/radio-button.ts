import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbRadioButtonSize } from '@sbb-esta/lyne-elements/radio-button/common/radio-button-common.js';
import type { SbbRadioButtonElement } from '@sbb-esta/lyne-elements/radio-button/radio-button.js';
import '@sbb-esta/lyne-elements/radio-button/radio-button.js';

import { SbbRadioButtonCommonElementMixin } from '@sbb-esta/lyne-angular/radio-button/common/radio-button-common.js';

@Directive({
  selector: 'sbb-radio-button',
  standalone: true,
})
export class SbbRadioButton extends SbbRadioButtonCommonElementMixin(HTMLElement) {
  #element = inject(ElementRef<SbbRadioButtonElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: SbbRadioButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbRadioButtonSize {
    return this.#element.nativeElement.size;
  }
}
