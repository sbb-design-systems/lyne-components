import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbOrientation } from '../core.ts';
import { SbbElement, SbbNegativeMixin, boxSizingStyles } from '../core.ts';

import style from './divider.scss?inline';

/**
 * Displays a divider between sections.
 */
export class SbbDividerElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-divider';
  public static override readonly role = 'separator';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'horizontal';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('orientation')) {
      this.internals.ariaOrientation = this.orientation;
    }
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-divider"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-divider': SbbDividerElement;
  }
}
