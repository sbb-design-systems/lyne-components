/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbRadioButtonCommonElementMixinType,
  SbbRadioButtonGroupElement,
} from '@sbb-esta/lyne-elements/radio-button.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  AbstractConstructor,
  Constructor,
} from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbFormAssociatedRadioButtonMixin } from '@sbb-esta/lyne-angular/core/mixins/form-associated-radio-button-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRadioButtonCommonElementMixin = <T extends Constructor>(
  superClass: T,
): AbstractConstructor<SbbRadioButtonCommonElementMixinType> & T => {
  abstract class SbbRadioButtonCommonElement
    extends SbbFormAssociatedRadioButtonMixin(superClass)
    implements Partial<SbbRadioButtonCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbRadioButtonCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ alias: 'allow-empty-selection', transform: booleanAttribute })
    public set allowEmptySelection(value: boolean) {
      this.#ngZone.runOutsideAngular(
        () => (this.#element.nativeElement.allowEmptySelection = value),
      );
    }
    public get allowEmptySelection(): boolean {
      return this.#element.nativeElement.allowEmptySelection;
    }

    public get group(): SbbRadioButtonGroupElement | null {
      return this.#element.nativeElement.group;
    }

    public select(): void {
      return this.#element.nativeElement.select();
    }
  }

  return SbbRadioButtonCommonElement as unknown as AbstractConstructor<SbbRadioButtonCommonElementMixinType> &
    T;
};
