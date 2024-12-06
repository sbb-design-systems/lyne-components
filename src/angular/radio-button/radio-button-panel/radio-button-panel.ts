import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbPanelSize } from '@sbb-esta/lyne-elements/core/mixins.js';
import type { SbbRadioButtonPanelElement } from '@sbb-esta/lyne-elements/radio-button/radio-button-panel.js';

import '@sbb-esta/lyne-elements/radio-button/radio-button-panel.js';
import { SbbPanelMixin } from '@sbb-esta/lyne-angular/core';
import { SbbRadioButtonCommonElementMixin } from '@sbb-esta/lyne-angular/radio-button/common/radio-button-common.js';

@Directive({
  selector: 'sbb-radio-button-panel',
  standalone: true,
})
export class SbbRadioButtonPanel extends SbbPanelMixin(
  SbbRadioButtonCommonElementMixin(HTMLElement),
) {
  #element = inject(ElementRef<SbbRadioButtonPanelElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: SbbPanelSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbPanelSize {
    return this.#element.nativeElement.size;
  }
}
