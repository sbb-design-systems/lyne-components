/* eslint-disable lyne/angular-generator-rule */

import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbCheckboxGroupElement,
  SbbCheckboxCommonElementMixinType,
} from '@sbb-esta/lyne-elements/checkbox.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { Constructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbFormAssociatedCheckboxMixin } from '@sbb-esta/lyne-angular/core/mixins/form-associated-checkbox-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCheckboxCommonElementMixin = <T extends Constructor>(
  superClass: T,
): Constructor<SbbCheckboxCommonElementMixinType> & T => {
  abstract class SbbCheckboxCommonElement
    extends SbbFormAssociatedCheckboxMixin(superClass)
    implements Partial<SbbCheckboxCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbCheckboxCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set indeterminate(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.indeterminate = value));
    }
    public get indeterminate(): boolean {
      return this.#element.nativeElement.indeterminate;
    }

    /** Reference to the connected checkbox group. */
    public get group(): SbbCheckboxGroupElement | null {
      return this.#element.nativeElement.group;
    }
  }
  return SbbCheckboxCommonElement as unknown as Constructor<SbbCheckboxCommonElementMixinType> & T;
};
