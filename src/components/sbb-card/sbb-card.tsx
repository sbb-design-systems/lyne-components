import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './sbb-card.scss?lit&inline';

/**
 * @slot - Use the unnamed slot to add content to the card.
 * @slot badge - Slot to render `<sbb-card-badge>`.
 * @slot action - Slot to render `<sbb-card-action>`.
 */
@customElement('sbb-card')
export class SbbCard extends LitElement {
  public static override styles: CSSResult = style;

  /** Size variant, either xs, s, m, l, xl, xxl or xxxl. */
  @property({ reflect: true }) public size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'm';

  /** Option to set the component's background color. */
  @property({ reflect: true }) public color:
    | 'white'
    | 'milk'
    | 'transparent-bordered'
    | 'transparent-bordered-dashed' = 'white';

  /**
   * It is used internally to show the `<sbb-card-badge>`.
   *
   * @returns True whether size is equal to m, l, xl or xxl.
   */
  private _isBadgeVisible(): boolean {
    return ['m', 'l', 'xl', 'xxl', 'xxxl'].includes(this.size);
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-card">
        <slot name="action"></slot>
        <span class="sbb-card__wrapper">
          <slot></slot>
        </span>
        ${this._isBadgeVisible()
          ? html`<span class="sbb-card__badge-wrapper">
              <slot name="badge"></slot>
            </span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card': SbbCard;
  }
}
