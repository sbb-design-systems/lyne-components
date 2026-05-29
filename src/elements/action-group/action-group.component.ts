import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement } from '../core.ts';

import style from './action-group.scss?inline';

/**
 * It can be used as a container for one or more action element, like `sbb-button` or `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`.
 */
export class SbbActionGroupElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-action-group';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-action-group': SbbActionGroupElement;
  }
}
