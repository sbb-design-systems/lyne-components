import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './scoped-element.scss?lit&inline';

/**
 * Wrapper class for scoped elements with similar properties to set.
 */
export
@customElement('sbb-scoped-element')
class SbbScopedElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @forceType()
  @property({ attribute: 'graph-elem-aria-label', type: String })
  public accessor graphElemAriaLabel: string = '';

  @forceType()
  @property({ attribute: 'inset-block-start', type: String })
  public accessor insetBlockStart: string = '';

  @forceType()
  @property({ attribute: 'inset-inline-start', type: String })
  public accessor insetInlineStart: string = '';

  @forceType()
  @property({ attribute: 'width', type: String })
  public accessor width: string = '';

  @forceType()
  @property({ attribute: 'height', type: String })
  public accessor height: string = '';

  @forceType()
  @property({ attribute: 'z-index', type: String })
  public accessor zIndex: string = '';

  @forceType()
  @property({ attribute: 'cell-id', type: String })
  public accessor cellId: string = '';

  @forceType()
  @property({ attribute: 'scoped-classes', type: String })
  public accessor scopedClasses: string = '';

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    if (_changedProperties.has('width')) {
      this.style?.setProperty('--sbb-scoped-width', `${this.width}`);
    }

    if (_changedProperties.has('height')) {
      this.style?.setProperty('--sbb-scoped-height', `${this.height}`);
    }

    if (_changedProperties.has('insetBlockStart')) {
      this.style?.setProperty('--sbb-scoped-inset-block-start', `${this.insetBlockStart}`);
    }

    if (_changedProperties.has('insetInlineStart')) {
      this.style?.setProperty('--sbb-scoped-inset-inline-start', `${this.insetInlineStart}`);
    }

    if (_changedProperties.has('zIndex')) {
      this.style?.setProperty('--sbb-scoped-z-index', `${this.zIndex}`);
    }
  }

  protected override render(): TemplateResult {
    if (!this.cellId) {
      return html`<div class="${this.scopedClasses}" title="${this.graphElemAriaLabel || nothing}">
        <slot></slot>
      </div>`;
    } else {
      return html`<td id="${this.cellId}" class="${this.scopedClasses}" role="gridcell">
        <slot></slot>
      </td>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-scoped-element': SbbScopedElement;
  }
}
