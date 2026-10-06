import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { hostScrollbarStyles, SbbElement } from '../../core.ts';
import type { SbbIconSidebarContainerElement } from '../icon-sidebar-container/icon-sidebar-container.component.ts';

import style from './icon-sidebar.scss?inline';

/**
 * Icon sidebar, can be placed inside a `sbb-icon-sidebar-container` element.
 *
 * @slot - Use the unnamed slot to slot any content into the icon-sidebar.
 */
export class SbbIconSidebarElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-icon-sidebar';
  public static override readonly role = 'navigation';
  public static override styles: CSSResultGroup = [hostScrollbarStyles, unsafeCSS(style)];

  /** Background color of the icon sidebar. Either `white` or `milk`. **/
  @property({ reflect: true })
  public accessor color: 'white' | 'milk' = 'white';

  /** Returns the SbbIconSidebarContainerElement where this icon-sidebar is contained. */
  public get container(): SbbIconSidebarContainerElement | null {
    return this.closest('sbb-icon-sidebar-container');
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
    'sbb-icon-sidebar': SbbIconSidebarElement;
  }
}
