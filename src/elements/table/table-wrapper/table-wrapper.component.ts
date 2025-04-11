import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../../core/mixins.js';

import style from './table-wrapper.scss?lit&inline';

/**
 * Wraps a table to enhance its functionality
 *
 * @slot - Use the unnamed slot to add the table.
 */
export
@customElement('sbb-table-wrapper')
class SbbTableWrapperElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private _resizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._checkHorizontalScrollbarOffset(),
  });
  private _tableWrapper!: HTMLElement;

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._tableWrapper = this.shadowRoot!.querySelector<HTMLElement>('.sbb-table-wrapper')!;

    this._tableWrapper.addEventListener('scroll', () => this._checkHorizontalScrollbarOffset(), {
      passive: true,
    });
    this._resizeObserver.observe(this._tableWrapper);
  }

  /**
   *  Calculates whether the table is horizontally scrolled and adds the
   *  corresponding class `sbb-table-wrapper-offset-${none | left | right | both}`
   */
  private _checkHorizontalScrollbarOffset(): void {
    const state = this._calculateScrollOffset();
    this.classList.remove(
      `sbb-table-wrapper-offset-none`,
      `sbb-table-wrapper-offset-left`,
      `sbb-table-wrapper-offset-right`,
      `sbb-table-wrapper-offset-both`,
    );
    this.classList.add(`sbb-table-wrapper-offset-${state}`);
  }

  private _calculateScrollOffset(): 'none' | 'left' | 'right' | 'both' {
    const wrapper = this._tableWrapper;

    if (wrapper.scrollWidth === wrapper.offsetWidth) {
      return 'none';
    }
    const isAtStart = wrapper.scrollLeft === 0;
    // In some cases the combined value of scrollLeft and offsetWidth is off by
    // 1 pixel from the scrollWidth.
    const isAtEnd = wrapper.scrollWidth - wrapper.scrollLeft - wrapper.offsetWidth <= 1;

    if (isAtStart) {
      return isAtEnd ? 'none' : 'right';
    }
    return isAtEnd ? 'left' : 'both';
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-table-wrapper">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-table-wrapper': SbbTableWrapperElement;
  }
}
