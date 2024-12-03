/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbButtonCommonElementMixinType,
  SbbButtonSize,
} from '@sbb-esta/lyne-elements/button.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  abstract class SbbButtonCommonElementClass
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbButtonCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input()
    public set size(value: SbbButtonSize) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
    }
    public get size(): SbbButtonSize {
      return this.#element.nativeElement.size;
    }
  }
  return SbbButtonCommonElementClass as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
