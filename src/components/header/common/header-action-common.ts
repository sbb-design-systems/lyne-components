import { spread } from '@open-wc/lit-helpers';
import { nothing, type TemplateResult, type CSSResultGroup, type LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import type { AbstractConstructor, SbbIconNameMixinType } from '../../core/common-behaviors';
import { SbbIconNameMixin } from '../../core/common-behaviors';
import { isBreakpoint, toggleDatasetEntry } from '../../core/dom';
import type { SbbHorizontalFrom } from '../../core/interfaces';
import { AgnosticResizeObserver } from '../../core/observers';

import style from './header-action.scss?lit&inline';

export declare class SbbHeaderActionCommonElementMixinType implements SbbIconNameMixinType {
  public expandFrom: SbbHorizontalFrom;
  public iconName?: string;
  public renderIconSlot(): TemplateResult;
  public renderHeaderActionCommonTemplate(
    attributes?: Record<string, string>,
    customTemplate?: TemplateResult | typeof nothing,
  ): TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbHeaderActionCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbHeaderActionCommonElementMixinType> & T => {
  abstract class SbbHeaderActionCommonElement
    extends SbbIconNameMixin(superClass)
    implements SbbHeaderActionCommonElementMixinType
  {
    public static styles: CSSResultGroup = style;

    /**
     * Used to set the minimum breakpoint from which the text is displayed.
     * E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra,
     * and hidden for all the others.
     */
    @property({ attribute: 'expand-from', reflect: true })
    public set expandFrom(value: SbbHorizontalFrom) {
      this._expandFrom = value;
      this._updateExpanded();
    }
    public get expandFrom(): SbbHorizontalFrom {
      return this._expandFrom;
    }
    private _expandFrom: SbbHorizontalFrom = 'medium';

    private _documentResizeObserver = new AgnosticResizeObserver(() => this._updateExpanded());

    private _updateExpanded(): void {
      toggleDatasetEntry(this, 'expanded', !isBreakpoint('zero', this.expandFrom));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._documentResizeObserver.observe(document.documentElement);
      this._updateExpanded();
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._documentResizeObserver.disconnect();
    }

    /**
     * @private
     */
    public renderHeaderActionCommonTemplate(
      attributes?: Record<string, string>,
      customTemplate?: TemplateResult | typeof nothing,
    ): TemplateResult {
      const TAG_NAME: string = attributes ? 'a' : 'span';

      /* eslint-disable lit/binding-positions */
      return html`
        <${unsafeStatic(TAG_NAME)} class="sbb-header-action" ${attributes ? spread(attributes) : nothing}>
          <span class="sbb-header-action__wrapper">
            <span class="sbb-header-action__icon">
              ${super.renderIconSlot()}
            </span>
            <span class="sbb-header-action__text">
              <slot></slot>
              ${customTemplate}
            </span>
          </span>
        </${unsafeStatic(TAG_NAME)}>
      `;
      /* eslint-enable lit/binding-positions */
    }
  }
  return SbbHeaderActionCommonElement as AbstractConstructor<SbbHeaderActionCommonElementMixinType> &
    T;
};
