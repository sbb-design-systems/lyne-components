import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor, SbbActionBaseElement } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import { SbbLinkCommonElementMixin } from './link-common.ts';
// eslint-disable-next-line import-x/order
import blockStyle from './block-link.scss?inline';

export declare class SbbBlockLinkCommonElementMixinType extends SbbLinkCommonElementMixin(
  SbbIconNameMixin(SbbActionBaseElement),
) {
  public accessor iconPlacement: 'start' | 'end';
  public accessor size: 'xs' | 's' | 'm' | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbBlockLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbBlockLinkCommonElementMixinType> & T => {
  abstract class SbbBlockLinkCommonElement
    extends SbbLinkCommonElementMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbBlockLinkCommonElementMixinType>
  {
    public static override styles: CSSResultGroup = [unsafeCSS(blockStyle)];

    /**
     * Size variant, either xs (lean theme default), s (standard theme default) or m.
     */
    @property({ reflect: true }) public accessor size: SbbBlockLinkCommonElementMixinType['size'] =
      null;

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement', reflect: true })
    public accessor iconPlacement: 'start' | 'end' = 'start';

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
