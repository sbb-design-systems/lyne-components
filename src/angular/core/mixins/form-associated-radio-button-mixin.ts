import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbFormAssociatedRadioButtonMixinType } from '@sbb-esta/lyne-elements/core/mixins.js';

import type { Constructor } from './constructor.js';
import { SbbDisabledMixin } from './disabled-mixin.js';
import { SbbFormAssociatedMixin } from './form-associated-mixin.js';
import { SbbRequiredMixin } from './required-mixin.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedRadioButtonMixin = <T extends Constructor>(
  superClass: T,
): Constructor<SbbFormAssociatedRadioButtonMixinType> & T => {
  abstract class SbbFormAssociatedRadioButtonElement
    extends SbbDisabledMixin(SbbRequiredMixin(SbbFormAssociatedMixin(superClass)))
    implements Partial<SbbFormAssociatedRadioButtonMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbFormAssociatedRadioButtonMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set checked(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
    }
    public get checked(): boolean {
      return this.#element.nativeElement.checked;
    }

    public override get type(): string {
      return this.#element.nativeElement.type;
    }
  }

  return SbbFormAssociatedRadioButtonElement as unknown as Constructor<SbbFormAssociatedRadioButtonMixinType> &
    T;
};
