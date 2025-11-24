import { html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { forceType, omitEmptyConverter } from '../core/decorators.ts';

import { SbbIconBase } from './icon-base.ts';

/**
 * Displays an icon loaded from a registered namespace.
 */
export
@customElement('sbb-icon')
class SbbIconElement extends SbbIconBase {
  /**
   * We need to additionally observe the svgicon attribute
   * for sbb-angular compatibility.
   * @internal
   */
  public static override get observedAttributes(): string[] {
    return super.observedAttributes.concat('svgicon');
  }

  /**
   * The provided name consisting of the namespace and the name of the icon.
   * If the namespace is missing, the default namespace "sbb" will be used.
   * E.g. `name` (will use "sbb" as namespace) or `namespace:name`.
   */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor name: string = '';

  /**
   * The sbb-angular library has a sbb-icon component as well. In order to provide
   * compatibility with it (as some icons are used internally inside the other sbb-angular
   * components) we need to check whether the attribute svgicon is used.
   */
  @state() private accessor _sbbAngularCompatibility = false;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.internals.ariaHidden = 'true';
  }

  protected override async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    this.internals.ariaLabel = `Icon ${name.replace(/-/g, ' ')}`;
    return super.fetchSvgIcon(namespace, name);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('name') && this.name) {
      this.loadSvgIcon(this.name);
    }
  }

  public override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ): void {
    if (name === 'svgicon') {
      this._sbbAngularCompatibility = !!value;
    } else {
      super.attributeChangedCallback(name, _old, value);
    }
  }

  protected override render(): TemplateResult {
    return this._sbbAngularCompatibility ? html`<slot></slot>` : super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon': SbbIconElement;
  }
}
