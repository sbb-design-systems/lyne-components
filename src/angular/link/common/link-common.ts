/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbLinkCommonElementMixinType, SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(superClass)
    implements Partial<SbbLinkCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbLinkCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input()
    public set size(value: SbbLinkSize) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
    }
    public get size(): SbbLinkSize {
      return this.#element.nativeElement.size;
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
