import { CSSResultGroup, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../core/eventing';
import type { TitleLevel } from '../../title';

import style from './tab-title.scss?lit&inline';
import '../../icon';

/**
 * Combined with a `sbb-rab-group`, it displays a tab's title.
 *
 * @slot - Use the unnamed slot to add content to the tab title.
 * @slot icon - Use this slot to display an icon to the left of the title, by providing the `sbb-icon` component.
 * @slot amount - Provide a number to show an amount to the right of the title.
 */
@customElement('sbb-tab-title')
export class SbbTabTitle extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * The level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @property() public level?: TitleLevel = '1';

  /** Active tab state */
  @property({ reflect: true, type: Boolean }) public active?: boolean;

  /** Disabled tab state */
  @property({ reflect: true, type: Boolean }) public disabled?: boolean;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string;

  /** Amount displayed inside the tab. */
  @property() public amount?: string;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('icon', 'amount');

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const TAGNAME = `h${Number(this.level) < 7 ? this.level : '1'}`;

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-tab-title__wrapper">
        <${unsafeStatic(TAGNAME)} class="sbb-tab-title">
          ${
            this.iconName || this._namedSlots['icon']
              ? html`<span class="sbb-tab-title__icon">
                  <slot name="icon">
                    ${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}
                  </slot>
                </span>`
              : nothing
          }
          <span class="sbb-tab-title__text">
            <slot></slot>
          </span>
          ${
            this.amount || this._namedSlots['amount']
              ? html`<span class="sbb-tab-title__amount">
                  <slot name="amount">${this.amount}</slot>
                </span>`
              : nothing
          }
        </${unsafeStatic(TAGNAME)}>
      </div>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab-title': SbbTabTitle;
  }
}
