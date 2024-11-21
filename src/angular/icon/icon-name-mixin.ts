/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbIconNameMixinType } from '@sbb-esta/lyne-elements/icon/icon-name-mixin';

import type { AbstractConstructor } from '../core/mixins/constructor';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbIconNameMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbIconNameMixinType> & T => {
  abstract class SbbIconNameElement extends superClass implements Partial<SbbIconNameMixinType> {
    #element = inject(ElementRef<ReturnType<typeof SbbIconNameMixin>>);
    #ngZone = inject(NgZone);

    @Input({ alias: 'icon-name' })
    public set iconName(value: string) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
    }
    public get iconName(): string {
      return this.#element.nativeElement.iconName;
    }
  }

  return SbbIconNameElement as unknown as AbstractConstructor<SbbIconNameMixinType> & T;
};
