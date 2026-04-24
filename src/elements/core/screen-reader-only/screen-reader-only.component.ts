import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement } from '../base-elements/element.ts';

import style from './screen-reader-only.scss?inline';

/**
 * This component can be used to visually hide content but present it to screen readers.
 *
 * @slot - Use the unnamed slot to provide content.
 */
export class SbbScreenReaderOnlyElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-screen-reader-only';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-screen-reader-only': SbbScreenReaderOnlyElement;
  }
}
