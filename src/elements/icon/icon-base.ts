import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { DirectiveResult } from 'lit/directive.js';
import type { UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';

import { forceType, hostAttributes } from '../core/decorators.js';
import { boxSizingStyles } from '../core/host.js';
import { SbbElementInternalsMixin } from '../core/mixins.js';

import { getSvgContent } from './icon-request.js';
import style from './icon.scss?lit&inline';

const defaultNamespace = 'default';

/**
 * @cssprop [--sbb-icon-svg-width=auto] - Can be used to set a custom width.
 * @cssprop [--sbb-icon-svg-height=auto] - Can be used to set a custom height.
 */
export
@hostAttributes({
  'data-namespace': defaultNamespace,
  'data-empty': '',
})
abstract class SbbIconBase extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static override readonly role = 'img';

  @state() private accessor _svgNamespace = defaultNamespace;

  /**
   * The icon svg content rendered on the page: <svg>...</svg>.
   */
  @state() private accessor _svgIcon: Promise<DirectiveResult<typeof UnsafeHTMLDirective>> | null =
    null;

  /**
   * When set to `true`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   * @default false
   */
  @forceType()
  @property({ attribute: 'no-sanitize', type: Boolean })
  public accessor noSanitize: boolean = false;

  protected async loadSvgIcon(iconName: string): Promise<void> {
    if (!iconName) {
      return;
    }

    const [namespace, name] = this._splitIconName(iconName);
    this._svgNamespace = namespace;
    this.setAttribute('data-namespace', this._svgNamespace);

    const svgIcon = this.fetchSvgIcon(this._svgNamespace, name);
    this._svgIcon = svgIcon.then((v) => unsafeHTML(v));
    try {
      this.toggleAttribute('data-empty', !(await svgIcon));
    } catch {
      this.toggleAttribute('data-empty', true);
    }
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
        // Use default namespace if empty.
        return [defaultNamespace, parts[0]];
      case 2:
        return parts as [string, string];
      default:
        throw Error(`Invalid icon name: "${iconName}"`);
    }
  }

  protected override render(): TemplateResult {
    return html`<span class="sbb-icon-inner"
      >${until(
        this._svgIcon,
        // To reserve space, we need an empty svg to apply dimension to.
        html`<svg width="0" height="0"></svg>`,
      )}</span
    >`;
  }
}
