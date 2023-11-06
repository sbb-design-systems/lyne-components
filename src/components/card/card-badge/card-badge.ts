import { toggleDatasetEntry, getDocumentWritingMode } from '../../core/dom';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { setAttribute } from '../../core/dom';
import style from './card-badge.scss?lit&inline';

/**
 * @slot - Use the unnamed slot to add content to the badge.
 *   Content parts should be wrapped in `<span>` tags to achieve correct spacings.
 */
@customElement('sbb-card-badge')
export class SbbCardBadge extends LitElement {
  public static override styles: CSSResult = style;

  /** Color of the card badge. */
  @property({ reflect: true }) public color: 'charcoal' | 'white' = 'charcoal';

  private _parentElement?: HTMLElement;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._parentElement = this.parentElement;
    toggleDatasetEntry(this._parentElement, 'hasCardBadge', true);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    toggleDatasetEntry(this._parentElement, 'hasCardBadge', false);
    this._parentElement = undefined;
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'slot', 'badge');
    setAttribute(this, 'dir', getDocumentWritingMode());
    setAttribute(this, 'role', 'text');

    return html`
      <span class="sbb-card-badge-wrapper">
        <span class="sbb-card-badge">
          <span class="sbb-card-badge-background" aria-hidden="true"></span>
          <span class="sbb-card-badge-content">
            <slot></slot>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-badge': SbbCardBadge;
  }
}
