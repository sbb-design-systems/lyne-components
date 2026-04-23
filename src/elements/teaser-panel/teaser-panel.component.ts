import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { html } from 'lit/static-html.js';

import { boxSizingStyles, SbbElement } from '../core.ts';

import style from './teaser-panel.scss?inline';

/**
 * It displays the content in a vertically centered trapezoidal shape.
 * The component matches the parent element size and positions the panel accordingly.
 *
 * @slot - Use the unnamed slot to add text content to the panel
 */
export class SbbTeaserPanelElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-teaser-panel';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-teaser-panel">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-panel': SbbTeaserPanelElement;
  }
}
