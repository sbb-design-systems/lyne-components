import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import type { SbbIconPlacement } from '../../core/interfaces.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import { boxSizingStyles } from '../../core/styles.js';
import { SbbIconNameMixin } from '../../icon.js';

 
import blockStyle from './block-link.scss?lit&inline';
import { SbbLinkCommonElementMixin } from './link-common.js';
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
