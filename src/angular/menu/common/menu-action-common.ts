/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbMenuActionCommonElementMixinType } from '@sbb-esta/lyne-elements/menu.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core/mixins/disabled-mixin.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbMenuActionCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbMenuActionCommonElementMixinType> & T => {
  abstract class SbbMenuActionCommonElement
    extends SbbIconNameMixin(SbbDisabledMixin(superClass))
    implements Partial<SbbMenuActionCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbMenuActionCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input()
    public set amount(value: string) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
    }
    public get amount(): string {
      return this.#element.nativeElement.amount;
    }
  }
  return SbbMenuActionCommonElement as unknown as AbstractConstructor<SbbMenuActionCommonElementMixinType> &
    T;
};
