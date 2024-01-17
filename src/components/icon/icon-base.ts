import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import { setAttribute } from '../core/dom';

import { getSvgContent } from './icon-request';
import style from './icon.scss?lit&inline';

export abstract class SbbIconBase extends LitElement {
  public static override styles: CSSResultGroup = style;

  @state() private _svgNamespace = 'default';

  /**
   * The icon svg content rendered on the page: <svg>...</svg>.
   */
  @state() private _svgIcon: string;

  /**
   * When set to `true`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   * @default false
   */
  @property({ attribute: 'no-sanitize', type: Boolean }) public noSanitize = false;

  protected async loadSvgIcon(iconName: string): Promise<void> {
    if (!iconName) {
      return;
    }

    const [namespace, name] = this._splitIconName(iconName);

    if (namespace) {
      this._svgNamespace = namespace;
    }

    this._svgIcon = await this.fetchSvgIcon(this._svgNamespace, name);
  }

  protected async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    return await getSvgContent(namespace, name, !this.noSanitize);
  }

  private _splitIconName(iconName: string): [string, string] {
    if (!iconName) {
      return ['', ''];
    }
    const parts = iconName.split(':');
    switch (parts.length) {
      case 1:
        return ['', parts[0]]; // Use default namespace
      case 2:
        return parts as [string, string];
      default:
        throw Error(`Invalid icon name: "${iconName}"`);
    }
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'role', this.getAttribute('role') ?? 'img');
    setAttribute(this, 'data-namespace', this._svgNamespace);
    setAttribute(this, 'data-empty', !this._svgIcon);

    return html`
      ${this._svgIcon
        ? html`<span class="sbb-icon-inner" .innerHTML=${this._svgIcon}></span>`
        : html`<span class="sbb-icon-inner">
            <!-- To reserve space, we need an empty svg to apply dimension to. -->
            <svg width="0" height="0"></svg>
          </span>`}
    `;
  }
}
