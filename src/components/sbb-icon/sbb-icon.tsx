import { getSvgContent } from './sbb-icon-request';
import { html, LitElement, nothing, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { setAttribute } from '../../global/dom';
import Style from './sbb-icon.scss?lit&inline';

@customElement('sbb-icon')
export class SbbIcon extends LitElement {
  public static override styles = Style;

  private _svgName: string;
  private _svgFetchInProgress: boolean;
  private _defaultAriaLabel: string;

  @state() private _svgNamespace = 'default';

  /**
   * The icon svg content rendered on the page: <svg>...</svg>.
   */
  @state() private _svgIcon: string;

  /**
   * The provided name consisting of the namespace and the name of the icon.
   * If the namespace is missing, the default namespace "sbb" will be used.
   * E.g. `name` (will use "sbb" as namespace) or `namespace:name`.
   */
  @property({ reflect: true }) public name: string;

  /**
   * When set to `false`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   * @default true
   */
  @property({ type: Boolean }) public sanitize = true;

  /**
   * The aria-hidden property is set to "true" by default, since an icon alone
   * does not convey any useful information for a screen-reader user.
   */
  @property({ attribute: 'aria-hidden', reflect: true }) public override ariaHidden = 'true';

  /**
   * Only set the aria-label if aria-hidden is set to "false".
   */
  @property({ attribute: 'aria-label', reflect: true }) public override ariaLabel: string;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('name')) {
      this._updateSvgIcon(this.name, changedProperties.get('name'));
    }
  }

  /**
   * Update the icon svg content on name change
   */
  private _updateSvgIcon(newValue: string, oldValue: string): void {
    if (newValue !== oldValue) {
      // If the icon is changing and we were using the defaultAriaLabel, reset it
      if (this.ariaLabel === this._defaultAriaLabel) {
        this.ariaLabel = null;
      }

      this._loadSvgIcon(newValue);
    }
  }

  private async _loadSvgIcon(iconName: string): Promise<void> {
    if (!iconName) {
      return;
    }

    const [namespace, name] = this._splitIconName(iconName);

    if (namespace) {
      this._svgNamespace = namespace;
    }

    if (name) {
      this._svgName = name;
    }

    // generate a default label in case user does not provide their own
    // and aria-hidden is set to "false"
    if (this.ariaHidden === 'false' && !this.ariaLabel && this._svgName) {
      this.ariaLabel = this._defaultAriaLabel = `Icon ${this._svgName.replace(/-/g, ' ')}`;
    }

    this._svgFetchInProgress = true;
    this._svgIcon = await getSvgContent(this._svgNamespace, this._svgName, this.sanitize);
    this._svgFetchInProgress = false;
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
    setAttribute(this, 'data-empty', !this._svgIcon && !this._svgFetchInProgress);

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

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon': SbbIcon;
  }
}
