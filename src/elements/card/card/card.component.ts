import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './card.scss?lit&inline';

/**
 * It displays content related to a single subject.
 *
 * @slot - Use the unnamed slot to add content to the card.
 * @slot badge - Use this slot to render a `sbb-card-badge` component.
 * @slot action - Use this slot to render a `sbb-card-button` or a `sbb-card-link` component.
 */
export
@customElement('sbb-card')
class SbbCardElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Option to set the component's background color. */
  @property({ reflect: true }) public accessor color:
    | 'white'
    | 'milk'
    | 'transparent-bordered'
    | 'transparent-bordered-dashed' = 'white';

  protected override render(): TemplateResult {
    return html`
      <slot name="action"></slot>
      <span class="sbb-card__wrapper">
        <slot></slot>
      </span>
      <span class="sbb-card__badge-wrapper">
        <slot name="badge"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card': SbbCardElement;
  }
}
