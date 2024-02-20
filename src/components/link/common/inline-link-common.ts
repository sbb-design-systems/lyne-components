import { type CSSResultGroup } from 'lit';

import { type SbbActionBaseElement, type AbstractConstructor } from '../../core/common-behaviors';

import '../../icon';
import inlineStyle from './inline-link.scss?lit&inline';
import { SbbLinkCommonElementMixin, type SbbLinkCommonElementMixinType } from './link-common';
import style from './link.scss?lit&inline';

export declare class SbbInlineLinkCommonElementMixinType extends SbbLinkCommonElementMixinType {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbInlineLinkCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbInlineLinkCommonElementMixinType> & T => {
  abstract class SbbInlineLinkCommonElement
    extends SbbLinkCommonElementMixin(superClass)
    implements Partial<SbbInlineLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [style, inlineStyle];
  }
  return SbbInlineLinkCommonElement as unknown as AbstractConstructor<SbbInlineLinkCommonElementMixinType> &
    T;
};
