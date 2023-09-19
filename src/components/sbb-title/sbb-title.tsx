import { LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import { setAttribute } from '../../global/dom';
import Style from './sbb-title.scss?lit&inline';

export type TitleLevel = '1' | '2' | '3' | '4' | '5' | '6';
const headingMap = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
  5: literal`h5`,
  6: literal`h6`,
};

@customElement('sbb-title')
export class SbbTitle extends LitElement {
  public static override styles = Style;

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
    const heading = headingMap[Number(this.level)] ?? headingMap[6];
    setAttribute(this, 'role', 'heading');
    setAttribute(this, 'aria-level', this.level);
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`
      <${heading} class="sbb-title" role="presentation">
        <slot></slot>
      </${heading}>
    `;
    /* eslint-enable lit/binding-positions, lit/no-invalid-html */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-title': SbbTitle;
  }
}
