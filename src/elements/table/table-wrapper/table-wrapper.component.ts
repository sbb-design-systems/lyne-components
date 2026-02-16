import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.ts';
import { SbbElementInternalsMixin, SbbNegativeMixin } from '../../core/mixins.ts';

import style from './table-wrapper.scss?lit&inline';

/**
 * Wraps a table to enhance its functionality.
 *
 * @slot - Use the unnamed slot to add the table.
 */
export
@customElement('sbb-table-wrapper')
class SbbTableWrapperElement extends SbbNegativeMixin(SbbElementInternalsMixin(LitElement)) {
  public static override readonly role = 'section';
  public static override styles: CSSResultGroup = style;

  /** Whether the table wrapper is focusable. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor focusable: boolean = false;

  public constructor() {
    super();
    this.addController(
      new ResizeController(this, {
        skipInitial: true,
        callback: () => this._checkHorizontalScrollbarOffset(),
      }),
    );

    this.addEventListener?.('scroll', () => this._checkHorizontalScrollbarOffset(), {
      passive: true,
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // As we can't include the scrollbar mixin on the host and to minimize
    // payload, we decided to add the scrollbar class here.
    // This is an exception as we normally don't alter the classList of the host.
    this._updateScrollbarClass();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('focusable')) {
      if (this.focusable) {
        if (!this.hasAttribute('tabindex')) {
          this.setAttribute('tabindex', '0');
        }
      } else {
        this.removeAttribute('tabindex');
      }
    }

    if (changedProperties.has('negative')) {
      this._updateScrollbarClass();
    }
  }

  private _updateScrollbarClass(): void {
    if (isServer) {
      return;
    }
    if (this.negative) {
      this.classList.remove('sbb-scrollbar-thick-track-visible');
      this.classList.add('sbb-scrollbar-thick-negative-track-visible');
    } else {
      this.classList.remove('sbb-scrollbar-thick-negative-track-visible');
      this.classList.add('sbb-scrollbar-thick-track-visible');
    }
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
    if (this.scrollWidth === this.offsetWidth) {
      return 'none';
    }
    const isAtStart = this.scrollLeft === 0;
    // In some cases the combined value of scrollLeft and offsetWidth is off by
    // 1 pixel from the scrollWidth.
    const isAtEnd = this.scrollWidth - this.scrollLeft - this.offsetWidth <= 1;

    if (isAtStart) {
      return isAtEnd ? 'none' : 'right';
    }
    return isAtEnd ? 'left' : 'both';
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-table-wrapper': SbbTableWrapperElement;
  }
}
