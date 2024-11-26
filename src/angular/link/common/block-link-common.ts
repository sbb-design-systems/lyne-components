/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbIconPlacement } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbBlockLinkCommonElementMixinType } from '@sbb-esta/lyne-elements/link.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';
import { SbbLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/link-common.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbBlockLinkCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbBlockLinkCommonElementMixinType> & T => {
  abstract class SbbBlockLinkCommonElement
    extends SbbLinkCommonElementMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbBlockLinkCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbBlockLinkCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ alias: 'icon-placement' })
    public set iconPlacement(value: SbbIconPlacement) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconPlacement = value));
    }
    public get iconPlacement(): SbbIconPlacement {
      return this.#element.nativeElement.iconPlacement;
    }
  }
  return SbbBlockLinkCommonElement as unknown as AbstractConstructor<SbbBlockLinkCommonElementMixinType> &
    T;
};
