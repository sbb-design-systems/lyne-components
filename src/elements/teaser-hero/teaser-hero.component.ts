import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement, type SbbElementType } from '../core.ts';
import { forceType, omitEmptyConverter, boxSizingStyles } from '../core.ts';
import { SbbBlockLinkStaticElement } from '../link.pure.ts';

import style from './teaser-hero.scss?inline';

/**
 * It displays an image and an action call within a panel.
 *
 * @slot - Use the unnamed slot to add text content to the panel
 * @slot link-content - Link content of the panel
 * @slot image - The background image that can be a `sbb-image`
 * @slot chip - The `sbb-chip-label` component that will be displayed on top-left corner
 */
export class SbbTeaserHeroElement extends SbbLinkBaseElement {
  public static override readonly elementName: string = 'sbb-teaser-hero';
  public static override elementDependencies: SbbElementType[] = [SbbBlockLinkStaticElement];
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Panel link text. */
  @forceType()
  @property({ attribute: 'link-content', reflect: true, converter: omitEmptyConverter })
  public accessor linkContent: string = '';

  private _imageSlotChanged(): void {
    Array.from(this.querySelectorAll('sbb-chip-label')).forEach((c) => (c.color = 'charcoal'));
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      <span class="sbb-teaser-hero__panel">
        <p class="sbb-teaser-hero__panel-text">
          <slot></slot>
        </p>
        <sbb-block-link-static
          class="sbb-teaser-hero__panel-link"
          icon-name="chevron-small-right-small"
          icon-placement="end"
          size="m"
          negative
        >
          <slot name="link-content">${this.linkContent}</slot>
        </sbb-block-link-static>
      </span>
      <slot name="image" @slotchange=${this._imageSlotChanged}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-hero': SbbTeaserHeroElement;
  }
}
