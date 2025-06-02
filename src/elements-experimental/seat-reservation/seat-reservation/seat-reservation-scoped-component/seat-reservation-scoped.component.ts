import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './seat-reservation-scoped.scss?lit&inline';

/**
 * Wrapper class for scoped elements with similar properties to set.
 */
export
@customElement('sbb-seat-reservation-scoped')
class SbbSeatReservationScopedElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @forceType()
  @property({ attribute: 'inset-block-start' })
  public accessor insetBlockStart: string = '';

  @forceType()
  @property({ attribute: 'inset-inline-start' })
  public accessor insetInlineStart: string = '';

  @forceType()
  @property({ attribute: 'width' })
  public accessor width: string = '';

  @forceType()
  @property({ attribute: 'height' })
  public accessor height: string = '';

  @forceType()
  @property({ attribute: 'z-index' })
  public accessor zIndex: string = '';

  @forceType()
  @property({ attribute: 'cell-id' })
  public accessor cellId: string = '';

  @forceType()
  @property({ attribute: 'scoped-classes' })
  public accessor scopedClasses: string = '';

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    if (_changedProperties.has('width')) {
      this.style?.setProperty('--sbb-seat-reservation-scoped-width', `${this.width}`);
    }

    if (_changedProperties.has('height')) {
      this.style?.setProperty('--sbb-seat-reservation-scoped-height', `${this.height}`);
    }

    if (_changedProperties.has('insetBlockStart')) {
      this.style?.setProperty(
        '--sbb-seat-reservation-scoped-inset-block-start',
        `${this.insetBlockStart}`,
      );
    }

    if (_changedProperties.has('insetInlineStart')) {
      this.style?.setProperty(
        '--sbb-seat-reservation-scoped-inset-inline-start',
        `${this.insetInlineStart}`,
      );
    }

    if (_changedProperties.has('zIndex')) {
      this.style?.setProperty('--sbb-seat-reservation-scoped-z-index', `${this.zIndex}`);
    }
  }

  protected override render(): TemplateResult {
    if (!this.cellId) {
      return html`<div class="${this.scopedClasses}">
        <slot></slot>
      </div>`;
    } else {
      return html`<td id="${this.cellId}" class="${this.scopedClasses}">
        <slot></slot>
      </td>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-scoped': SbbSeatReservationScopedElement;
  }
}
