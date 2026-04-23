import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { hostScrollbarStyles, SbbElement, SbbPropertyWatcherController } from '../../core.ts';
import type { SbbDialogElement } from '../dialog/dialog.component.ts';

import style from './dialog-content.scss?inline';

/**
 * Use this component to provide a content for an `sbb-dialog`.
 *
 * @slot - Use the unnamed slot to provide a dialog content.
 */
export class SbbDialogContentElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-dialog-content';
  public static override styles: CSSResultGroup = [hostScrollbarStyles, unsafeCSS(style)];

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest<SbbDialogElement>('sbb-dialog'), {
        negative: (d) => this.toggleState('negative', d.negative),
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // When including the scrollbar styles on the host, there is no hover effect of the scrollbar possible.
    // In most cases, the component will be used in Light DOM. To also support the hover effect,
    // we additionally add the `sbb-scrollbar` CSS class to the host.
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
