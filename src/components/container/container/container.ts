import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { AgnosticResizeObserver } from '../../core/observers';

import style from './container.scss?lit&inline';

/**
 * It displays its content with the default page spacing.
 *
 * @slot - Use the unnamed slot to add anything to the container.
 */
@customElement('sbb-container')
export class SbbContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the container is expanded. */
  @property({ type: Boolean, reflect: true }) public expanded = false;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public color: 'transparent' | 'white' | 'milk' | 'midnight' =
    'transparent';

  private _containerResizeObserver = new AgnosticResizeObserver(() => this._setContainerWidth());

  private _setContainerWidth(): void {
    this.style.setProperty('--sbb-sticky-bar-width', `${this.clientWidth}px`);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._containerResizeObserver.observe(this);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._containerResizeObserver.disconnect();
  }

  /**
   * @internal
   * Internal getter that returns the container's inner div.
   */
  public get containerInnerElement(): HTMLDivElement {
    return this.shadowRoot.querySelector('.sbb-container');
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-container': SbbContainerElement;
  }
}
