import { CSSResult, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { setAttribute } from '../core/dom';

import style from './title.scss?lit&inline';

export type TitleLevel = '1' | '2' | '3' | '4' | '5' | '6';

/**
 * It displays a title wrapped into a heading tag.
 *
 * @slot - Use the unnamed slot to display the title.
 */
@customElement('sbb-title')
export class SbbTitle extends LitElement {
  public static override styles: CSSResult = style;

  /** Title level */
  @property({ reflect: true }) public level?: TitleLevel = '1';

  /** Visual level for the title. Optional, if not set, the value of level will be used. */
  @property({ attribute: 'visual-level', reflect: true })
  public visualLevel?: TitleLevel;

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screen readers while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true
   */
  @property({ attribute: 'visually-hidden', reflect: true, type: Boolean })
  public visuallyHidden?: boolean;

  /** Choose negative variant */
  @property({ reflect: true, type: Boolean }) public negative?: boolean = false;

  protected override render(): TemplateResult {
    const TAGNAME = `h${this.level}`;
    setAttribute(this, 'role', 'heading');
    setAttribute(this, 'aria-level', this.level);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAGNAME)} class="sbb-title" role="presentation">
        <slot></slot>
      </${unsafeStatic(TAGNAME)}>
    `;
    /* eslint-enable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-title': SbbTitle;
  }
}
