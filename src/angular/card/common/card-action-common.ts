/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbCardActionCommonElementMixinType } from '@sbb-esta/lyne-elements/card.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCardActionCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbCardActionCommonElementMixinType> & T => {
  abstract class SbbCardActionCommonElement
    extends superClass
    implements Partial<SbbCardActionCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbCardActionCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set active(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.active = value));
    }
    public get active(): boolean {
      return this.#element.nativeElement.active;
    }
  }
  return SbbCardActionCommonElement as unknown as AbstractConstructor<SbbCardActionCommonElementMixinType> &
    T;
};
