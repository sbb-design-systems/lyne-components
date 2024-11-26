/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbTeaserProductCommonElementMixinType } from '@sbb-esta/lyne-elements/teaser-product.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTeaserProductCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbTeaserProductCommonElementMixinType> & T => {
  abstract class SbbTeaserProductCommonElement
    extends SbbNegativeMixin(superClass)
    implements SbbTeaserProductCommonElementMixinType
  {
    #element = inject(ElementRef<ReturnType<typeof SbbTeaserProductCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ alias: 'image-alignment' })
    public set imageAlignment(value: 'after' | 'before') {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlignment = value));
    }
    public get imageAlignment(): 'after' | 'before' {
      return this.#element.nativeElement.imageAlignment;
    }
  }
  return SbbTeaserProductCommonElement as AbstractConstructor<SbbTeaserProductCommonElementMixinType> &
    T;
};
