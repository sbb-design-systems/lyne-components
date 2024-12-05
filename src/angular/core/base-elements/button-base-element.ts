import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { FormRestoreReason, FormRestoreState } from '@sbb-esta/lyne-elements/core/mixins.js';

import { SbbFormAssociatedMixin } from '../mixins/form-associated-mixin.js';

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

  public override formResetCallback(): void {}

  public override formStateRestoreCallback(
    _state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {}

  protected updateFormValue(): void {}
}
