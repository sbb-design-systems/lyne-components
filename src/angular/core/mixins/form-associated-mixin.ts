import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbFormAssociatedMixinType } from '@sbb-esta/lyne-elements/core/mixins.js';

import type { AbstractConstructor } from './constructor.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedMixin = <T extends AbstractConstructor, V = string>(
  superClass: T,
): AbstractConstructor<SbbFormAssociatedMixinType<V>> & T => {
  abstract class SbbFormAssociatedElement
    extends superClass
    implements Partial<SbbFormAssociatedMixinType<V>>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbFormAssociatedMixin>>);
    #ngZone = inject(NgZone);

    public get form(): HTMLFormElement | null {
      return this.#element.nativeElement.form;
    }

    @Input()
    public set name(value: string) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
    }
    public get name(): string {
      return this.#element.nativeElement.negative;
    }

    @Input()
    public set value(value: V | null) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
    }
    public get value(): V | null {
      return this.#element.nativeElement.negative;
    }
  }
  return SbbFormAssociatedElement as unknown as AbstractConstructor<SbbFormAssociatedMixinType<V>> &
    T;
};
