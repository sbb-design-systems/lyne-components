import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbElement, boxSizingStyles } from '../core.ts';

import style from './loading-indicator-circle.scss?inline';

/**
 * It displays a circle loading indicator.
 */
export class SbbLoadingIndicatorCircleElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-loading-indicator-circle';
  public static override readonly role = 'progressbar';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Color variant. */
  @property({ reflect: true }) public accessor color: 'default' | 'smoke' | 'white' = 'default';

  public override connectedCallback(): void {
    super.connectedCallback();
    this.internals.ariaBusy = 'true';
  }

  protected override render(): TemplateResult {
    return html`<span class="sbb-loading-indicator">
      <span class="sbb-loading-indicator__animated-element"></span>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-loading-indicator-circle': SbbLoadingIndicatorCircleElement;
  }
}
