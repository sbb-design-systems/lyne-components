/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbNavigationMarkerElement,
  SbbNavigationSectionElement,
  SbbNavigationActionCommonElementMixinType,
  SbbNavigationActionSize,
} from '@sbb-esta/lyne-elements/navigation.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNavigationActionCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbNavigationActionCommonElementMixinType> & T => {
  abstract class SbbNavigationActionCommonElement
    extends superClass
    implements Partial<SbbNavigationActionCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbNavigationActionCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input()
    public set size(value: SbbNavigationActionSize) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
    }
    public get size(): SbbNavigationActionSize {
      return this.#element.nativeElement.size;
    }

    public get marker(): SbbNavigationMarkerElement | null {
      return this.#element.nativeElement.marker;
    }

    public get section(): SbbNavigationSectionElement | null {
      return this.#element.nativeElement.section;
    }
  }
  return SbbNavigationActionCommonElement as unknown as AbstractConstructor<SbbNavigationActionCommonElementMixinType> &
    T;
};
