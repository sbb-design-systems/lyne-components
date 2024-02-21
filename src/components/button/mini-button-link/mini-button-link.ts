import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbDisabledTabIndexActionMixin, SbbLinkBaseElement } from '../../core/common-behaviors';
import { SbbButtonCommonElementMixin } from '../common/button-common';
import commonStyle from '../common/button-common.scss?lit&inline';
import style from '../common/mini-button.scss?lit&inline';

/**
 * It displays an icon-only button enhanced with the SBB Design, which will behave as a link;
 * it's meant to be used mainly within the sbb-form-field in prefix/suffix slot.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-mini-button-link')
export class SbbMiniButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbLinkBaseElement),
) {
  public static override styles: CSSResultGroup = [commonStyle, style];

  protected override renderTemplate(): TemplateResult {
    return this.renderIcon();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button-link': SbbMiniButtonLinkElement;
  }
}
