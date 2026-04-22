import { type CSSResultGroup, unsafeCSS } from 'lit';

import type { AbstractConstructor, SbbActionBaseElement } from '../../core.ts';

import { SbbLinkCommonElementMixin } from './link-common.ts';
// eslint-disable-next-line import-x/order
import inlineStyle from './inline-link.scss?inline';

export declare class SbbInlineLinkCommonElementMixinType extends SbbLinkCommonElementMixin(
  SbbActionBaseElement,
) {}

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
    public static override styles: CSSResultGroup = [super.styles, unsafeCSS(inlineStyle)];
  }
  return SbbInlineLinkCommonElement as unknown as AbstractConstructor<SbbInlineLinkCommonElementMixinType> &
    T;
};
