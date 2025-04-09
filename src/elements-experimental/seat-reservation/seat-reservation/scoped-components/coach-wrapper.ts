import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './coach-wrapper.scss?lit&inline';

/**
 * Wrapper class for coaches.
 */
export
@customElement('sbb-coach-wrapper')
class SbbCoachWrapperElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @forceType()
  @property({ attribute: 'width', type: String })
  public accessor width: string = '';

  @forceType()
  @property({ attribute: 'height', type: String })
  public accessor height: string = '';

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    if (_changedProperties.has('width')) {
      this.style?.setProperty('--sbb-coach-wrapper-width', `${this.width}`);
    }

    if (_changedProperties.has('height')) {
      this.style?.setProperty('--sbb-coach-wrapper-height', `${this.height}`);
    }
  }

  protected override render(): TemplateResult {
    return html`<div class="coach-wrapper"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-coach-wrapper': SbbCoachWrapperElement;
  }
}
