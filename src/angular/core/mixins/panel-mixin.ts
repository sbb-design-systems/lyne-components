import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbPanelMixinType } from '@sbb-esta/lyne-elements/core/mixins.js';

import type { AbstractConstructor } from './constructor.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPanelMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbPanelMixinType> & T => {
  abstract class SbbPanelElement extends superClass implements Partial<SbbPanelMixinType> {
    #element = inject(ElementRef<ReturnType<typeof SbbPanelMixin>>);
    #ngZone = inject(NgZone);

    @Input()
    public set color(value: 'white' | 'milk') {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
    }
    public get color(): 'white' | 'milk' {
      return this.#element.nativeElement.color;
    }

    @Input({ transform: booleanAttribute })
    public set borderless(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
    }
    public get borderless(): boolean {
      return this.#element.nativeElement.borderless;
    }
  }

  return SbbPanelElement as AbstractConstructor<SbbPanelMixinType> & T;
};
