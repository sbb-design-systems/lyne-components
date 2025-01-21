import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  buttonCommonStyle,
  buttonSecondaryStyle,
  SbbButtonCommonElementMixin,
} from '../../button/common.js';
import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { i18nCloseNavigation } from '../../core/i18n.js';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins.js';

import style from './sidebar-close-button.scss?lit&inline';

/**
 * Close button, intended to be placed inside sbb-sidebar
 */
export
@customElement('sbb-sidebar-close-button')
@hostAttributes({
  slot: 'title-section',
})
class SbbSidebarCloseButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override styles: CSSResultGroup = [buttonCommonStyle, buttonSecondaryStyle, style];

  private _language?: string;
  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.iconName = 'cross-small';
    this.size = 's';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (this._language !== this._languageController.current) {
      if (
        !this.hasAttribute('aria-label') ||
        (!!this._language &&
          this.getAttribute('aria-label') === i18nCloseNavigation[this._language])
      ) {
        this.setAttribute('aria-label', i18nCloseNavigation[this._languageController.current]);
      }
      this._language = this._languageController.current;
    }
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-close-button': SbbSidebarCloseButtonElement;
  }
}
