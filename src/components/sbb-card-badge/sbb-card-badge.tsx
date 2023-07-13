import { Component, ComponentInterface, Element, h, Host, JSX, Prop } from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceSbbCardBadgeAttributes } from './sbb-card-badge.custom';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/**
 * @slot unnamed - Content of the badge.
 * Content parts should be wrapped in `<span>` tags to achieve correct spacings.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-card-badge.scss',
  tag: 'sbb-card-badge',
})
export class SbbCardBadge implements ComponentInterface {
  /** Color of the card badge. */
  @Prop({ reflect: true }) public color: InterfaceSbbCardBadgeAttributes['color'] = 'charcoal';

  @Element() private _element!: HTMLElement;

  public constructor() {
    // Set slot name as early as possible
    this._element.setAttribute('slot', 'badge');
  }

  private _parentElement?: HTMLElement;

  public connectedCallback(): void {
    this._parentElement = this._element.parentElement;
    toggleDatasetEntry(this._parentElement, 'hasCardBadge', true);
  }

  public disconnectedCallback(): void {
    toggleDatasetEntry(this._parentElement, 'hasCardBadge', false);
    this._parentElement = undefined;
  }

  public render(): JSX.Element {
    return (
      <Host dir={getDocumentWritingMode()} role="text">
        <span class="sbb-card-badge-wrapper">
          <span class="sbb-card-badge">
            <span class="sbb-card-badge-background" aria-hidden="true"></span>
            <span class="sbb-card-badge-content">
              <slot />
            </span>
          </span>
        </span>
      </Host>
    );
  }
}
