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
import { getSvgContent, iconNamespaces, registeredIcons } from './request';
import { validateContent } from './validate';

@Component({
  shadow: true,
  styleUrl: 'sbb-icon.scss',
  tag: 'sbb-icon',
})
export class SbbIcon implements ComponentInterface {
  private _svgName: string;
  private _svgNamespace = 'default';

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

    // try to load SVG from registered icons
    this._svgIcon = this._loadRegisteredIcon();

    if (this._svgIcon) {
      return;
    }

    const url = this._resolveSvgUrl();

    if (url) {
      this._svgIcon = await getSvgContent(url, this.sanitize);
    }
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

  private _loadRegisteredIcon(): string {
    return registeredIcons.get(this.name);
  }

  private _resolveSvgUrl(): string {
    if (iconNamespaces.has(this._svgNamespace)) {
      return `${iconNamespaces.get(this._svgNamespace)}${this._svgName}.svg`;
    } else {
      throw Error(
        `Unable to find the namespace "${this._svgNamespace}". Please register your custom namespace through the icon registry API.`
      );
    }
  }

  public render(): JSX.Element {
    return (
      <Host role="img" class={`sbb-icon ${this._svgName ?? ''}`}>
        {this._svgIcon ? (
          <span class="sbb-icon-inner" innerHTML={this._svgIcon}></span>
        ) : (
          <span class="sbb-icon-inner"></span>
        )}
      </Host>
    );
  }

  /**
   * Registers a new custom namespace.
   * @param namespace The namespace to register runtime.
   * @param path The url from which to retrieve the icons.
   */
  public static registerNamespace(namespace: string, path: string): void {
    if (namespace && path) {
      iconNamespaces.set(namespace, path);
    }
  }

  /**
   * Registers a new custom icon.
   * @param namespace The namespace to register runtime.
   * @param name The custom icon name.
   * @param svg The icon svg content: "<svg>...</svg>".
   * @param options The properties for the svg icon (optional).
   * @param options.sanitize Sanitizes the svg element (optional).
   * @param options.colorImmutable Adds the class "color-immutable" to prevent changing the icon color (optional).
   */
  public static registerIcon(
    namespace: string,
    name: string,
    svg: string,
    options?: { sanitize?: boolean; colorImmutable?: boolean }
  ): void {
    if (name && namespace && svg) {
      const svgContent = validateContent(svg, options?.sanitize, options?.colorImmutable);
      registeredIcons.set(`${namespace}:${name}`, svgContent);
    }
  }
}
