import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { hostAttributes } from '../core/decorators.js';
import { SbbNegativeMixin } from '../core/mixins.js';

import style from './title.scss?lit&inline';

export type SbbTitleLevel = '1' | '2' | '3' | '4' | '5' | '6';

/**
 * It displays a title wrapped into a heading tag.
 *
 * @slot - Use the unnamed slot to display the title.
 * @cssprop [--sbb-title-margin-block-start=var(--sbb-spacing-responsive-m)] - Margin block start of the title.
 * @cssprop [--sbb-title-margin-block-end=var(--sbb-spacing-responsive-s)] - Margin block end of the title.
 */
@customElement('sbb-title')
@hostAttributes({
  role: 'heading',
})
export class SbbTitleElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Title level */
  @property({ reflect: true }) public level: SbbTitleLevel = '1';

  /** Visual level for the title. Optional, if not set, the value of level will be used. */
  @property({ attribute: 'visual-level', reflect: true })
  public visualLevel?: SbbTitleLevel;

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screen readers while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true
   */
  @property({ attribute: 'visually-hidden', reflect: true, type: Boolean })
  public visuallyHidden?: boolean;

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('level')) {
      this.setAttribute('aria-level', this.level);
    }
  }

  protected override render(): TemplateResult {
    const TAGNAME = `h${this.level}`;

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
    'sbb-title': SbbTitleElement;
  }
}
