import { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbIconBase } from './icon-base';

/**
 * It displays an icon loaded from a registered namespace.
 */
@customElement('sbb-icon')
export class SbbIcon extends SbbIconBase {
  /**
   * The provided name consisting of the namespace and the name of the icon.
   * If the namespace is missing, the default namespace "sbb" will be used.
   * E.g. `name` (will use "sbb" as namespace) or `namespace:name`.
   */
  @property({ reflect: true }) public name: string;

  private _defaultAriaLabel = '';

  protected override async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    // If the icon is changing, and we were using the defaultAriaLabel, reset it
    if (this.ariaLabel === this._defaultAriaLabel) {
      this.ariaLabel = null;
    }

    this._defaultAriaLabel = `Icon ${name.replace(/-/g, ' ')}`;

    // generate a default label in case user does not provide their own
    // and aria-hidden is set to "false"
    if (this.ariaHidden === 'false' && !this.ariaLabel && name) {
      this.ariaLabel = this._defaultAriaLabel;
    }

    return super.fetchSvgIcon(namespace, name);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('name')) {
      this.loadSvgIcon(this.name);
    }
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    if (!this.hasAttribute('aria-hidden')) {
      this.ariaHidden = 'true';
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon': SbbIcon;
  }
}
