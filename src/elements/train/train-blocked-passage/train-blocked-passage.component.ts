import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';

import { SbbElement } from '../../core/base-elements.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './train-blocked-passage.scss?inline';

/**
 * It visually displays a blocked passage between train wagons.
 */
export class SbbTrainBlockedPassageElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-train-blocked-passage';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

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
