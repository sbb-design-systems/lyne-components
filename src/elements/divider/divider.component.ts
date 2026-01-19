import type { CSSResultGroup, PropertyValues } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbOrientation } from '../core/interfaces.ts';
import { SbbElementInternalsMixin, SbbNegativeMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';

import style from './divider.scss?lit&inline';

/**
 * Displays a divider between sections.
 */
export
@customElement('sbb-divider')
class SbbDividerElement extends SbbNegativeMixin(SbbElementInternalsMixin(LitElement)) {
  public static override readonly role = 'separator';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'horizontal';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('orientation')) {
      this.internals.ariaOrientation = this.orientation;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-divider': SbbDividerElement;
  }
}
