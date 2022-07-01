import { Component, Element, h, Prop } from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceCardBadgeAttributes } from './sbb-card-badge.custom';

/**
 * @slot generic - Slot used to render generic content. Since this slot is
 * wrapped within a `span` only inline elements are allowed to be passed within
 * this slot. Check
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-card-badge.scss',
  tag: 'sbb-card-badge',
})
export class SbbCardBadge {
  /**
   * Accessibility label text. This text gets exposed to screen reader users.
   * The text should reflect all the information which gets passed into the
   * component (as text or within the slot) so which is visible in the
   * card badge, either through text or iconography.
   *
   * Example text: Sales ticket price starts at CHF 37.50
   */
  @Prop() public accessibilityLabel!: string;

  /** Badge appearance */
  @Prop() public appearance: InterfaceCardBadgeAttributes['appearance'] = 'primary';

  /** Badge size */
  @Prop() public size: InterfaceCardBadgeAttributes['size'] = 'regular';

  /** Mark as discount */
  @Prop() public isDiscount?: boolean;

  /** From/above price text */
  @Prop() public text?: string;

  /** Price text */
  @Prop() public price?: string;

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasGenericSlot: boolean;

  public componentWillLoad(): void {
    this._hasGenericSlot = Boolean(this._hostElement.querySelector('[slot="generic"]'));
  }

  public render(): JSX.Element {
    const currentWritingMode = getDocumentWritingMode();

    /**
     * Add additional CSS classes
     * ----------------------------------------------------------------
     */

    const appearanceClass = ` card-badge--${this.appearance}`;
    const sizeClass = ` card-badge--${this.size}`;

    return (
      <span
        aria-label={this.accessibilityLabel}
        class={`card-badge
          ${appearanceClass}
          ${sizeClass}`}
        dir={currentWritingMode}
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
        title={this.accessibilityLabel}
      >
        {this.isDiscount ? <span class="discount">%</span> : ''}
        {this.text ? <span class="text">{this.text}</span> : ''}
        {this.price ? <span class="price">{this.price}</span> : ''}
        {this._hasGenericSlot ? (
          <span class="generic">
            <slot name="generic" />
          </span>
        ) : (
          ''
        )}
      </span>
    );
  }
}
