import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';

import style from './breadcrumb.scss?lit&inline';

/**
 * It displays a link to a page; used within a `sbb-breadcrumb-group` it can display the path to the current page.
 *
 * @slot - Use the unnamed slot to add content to the breadcrumb.
 * @slot icon - Use this to display an icon as breadcrumb.
 */
export
@customElement('sbb-breadcrumb')
@slotState()
class SbbBreadcrumbElement extends SbbIconNameMixin(SbbHydrationMixin(SbbLinkBaseElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  protected override renderTemplate(): TemplateResult {
    return html`
      ${this.renderIconSlot('sbb-breadcrumb__icon')}
      <span class="sbb-breadcrumb__label">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-breadcrumb': SbbBreadcrumbElement;
  }
}
