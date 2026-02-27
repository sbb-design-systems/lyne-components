import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElement } from '../../core/base-elements.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './train-blocked-passage.scss?lit&inline';

/**
 * It visually displays a blocked passage between train wagons.
 */
export
@customElement('sbb-train-blocked-passage')
class SbbTrainBlockedPassageElement extends SbbElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-train-blocked-passage">
        <span class="sbb-train-blocked-passage__wrapper">
          <span class="sbb-train-blocked-passage__icon"></span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-blocked-passage': SbbTrainBlockedPassageElement;
  }
}
