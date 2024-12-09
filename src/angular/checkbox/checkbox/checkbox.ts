import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox/checkbox.js';
import type { SbbCheckboxSize } from '@sbb-esta/lyne-elements/checkbox/common/checkbox-common.js';
import type { SbbIconPlacement } from '@sbb-esta/lyne-elements/core/interfaces.js';
import '@sbb-esta/lyne-elements/checkbox/checkbox.js';

import { SbbCheckboxCommonElementMixin } from '@sbb-esta/lyne-angular/checkbox/common/checkbox-common.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-checkbox',
  standalone: true,
})
export class SbbCheckbox extends SbbCheckboxCommonElementMixin(SbbIconNameMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbCheckboxElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: SbbCheckboxSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbCheckboxSize {
    return this.#element.nativeElement.size;
  }

  @Input({ alias: 'icon-placement' })
  public set iconPlacement(value: SbbIconPlacement) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconPlacement = value));
  }
  public get iconPlacement(): SbbIconPlacement {
    return this.#element.nativeElement.iconPlacement;
  }
}
