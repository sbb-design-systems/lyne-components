import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { hostScrollbarStyles, SbbElement } from '../../core.ts';
import { sidebarContentCommonStyle } from '../../sidebar/common/styles.ts';

import style from './icon-sidebar-content.scss?inline';

/**
 * Container for the icon sidebar content. Intended to be placed inside an `sbb-icon-sidebar-container` element.
 *
 * @slot - Use the unnamed slot to add any content elements.
 */
export class SbbIconSidebarContentElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-icon-sidebar-content';
  public static override styles: CSSResultGroup = [
    hostScrollbarStyles,
    sidebarContentCommonStyle,
    unsafeCSS(style),
  ];

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
    'sbb-icon-sidebar-content': SbbIconSidebarContentElement;
  }
}
