import { InterfaceSbbLoadingIndicatorAttributes } from './sbb-loading-indicator.custom';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { setAttribute } from '../../global/dom';
import Style from './sbb-loading-indicator.scss?lit&inline';

@customElement('sbb-loading-indicator')
export class SbbLoadingIndicator extends LitElement {
  public static override styles: CSSResult = Style;

  /** Variant of the loading indicator; `circle` is meant to be used inline, while `window` as overlay. */
  @property({ reflect: true }) public variant?: InterfaceSbbLoadingIndicatorAttributes['variant'];

  /** Size variant, either s or m. */
  @property({ reflect: true }) public size: InterfaceSbbLoadingIndicatorAttributes['size'] = 's';

  /** Color variant. */
  @property({ reflect: true }) public color: InterfaceSbbLoadingIndicatorAttributes['color'] =
    'default';

  /** Whether the animation is enabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  protected override render(): TemplateResult {
    setAttribute(this, 'role', 'progressbar');
    setAttribute(this, 'aria-busy', 'true');

    return html`
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element">
          ${this.variant === 'window'
            ? html`<span>
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>`
            : nothing}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-loading-indicator': SbbLoadingIndicator;
  }
}
