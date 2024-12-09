/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';

import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core/mixins/disabled-mixin.js';

export abstract class SbbOptgroupBaseElement extends SbbDisabledMixin(HTMLElement) {
  #element = inject(ElementRef<SbbOptgroupBaseElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }
}
