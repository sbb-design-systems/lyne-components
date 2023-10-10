import { InterfaceSbbCardAttributes } from './sbb-card.custom';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Style from './sbb-card.scss?lit&inline';

/**
 * @slot unnamed - Slot to render the content.
 * @slot badge - Slot to render `<sbb-card-badge>`.
 */
@customElement('sbb-card')
export class SbbCard extends LitElement {
  public static override styles: CSSResult = Style;

  /** Size variant, either xs, s, m, l, xl, xxl or xxxl. */
  @property({ reflect: true }) public size?: InterfaceSbbCardAttributes['size'] = 'm';

  /** Option to set the component's background color. */
  @property({ reflect: true }) public color: InterfaceSbbCardAttributes['color'] = 'white';

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
