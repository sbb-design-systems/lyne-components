import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement, screenReaderOnlyStyles } from '../../core.ts';
import { SbbTeaserCommonElementMixin } from '../common/teaser-common.ts';

import style from './teaser.scss?inline';

/**
 * It displays an interactive image with caption.
 *
 * @slot action - Slot for a static action, e.g. a `<sbb-secondary-button-static>` element. The action is displayed below the description.
 * @slot chip - Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot.
 * @slot image - Slot used to render the image.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
export class SbbTeaserElement extends SbbTeaserCommonElementMixin(SbbLinkBaseElement) {
  public static override readonly elementName: string = 'sbb-teaser';
  public static override styles: CSSResultGroup = [screenReaderOnlyStyles, unsafeCSS(style)];

  protected override render(): TemplateResult {
    // We render the content outside the anchor tag to allow screen readers to navigate through it
    return html`
      <div class="sbb-teaser__wrapper">
        ${this.renderLink(
          // For SEO, we add the accessibility label as hidden content of the link
          html`<span class="sbb-screen-reader-only">${this.accessibilityLabel}</span>`,
        )}
        ${this.renderTemplate()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser': SbbTeaserElement;
  }
}
