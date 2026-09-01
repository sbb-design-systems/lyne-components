import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { SbbActionBaseElement } from '../../core.ts';
import { SbbTeaserCommonElementMixin } from '../common/teaser-common.ts';

/**
 * Non-interactive variant of the `<sbb-teaser>`.
 *
 * @slot action - Slot for an interactive action, e.g. a `<sbb-secondary-button-link>` element. The action is displayed below the description.
 * @slot chip - Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot.
 * @slot image - Slot used to render the image.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
export class SbbTeaserStaticElement extends SbbTeaserCommonElementMixin(SbbActionBaseElement) {
  public static override readonly elementName: string = 'sbb-teaser-static';

  protected override render(): TemplateResult {
    return html` <div class="sbb-teaser__wrapper">${this.renderTemplate()}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-static': SbbTeaserStaticElement;
  }
}
