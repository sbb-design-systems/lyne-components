import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbDisabledTabIndexActionMixin, SbbLinkBaseElement } from '../../core/common-behaviors';
import { SbbButtonCommonElementMixin } from '../common/button-common';

/**
 * It displays a button enhanced with the SBB Design, which will behave as a link.
 *
 * @slot - Use the unnamed slot to add content to the button-link.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-link')
export class SbbButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbLinkBaseElement),
) {
  public override renderTemplate(attributes: Record<string, string>): TemplateResult {
    return this.renderButtonCommonTemplate(attributes, this.renderTargetNewWindow());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-link': SbbButtonLinkElement;
  }
}
