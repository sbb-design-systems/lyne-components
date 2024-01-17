import { spread } from '@open-wc/lit-helpers';
import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController } from '../../../core/common-behaviors';
import { SbbLinkBaseElement } from '../../../core/common-behaviors/button-link';
import { setAttribute, setAttributes } from '../../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../../core/i18n';
import {
  LinkButtonRenderVariables,
  newResolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../../../core/interfaces';
import { SbbCardActionCommonElementMixin } from '../card-action-common';

/**
 * It turns the `sbb-card` into a link element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the link (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-link')
export class SbbCardLinkElement extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {
  private _language = new LanguageController(this);

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = newResolveLinkOrStaticRenderVariables(this);

    if (this.card) {
      this.card.dataset.actionRole = hostAttributes.role;
    }

    setAttribute(this, 'slot', 'action');
    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} ${spread(attributes)} class="sbb-card-action">
        <span class="sbb-card-action__label">
          <slot></slot>
          ${
            targetsNewWindow(this)
              ? html`. ${i18nTargetOpensInNewWindow[this._language.current]}`
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
    'sbb-card-link': SbbCardLinkElement;
  }
}
