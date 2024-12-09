/* eslint-disable lyne/angular-generator-rule */
import type { SbbInlineLinkCommonElementMixinType } from '@sbb-esta/lyne-elements/link.js';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/link-common.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbInlineLinkCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<SbbInlineLinkCommonElementMixinType> & T => {
  abstract class SbbInlineLinkCommonElement
    extends SbbLinkCommonElementMixin(superClass)
    implements Partial<SbbInlineLinkCommonElementMixinType> {}
  return SbbInlineLinkCommonElement as unknown as AbstractConstructor<SbbInlineLinkCommonElementMixinType> &
    T;
};
