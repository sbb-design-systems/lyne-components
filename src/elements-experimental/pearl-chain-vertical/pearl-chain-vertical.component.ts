import { boxSizingStyles, SbbElement } from '@sbb-esta/lyne-elements/core.js';
import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import style from './pearl-chain-vertical.scss?inline';

/**
 * It can be used as a container for the `sbb-pearl-chain-vertical-item` component.
 *
 * @slot - The unnamed slot is used for the `sbb-pearl-chain-vertical-item` component.
 */
export class SbbPearlChainVerticalElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-pearl-chain-vertical';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-pearl-chain-vertical">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-vertical': SbbPearlChainVerticalElement;
  }
}
