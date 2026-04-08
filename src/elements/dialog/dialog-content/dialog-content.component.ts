import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';

import { SbbElement } from '../../core.ts';

import style from './dialog-content.scss?inline';

/**
 * Use this component to provide a content for an `sbb-dialog`.
 *
 * @slot - Use the unnamed slot to provide a dialog content.
 */
export class SbbDialogContentElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-dialog-content';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  public override connectedCallback(): void {
    super.connectedCallback();

    // As we can't include the scrollbar mixin on the host and to minimize
    // payload, we decided to add the scrollbar class here.
    // This is an exception as we normally don't alter the classList of the host.
    this.classList.add('sbb-scrollbar');
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog-content': SbbDialogContentElement;
  }
}
