import { spread } from '@open-wc/lit-helpers';
import { type CSSResultGroup, type LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import type {
  AbstractConstructor,
  SbbDisabledMixinType,
  SbbIconNameMixinType,
  SbbNegativeMixinType,
} from '../../core/common-behaviors';
import {
  SbbDisabledMixin,
  SbbIconNameMixin,
  SbbNegativeMixin,
  NamedSlotStateController,
} from '../../core/common-behaviors';
import type { SbbIconPlacement } from '../../core/interfaces';

import '../../icon';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, SbbIconNameMixinType
{
  public variant: 'block' | 'inline';
  public size?: SbbLinkSize;
  public disabled: boolean;
  public iconName?: string;
  public negative: boolean;
  public renderIconSlot(): TemplateResult;
  public renderLinkCommonTemplate: (
    attributes?: Record<string, string>,
    customTemplate?: TemplateResult | typeof nothing,
  ) => TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(SbbDisabledMixin(SbbIconNameMixin(superClass)))
    implements SbbLinkCommonElementMixinType
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

    /**
     * @private
     */
    public renderLinkCommonTemplate(
      attributes?: Record<string, string>,
      customTemplate?: TemplateResult | typeof nothing,
    ): TemplateResult {
      const TAG_NAME: string = attributes ? 'a' : 'span';

      /* eslint-disable lit/binding-positions */
      return html`
        <${unsafeStatic(TAG_NAME)} class="sbb-link" ${attributes ? spread(attributes) : nothing}>
          ${
            this.variant !== 'inline'
              ? html` <span class="sbb-link__icon"> ${super.renderIconSlot()} </span> `
              : nothing
          }
          <slot></slot>
          ${customTemplate}
        </${unsafeStatic(TAG_NAME)}>
      `;
      /* eslint-enable lit/binding-positions */
    }
  }
  return SbbLinkCommonElement as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
