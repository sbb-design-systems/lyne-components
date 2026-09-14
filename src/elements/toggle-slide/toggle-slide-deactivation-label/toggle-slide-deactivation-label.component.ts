import { type CSSResultGroup, html, type TemplateResult } from 'lit';

import { SbbElement } from '../../core.ts';
import { toggleSlideLabelStyles } from '../toggle-slide-label-styles.ts';

/**
 * It displays the label shown while deactivating a `sbb-toggle-slide` (i.e. while sliding it towards the unchecked state).
 * It is meant to be slotted into the unnamed slot of a `sbb-toggle-slide`.
 *
 * @slot - Use the unnamed slot to add text content to the `sbb-toggle-slide-deactivation-label`.
 */
export class SbbToggleSlideDeactivationLabelElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-toggle-slide-deactivation-label';
  public static override styles: CSSResultGroup = [toggleSlideLabelStyles];

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-slide-deactivation-label': SbbToggleSlideDeactivationLabelElement;
  }
}
