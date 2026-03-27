import type { CSSResultGroup, TemplateResult, unsafeCSS } from 'lit';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement } from '../../core/base-elements.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';

import style from './breadcrumb.scss?inline';

/**
 * It displays a link to a page; used within a `sbb-breadcrumb-group` it can display the path to the current page.
 *
 * @slot - Use the unnamed slot to add content to the breadcrumb.
 * @slot icon - Use this to display an icon as breadcrumb.
 */
export class SbbBreadcrumbElement extends SbbIconNameMixin(SbbLinkBaseElement) {
  public static override readonly elementName: string = 'sbb-breadcrumb';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

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
