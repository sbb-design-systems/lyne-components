/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core/mixins/disabled-mixin';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin';

export abstract class SbbOptionBaseElement extends SbbDisabledMixin(SbbIconNameMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbOptionBaseElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }
}
