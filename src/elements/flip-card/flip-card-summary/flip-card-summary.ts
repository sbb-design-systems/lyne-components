import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';

import style from './flip-card-summary.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-flip-card-summary')
@hostAttributes({
  slot: 'summary',
})
export class SbbFlipCardSummaryElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** myProp documentation */
  @property({ attribute: 'image-alignment', reflect: true }) public imageAlignment:
    | 'after'
    | 'below' = 'after';

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card-summary--wrapper">
        <slot></slot>
        <div class="sbb-flip-card-summary--image-wrapper">
          <slot name="image"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card-summary': SbbFlipCardSummaryElement;
  }
}
