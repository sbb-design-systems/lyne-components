import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbChipLabelElement } from '../chip-label.ts';
import { SbbLinkBaseElement } from '../core/base-elements.ts';
import { boxSizingStyles } from '../core/styles.ts';
import type { SbbTitleElement } from '../title.ts';

import style from './teaser.scss?lit&inline';

import '../screen-reader-only.ts';

/**
 * It displays an interactive image with caption.
 *
 * @slot image - Slot used to render the image.
 * @slot chip - Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
export
@customElement('sbb-teaser')
class SbbTeaserElement extends SbbLinkBaseElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Teaser variant - define the position and the alignment of the text block. */
  @property({ reflect: true }) public accessor alignment: 'after-centered' | 'after' | 'below' =
    'after-centered';

  private _handleSlotchange(): void {
    const chip = Array.from(this.children).find((el) => el.localName === 'sbb-chip-label');
    if (chip) {
      chip.slot = 'chip';
    }

    const title = Array.from(this.children).find((el) => el.localName === 'sbb-title');
    if (title) {
      title.slot = 'title';
    }
  }

  private _configureChip(event: Event): void {
    // We need to check assigned elements because in the image slot it can have labels as well.
    const chipLabel = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is SbbChipLabelElement => e.localName === 'sbb-chip-label');

    if (chipLabel) {
      customElements.upgrade(chipLabel);
      chipLabel.color = 'charcoal';
      chipLabel.size = 'xxs';
    }
  }

  private _configureTitle(event: Event): void {
    const title = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is SbbTitleElement => e.localName === 'sbb-title');

    if (title) {
      customElements.upgrade(title);
      title.visualLevel = '5';
    }
  }

  protected override render(): TemplateResult {
    // We render the content outside the anchor tag to allow screen readers to navigate through it
    return html`
      <div class="sbb-teaser__wrapper">
        ${this.renderLink(
          // For SEO, we add the accessibility hidden as hidden content of the link
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
          <slot name="chip" @slotchange=${this._configureChip}></slot>
          <slot name="title" @slotchange=${this._configureTitle}></slot>
          <p class="sbb-teaser__description">
            <slot @slotchange=${this._handleSlotchange}></slot>
          </p>
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
