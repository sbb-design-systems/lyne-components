import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './sbb-chip.scss?lit&inline';

/**
 * @slot - Content / Label of the chip
 */
@customElement('sbb-chip')
export class SbbChip extends LitElement {
  public static override styles: CSSResult = style;

  /** Size of the chip. */
  @property({ reflect: true })
  public size: 'xxs' | 'xs' | 's' = 'xxs';

  /** Color of the chip. */
  @property({ reflect: true })
  public color: 'milk' | 'charcoal' | 'white' | 'granite' = 'milk';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-chip">
        <span class="sbb-chip__text-wrapper">
          <slot></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip': SbbChip;
  }
}
