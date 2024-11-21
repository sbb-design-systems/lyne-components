import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbFormAssociatedCheckboxMixinType } from '@sbb-esta/lyne-elements/core/mixins.js';

import type { Constructor } from './constructor.js';
import { SbbFormAssociatedMixin } from './form-associated-mixin.js';
import { SbbRequiredMixin } from './required-mixin.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core/mixins/disabled-mixin.js';

/**
 * The FormAssociatedCheckboxMixin enables native form support for checkbox controls.
 *
 * Inherited classes MUST implement the ariaChecked state (ElementInternals) themselves.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedCheckboxMixin = <T extends Constructor>(
  superClass: T,
): Constructor<SbbFormAssociatedCheckboxMixinType> & T => {
  abstract class SbbFormAssociatedCheckboxElement
    extends SbbDisabledMixin(SbbRequiredMixin(SbbFormAssociatedMixin(superClass)))
    implements Partial<SbbFormAssociatedCheckboxMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbRequiredMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set checked(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
    }
    public get checked(): boolean {
      return this.#element.nativeElement.checked;
    }
  }

  return SbbFormAssociatedCheckboxElement as unknown as Constructor<SbbFormAssociatedCheckboxMixinType> &
    T;
};
