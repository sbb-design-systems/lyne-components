import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/tabs/tab-label.js';

import { booleanAttribute, SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-tab-label',
  standalone: true,
})
export class SbbTabLabel extends SbbDisabledMixin(SbbIconNameMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbTabLabelElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  @Input({ transform: booleanAttribute })
  public set active(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.active = value));
  }
  public get active(): boolean {
    return this.#element.nativeElement.active;
  }

  @Input()
  public set amount(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
  }
  public get amount(): string {
    return this.#element.nativeElement.amount;
  }
}
