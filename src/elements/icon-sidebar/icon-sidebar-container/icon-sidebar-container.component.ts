import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement } from '../../core.ts';
import { sidebarContainerCommonStyle } from '../../sidebar/common/styles.ts';
import type { SbbIconSidebarElement } from '../icon-sidebar/icon-sidebar.component.ts';

import style from './icon-sidebar-container.scss?inline';

/**
 * This is the parent component to one or two `<sbb-icon-sidebar>`s and one `<sbb-icon-sidebar-content>` element.
 *
 * @slot - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
export class SbbIconSidebarContainerElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-icon-sidebar-container';
  public static override styles: CSSResultGroup = [sidebarContainerCommonStyle, unsafeCSS(style)];

  /** The icon-sidebar children. */
  public get sidebars(): SbbIconSidebarElement[] {
    return Array.from(
      this.querySelectorAll?.<SbbIconSidebarElement>(`:scope > sbb-icon-sidebar`) ?? [],
    );
  }

  /** The icon-sidebar child at the start position. */
  public get start(): SbbIconSidebarElement | null {
    return this.firstElementChild?.localName === 'sbb-icon-sidebar'
      ? (this.firstElementChild as SbbIconSidebarElement)
      : null;
  }

  /** The icon-sidebar child at the end position. */
  public get end(): SbbIconSidebarElement | null {
    return this.lastElementChild?.localName === 'sbb-icon-sidebar'
      ? (this.lastElementChild as SbbIconSidebarElement)
      : null;
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon-sidebar-container': SbbIconSidebarContainerElement;
  }
}
