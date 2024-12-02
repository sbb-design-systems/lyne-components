import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNegativeMixinType } from '@sbb-esta/lyne-elements/core/mixins.js';

import { booleanAttribute } from '../attribute-transform.js';

import type { AbstractConstructor } from './constructor.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNegativeMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbNegativeMixinType> & T => {
  abstract class SbbNegativeElement extends superClass implements SbbNegativeMixinType {
    #element = inject(ElementRef<ReturnType<typeof SbbNegativeMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set negative(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
    }
    public get negative(): boolean {
      return this.#element.nativeElement.negative;
    }
  }

  return SbbNegativeElement as AbstractConstructor<SbbNegativeMixinType> & T;
};
