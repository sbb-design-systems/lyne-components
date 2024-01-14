import { CSSResultGroup, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { toggleDatasetEntry } from '../../core/dom';

import style from './container.scss?lit&inline';

/**
 * It displays its content with the default page spacing.
 *
 * @slot - Use the unnamed slot to add anything to the container.
 * @slot sticky-bar - The slot used by the sbb-sticky-bar component.
 */
@customElement('sbb-container')
export class SbbContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the container is expanded. */
  @property({ type: Boolean, reflect: true }) public expanded = false;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public color: 'transparent' | 'white' | 'milk' | 'midnight' =
    'transparent';

  private _updateStickyBar(): void {
    const stickyBar = this.querySelector?.('sbb-sticky-bar');
    if (stickyBar) {
      toggleDatasetEntry(stickyBar, 'expanded', this.expanded);
    }
  }

  protected override willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    if (_changedProperties.has('expanded')) {
      this._updateStickyBar();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-container">
        <slot></slot>
      </div>
      <slot name="sticky-bar"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-container': SbbContainerElement;
  }
}
