import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbDisabledInteractiveMixinType,
  SbbDisabledMixinType,
  SbbFormAssociatedMixinType,
} from '@sbb-esta/lyne-elements/core/mixins.js';

import { booleanAttribute } from '../attribute-transform.js';

import type { AbstractConstructor } from './constructor.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbDisabledElement extends superClass implements Partial<SbbDisabledMixinType> {
    #element = inject(ElementRef<ReturnType<typeof SbbDisabledMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set disabled(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
    }
    public get disabled(): boolean {
      return this.#element.nativeElement.disabled;
    }
  }

  return SbbDisabledElement as unknown as AbstractConstructor<SbbDisabledMixinType> & T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledInteractiveMixin = <T extends AbstractConstructor<SbbDisabledMixinType>>(
  superClass: T,
): AbstractConstructor<SbbDisabledInteractiveMixinType> & T => {
  abstract class SbbDisabledInteractiveElement
    extends superClass
    implements Partial<SbbDisabledInteractiveMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbDisabledInteractiveMixin>>);
    #ngZone = inject(NgZone);

    @Input({ alias: 'disabled-interactive', transform: booleanAttribute })
    public set disabledInteractive(value: boolean) {
      this.#ngZone.runOutsideAngular(
        () => (this.#element.nativeElement.disabledInteractive = value),
      );
    }
    public get disabledInteractive(): boolean {
      return this.#element.nativeElement.disabled;
    }
  }

  return SbbDisabledInteractiveElement as unknown as AbstractConstructor<SbbDisabledInteractiveMixinType> &
    T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledTabIndexActionMixin = <
  T extends AbstractConstructor<SbbFormAssociatedMixinType>,
>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType & SbbDisabledInteractiveMixinType> & T => {
  abstract class SbbDisabledTabIndexAction
    extends SbbDisabledInteractiveMixin(SbbDisabledMixin(superClass))
    implements SbbDisabledMixinType, SbbDisabledInteractiveMixinType {}
  return SbbDisabledTabIndexAction as AbstractConstructor<
    SbbDisabledMixinType & SbbDisabledInteractiveMixinType
  > &
    T;
};
