import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements/button-base-element';

import { SbbFormAssociatedMixin } from '@sbb-esta/lyne-angular/core/mixins/form-associated-mixin';

export abstract class SbbButtonBaseElement extends SbbFormAssociatedMixin(HTMLElement) {
  #element = inject(ElementRef<SbbButtonBaseElement>);
  #ngZone = inject(NgZone);

  @Input()
  public override set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public override get type(): SbbButtonType {
    return this.#element.nativeElement.type;
  }

  @Input()
  public override set form(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.form = value));
  }
  public override get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }
}
