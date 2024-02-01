import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type LinkRenderVariables,
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
  SlotChildObserver,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';

import style from './breadcrumb.scss?lit&inline';

import '../../icon';

/**
 * It displays a link to a page; used within a `sbb-breadcrumb-group` it can display the path to the current page.
 *
 * @slot - Use the unnamed slot to add content to the breadcrumb.
 * @slot icon - Use this to display an icon as breadcrumb.
 */
@customElement('sbb-breadcrumb')
export class SbbBreadcrumbElement extends SlotChildObserver(SbbLinkBaseElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string;

  @state() private _hasText = false;

  protected override checkChildren(): void {
    this._hasText = Array.from(this.childNodes ?? []).some(
      (n) => !(n as Element).slot && n.textContent?.trim(),
    );
  }

  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-breadcrumb" ${spread(attributes)}>
        <slot name="icon">
          ${this.iconName
            ? html`<sbb-icon name="${this.iconName}" class="sbb-breadcrumb__icon"></sbb-icon>`
            : nothing}
        </slot>
        <span class="sbb-breadcrumb__label" ?hidden=${!this._hasText}>
          <slot></slot>
        </span>
        ${super.renderTargetNewWindow()}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-breadcrumb': SbbBreadcrumbElement;
  }
}
