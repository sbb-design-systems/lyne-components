/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbHorizontalFrom } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbHeaderActionCommonElementMixinType } from '@sbb-esta/lyne-elements/header.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbHeaderActionCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbHeaderActionCommonElementMixinType> & T => {
  abstract class SbbHeaderActionCommonElement
    extends SbbIconNameMixin(superClass)
    implements Partial<SbbHeaderActionCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbHeaderActionCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ alias: 'expand-from' })
    public set expandFrom(value: SbbHorizontalFrom) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expandFrom = value));
    }
    public get expandFrom(): SbbHorizontalFrom {
      return this.#element.nativeElement.expandFrom;
    }
  }
  return SbbHeaderActionCommonElement as unknown as AbstractConstructor<SbbHeaderActionCommonElementMixinType> &
    T;
};
