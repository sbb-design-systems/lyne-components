import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbActionBaseElement, SbbIconPlacement, AbstractConstructor } from '../../core.ts';
import { isLean } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import { SbbLinkCommonElementMixin } from './link-common.ts';
// eslint-disable-next-line import-x/order
import blockStyle from './block-link.scss?inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbBlockLinkCommonElementMixinType extends SbbLinkCommonElementMixin(
  SbbIconNameMixin(SbbActionBaseElement),
) {
  public accessor iconPlacement: SbbIconPlacement;
  public accessor size: SbbLinkSize;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbBlockLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbBlockLinkCommonElementMixinType> & T => {
  abstract class SbbBlockLinkCommonElement
    extends SbbLinkCommonElementMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbBlockLinkCommonElementMixinType>
  {
    public static override styles: CSSResultGroup = [super.styles, unsafeCSS(blockStyle)];

    /**
     * Size variant, either xs, s or m.
     * @default 's' / 'xs' (lean)
     */
    @property({ reflect: true }) public accessor size: SbbLinkSize = isLean() ? 'xs' : 's';

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement', reflect: true })
    public accessor iconPlacement: SbbIconPlacement = 'start';

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-link__icon">${super.renderIconSlot()}</span>
        <slot></slot>
      `;
    }
  }
  return SbbBlockLinkCommonElement as unknown as AbstractConstructor<SbbBlockLinkCommonElementMixinType> &
    T;
};
