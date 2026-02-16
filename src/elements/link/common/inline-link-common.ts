import type { CSSResultGroup } from 'lit';

import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import type { AbstractConstructor } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import { SbbLinkCommonElementMixin } from './link-common.ts';
// eslint-disable-next-line import-x/order
import inlineStyle from './inline-link.scss?lit&inline';
import style from './link.scss?lit&inline';

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
    public static styles: CSSResultGroup = [boxSizingStyles, style, inlineStyle];
  }
  return SbbInlineLinkCommonElement as unknown as AbstractConstructor<SbbInlineLinkCommonElementMixinType> &
    T;
};
