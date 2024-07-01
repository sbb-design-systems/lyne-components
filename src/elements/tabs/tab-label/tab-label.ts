import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { slotState } from '../../core/decorators.js';
import { SbbDisabledMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbTitleLevel } from '../../title.js';

import style from './tab-label.scss?lit&inline';

/**
 * Combined with a `sbb-tab-group`, it displays a tab's title.
 *
 * @slot - Use the unnamed slot to add content to the tab title.
 * @slot icon - Use this slot to display an icon to the left of the title, by providing the `sbb-icon` component.
 * @slot amount - Provide a number to show an amount to the right of the title.
 */
@customElement('sbb-tab-label')
@slotState()
export class SbbTabLabelElement extends SbbDisabledMixin(SbbIconNameMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  /**
   * The level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @property() public level: SbbTitleLevel = '1';

  /** Active tab state */
  @property({ reflect: true, type: Boolean }) public active?: boolean;

  /** Amount displayed inside the tab. */
  @property({ reflect: true }) public amount?: string;

  protected override render(): TemplateResult {
    const TAGNAME = `h${Number(this.level) < 7 ? this.level : '1'}`;

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-tab-label__wrapper">
        <${unsafeStatic(TAGNAME)} class="sbb-tab-label">
          <span class="sbb-tab-label__icon">
            ${this.renderIconSlot()}
          </span>
          <span class="sbb-tab-label__text">
            <slot></slot>
          </span>
          <span class="sbb-tab-label__amount">
            <slot name="amount">${this.amount}</slot>
          </span>
        </${unsafeStatic(TAGNAME)}>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab-label': SbbTabLabelElement;
  }
}
