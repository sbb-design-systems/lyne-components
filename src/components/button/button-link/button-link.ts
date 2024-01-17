import { spread } from '@open-wc/lit-helpers';
import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController } from '../../core/common-behaviors';
import {
  SbbLinkBaseElement,
  SbbNegativeMixin,
  SbbIconNameMixin,
  SbbDisabledMixin,
} from '../../core/common-behaviors/button-link';
import { isValidAttribute, setAttributes } from '../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import { newResolveLinkOrStaticRenderVariables, targetsNewWindow } from '../../core/interfaces';
import { SbbButtonCommonElementMixin } from '../button-common';

/**
 * It displays a button enhanced with the SBB Design, which will behave as a link.
 *
 * @slot - Use the unnamed slot to add content to the button-link.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-link')
export class SbbButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbNegativeMixin(SbbDisabledMixin(SbbIconNameMixin(SbbLinkBaseElement))),
) {
  private _language = new LanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    // Check if the current element is nested in an action element.
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = isValidAttribute(formField, 'negative');
    }
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    } = newResolveLinkOrStaticRenderVariables(this);

    // ## Migr: Host attributes ##
    setAttributes(this, hostAttributes);
    // ####

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-button" ${spread(attributes)}>
        <span class="sbb-button__icon">
          <slot name="icon">
            ${this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
          </slot>
        </span>
        <span class="sbb-button__label">
          <slot></slot>
          ${
            targetsNewWindow(this)
              ? html` <span class="sbb-button__opens-in-new-window">
                  . ${i18nTargetOpensInNewWindow[this._language.current]}
                </span>`
              : nothing
          }
        </span>
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-link': SbbButtonLinkElement;
  }
}
