import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { NamedSlotStateController, SbbLinkBaseElement } from '../core/common-behaviors';
import type { TitleLevel } from '../title';
import '../title';
import '../chip';

import style from './teaser.scss?lit&inline';

/**
 * It displays an interactive image with caption.
 *
 * @slot image - Slot used to render the image.
 * @slot chip - Slot used to render the sbb-chip label.
 * @slot title - Slot used to render the title.
 * @slot - Use the unnamed slot to render the description.
 */
@customElement('sbb-teaser')
export class SbbTeaserElement extends SbbLinkBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Teaser variant - define the position and the alignment of the text block. */
  @property({ reflect: true }) public alignment: 'after-centered' | 'after' | 'below' =
    'after-centered';

  /** Heading level of the sbb-title element (e.g. h1-h6). */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '5';

  /** Content of title. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** Content of chip. */
  @property({ attribute: 'chip-content', reflect: true }) public chipContent?: string;

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  protected renderTemplate(attributes: Record<string, string>): TemplateResult {
    return html`
      <a class="sbb-teaser" ${spread(attributes)}>
        <span class="sbb-teaser__container">
          <span class="sbb-teaser__image-wrapper">
            <slot name="image"></slot>
          </span>
          <span class="sbb-teaser__text">
            <sbb-chip size="xxs" color="charcoal" class="sbb-teaser__chip">
              <slot name="chip">${this.chipContent}</slot>
            </sbb-chip>
            <sbb-title level=${this.titleLevel} visual-level="5" class="sbb-teaser__lead">
              <slot name="title">${this.titleContent}</slot>
            </sbb-title>
            <span class="sbb-teaser__description">
              <slot></slot>
            </span>
            ${this.renderTargetNewWindow()}
          </span>
        </span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser': SbbTeaserElement;
  }
}
