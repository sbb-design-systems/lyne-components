import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type {
  AbstractConstructor,
  SbbDisabledMixinType,
  SbbIconNameMixinType,
  SbbNegativeMixinType,
} from '../../core/common-behaviors';
import {
  SbbIconNameMixin,
  SbbNegativeMixin,
  NamedSlotStateController,
} from '../../core/common-behaviors';
import type { SbbActionBaseElement } from '../../core/common-behaviors/action-base-element';
import type { SbbIconPlacement } from '../../core/interfaces';

import '../../icon';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, Partial<SbbIconNameMixinType>
{
  public variant: 'block' | 'inline';
  public size?: SbbLinkSize;
  public disabled: boolean;
  public iconName?: string;
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Variant of the link (block or inline). */
    @property({ reflect: true }) public variant: 'block' | 'inline' = 'block';

    /**
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
     */
    @property({ reflect: true }) public size: SbbLinkSize = 's';

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement' })
    public iconPlacement?: SbbIconPlacement = 'start';

    public constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        ${this.variant !== 'inline'
          ? html` <span class="sbb-link__icon"> ${super.renderIconSlot()} </span> `
          : nothing}
        <slot></slot>
      `;
      /* eslint-enable lit/binding-positions */
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
