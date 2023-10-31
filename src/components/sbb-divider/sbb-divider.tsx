import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { setAttribute } from '../../global/dom';
import style from './sbb-divider.scss?lit&inline';
import { SbbOrientation } from '../../global/types';

@customElement('sbb-divider')
export class SbbDivider extends LitElement {
  public static override styles: CSSResult = style;

  /** Negative coloring variant flag */
  @property({ reflect: true, type: Boolean }) public negative?: boolean = false;

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @property({ reflect: true }) public orientation?: SbbOrientation = 'horizontal';

  protected override render(): TemplateResult {
    setAttribute(this, 'role', 'separator');
    setAttribute(this, 'aria-orientation', this.orientation);

    return html` <div class="sbb-divider"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-divider': SbbDivider;
  }
}
