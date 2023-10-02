import { TitleLevel } from '../sbb-title';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Style from './sbb-message.scss?lit&inline';

/**
 * @slot image - Use this slot to provide an sbb-image component.
 * @slot title - Use this slot to provide title text for the component.
 * @slot subtitle - Use this slot to provide a subtitle, must be a paragraph.
 * @slot legend - Use this slot to provide a legend, must be a paragraph.
 * @slot action - Use this slot to provide an sbb-button.
 */
@customElement('sbb-message')
export class SbbMessage extends LitElement {
  public static override styles: CSSResult = Style;

  /** Content of title. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '3';

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-message__container">
        <slot name="image"></slot>
        <sbb-title level=${this.titleLevel} visual-level="5" class="sbb-message__title">
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
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
    'sbb-message': SbbMessage;
  }
}
