import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { boxSizingStyles } from '../core/styles.ts';
import type { SbbTitleElement } from '../title.ts';

import style from './message.scss?lit&inline';

/**
 * It displays a complex message combining a title, an image, an action and some content.
 *
 * @slot image - Use this slot to provide an `sbb-image` component.
 * @slot title - Use this slot to provide an `sbb-title`.
 * @slot subtitle - Use this slot to provide a subtitle, must be a paragraph.
 * @slot legend - Use this slot to provide a legend, must be a paragraph.
 * @slot action - Use this slot to provide an `sbb-secondary-button`.
 */
export
@customElement('sbb-message')
class SbbMessageElement extends LitElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

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
    return html`
      <div class="sbb-message__container">
        <slot name="image"></slot>
        <slot name="title" @slotchange=${this._configureTitle}></slot>
        <slot name="subtitle"></slot>
        <slot name="legend"></slot>
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-message': SbbMessageElement;
  }
}
