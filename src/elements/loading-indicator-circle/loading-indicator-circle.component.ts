import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';

import style from './loading-indicator-circle.scss?lit&inline';

/**
 * It displays a circle loading indicator.
 */
export
@customElement('sbb-loading-indicator-circle')
class SbbLoadingIndicatorCircleElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'progressbar';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Color variant. */
  @property({ reflect: true }) public accessor color: 'default' | 'smoke' | 'white' = 'default';

  public override connectedCallback(): void {
    super.connectedCallback();
    this.internals.ariaBusy = 'true';
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element"></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-loading-indicator-circle': SbbLoadingIndicatorCircleElement;
  }
}
