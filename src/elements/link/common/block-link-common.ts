import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import { isLean } from '../../core/dom.ts';
import type { SbbIconPlacement } from '../../core/interfaces.ts';
import type { AbstractConstructor } from '../../core/mixins.ts';
import { SbbIconNameMixin } from '../../icon.ts';

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
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
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
