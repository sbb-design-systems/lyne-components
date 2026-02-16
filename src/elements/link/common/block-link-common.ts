import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import type { SbbIconPlacement } from '../../core/interfaces.ts';
import type { AbstractConstructor } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';

import { SbbLinkCommonElementMixin } from './link-common.ts';
// eslint-disable-next-line import-x/order
import blockStyle from './block-link.scss?lit&inline';
import style from './link.scss?lit&inline';

export declare class SbbBlockLinkCommonElementMixinType extends SbbLinkCommonElementMixin(
  SbbIconNameMixin(SbbActionBaseElement),
) {
  public accessor iconPlacement: SbbIconPlacement;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbBlockLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbBlockLinkCommonElementMixinType> & T => {
  abstract class SbbBlockLinkCommonElement
    extends SbbLinkCommonElementMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbBlockLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [boxSizingStyles, style, blockStyle];

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement', reflect: true })
    public accessor iconPlacement: SbbIconPlacement = 'start';

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-link__icon"> ${super.renderIconSlot()} </span>
        <slot></slot>
      `;
    }
  }
  return SbbBlockLinkCommonElement as unknown as AbstractConstructor<SbbBlockLinkCommonElementMixinType> &
    T;
};
