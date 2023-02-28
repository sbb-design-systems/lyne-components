import {
  Component,
  Element,
  h,
  JSX,
  Host,
  Prop,
  State,
  Watch,
  ComponentInterface,
} from '@stencil/core';
import { getSvgContent } from './sbb-icon-request';

@Component({
  shadow: true,
  styleUrl: 'sbb-icon.scss',
  tag: 'sbb-icon',
})
export class SbbIcon implements ComponentInterface {
  private _svgName: string;

  @State() private _svgNamespace = 'default';

  @Element() private _element!: HTMLElement;

  /**
   * The icon svg content rendered on the page: <svg>...</svg>.
   */
  @State() private _svgIcon: string;

  /**
   * The provided name consisting of the namespace and the name of the icon.
   * If the namespace is missing, the default namespace "sbb" will be used.
   * E.g. `name` (will use "sbb" as namespace) or `namespace:name`.
   */
  @Prop({ reflect: true }) public name: string;

  /**
   * When set to `false`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   * @default true
   */
  @Prop() public sanitize = true;

  /**
   * The aria-hidden property is set to "true" by default, since an icon alone
   * does not convey any useful information for a screen-reader user.
   */
  @Prop({ reflect: true }) public ariaHidden = 'true';

  /**
   * Only set the aria-label if aria-hidden is set to "false".
   */
  @Prop({ mutable: true, reflect: true }) public ariaLabel: string;

  public connectedCallback(): void {
    this._loadSvgIcon(this.name);
  }

  /**
   * Update the icon svg content on name change
   */
  @Watch('name')
  public updateSvgIcon(newValue: string, oldValue: string): void {
    if (newValue !== oldValue) {
      this._element.removeAttribute('aria-label');
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
      this.ariaLabel = `Icon ${this._svgName.replace(/-/g, ' ')}`;
    }

    this._svgIcon = await getSvgContent(this._svgNamespace, this._svgName, this.sanitize);
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

  public render(): JSX.Element {
    return (
      <Host role="img" data-namespace={this._svgNamespace} data-empty={!this._svgIcon}>
        {this._svgIcon ? (
          <span class="sbb-icon-inner" innerHTML={this._svgIcon}></span>
        ) : (
          <span class="sbb-icon-inner">
            {/* To reserve space, we need an empty svg to apply dimension to. */}
            <svg width="0" height="0"></svg>
          </span>
        )}
      </Host>
    );
  }
}
