import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbConnectedAbortController } from '../../core/controllers.js';

import style from './table-wrapper.scss?lit&inline';

/**
 * Wraps a table to enhance its functionality
 *
 * @slot - Use the unnamed slot to add the table.
 */
@customElement('sbb-table-wrapper')
export class SbbTableWrapperElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  private _abort = new SbbConnectedAbortController(this);

  public override connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('resize', () => this._checkHorizontalScrollbar(), {
      passive: true,
      signal: this._abort.signal,
    });
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._checkHorizontalScrollbar();
  }

  private _checkHorizontalScrollbar(): void {
    const wrapper: HTMLElement = this.shadowRoot!.querySelector('.sbb-table-wrapper')!;
    this.toggleAttribute(
      'data-has-horizontal-scrollbar',
      wrapper.scrollWidth > wrapper.offsetWidth,
    );
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-table-wrapper">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-table-wrapper': SbbTableWrapperElement;
  }
}
