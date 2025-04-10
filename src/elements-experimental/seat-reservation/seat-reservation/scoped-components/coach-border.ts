import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './coach-border.scss?lit&inline';

/**
 * Wrapper class for coach border elements.
 */
export
@customElement('sbb-coach-border')
class SbbCoachBorderElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @forceType()
  @property({ attribute: 'inset-block-start', type: String })
  public accessor insetBlockStart: string = '';

  @forceType()
  @property({ attribute: 'inset-inline-start', type: String })
  public accessor insetInlineStart: string = '';

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    if (_changedProperties.has('insetBlockStart')) {
      this.style?.setProperty('--sbb-coach-border-inset-block-start', `${this.insetBlockStart}`);
    }

    if (_changedProperties.has('insetInlineStart')) {
      this.style?.setProperty('--sbb-coach-border-inset-inline-start', `${this.insetInlineStart}`);
    }
  }

  protected override render(): TemplateResult {
    return html`<div class="coach-border"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-coach-border': SbbCoachBorderElement;
  }
}
