import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbChipLabelElement } from '../chip-label.js';
import { SbbLinkBaseElement } from '../core/base-elements.js';
import { slotState } from '../core/decorators.js';
import type { SbbTitleElement } from '../title.js';

import style from './teaser.scss?lit&inline';

import '../chip-label.js';
import '../screen-reader-only.js';

/**
 * It displays an interactive image with caption.
 *
 * @slot image - Slot used to render the image.
 * @slot - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
export
@customElement('sbb-teaser')
@slotState()
class SbbTeaserElement extends SbbLinkBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Teaser variant - define the position and the alignment of the text block. */
  @property({ reflect: true }) public accessor alignment: 'after-centered' | 'after' | 'below' =
    'after-centered';

  private _configureTitleAndChip(event: Event): void {
    const title = this.querySelector?.<SbbTitleElement>('sbb-title');
    const chipLabel = (event.target as HTMLSlotElement)
      .assignedElements()
      .find(
        (e): e is SbbChipLabelElement => e instanceof Element && e.localName === 'sbb-chip-label',
      );
    if (title) {
      customElements.upgrade(title);
      title.visualLevel = '5';
    }
    if (chipLabel) {
      customElements.upgrade(chipLabel);
      chipLabel.color = 'charcoal';
      chipLabel.size = 'xxs';
    }
  }

  protected override render(): TemplateResult {
    // We render the content outside the anchor tag to allow screen readers to navigate through it
    return html`
      <div class="sbb-teaser__wrapper">
        ${this.renderLink(
          // For SEO we add the accessibility hidden as hidden content of the link
          html`<sbb-screen-reader-only>${this.accessibilityLabel}</sbb-screen-reader-only>`,
        )}
        ${this.renderContent()}
      </div>
    `;
  }

  protected renderContent(): TemplateResult {
    return html`
      <span class="sbb-teaser__container">
        <span class="sbb-teaser__image-wrapper">
          <slot name="image"></slot>
        </span>
        <span class="sbb-teaser__text">
          <slot @slotchange=${(event: Event) => this._configureTitleAndChip(event)}></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser': SbbTeaserElement;
  }
}
