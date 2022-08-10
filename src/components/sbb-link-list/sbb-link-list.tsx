import { Component, h, Prop, Element } from '@stencil/core';
import { InterfaceLinkListAttributes } from './sbb-link-list.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom.d';

/**
 * @slot link-list__item - Use this to render the
 * list items with the links inside
 */

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-link-list.scss',
  tag: 'sbb-link-list',
})
export class SbbLinkList {
  private _hideTitleAndButton = false;

  /** Sbb-Link elements */
  private _links: HTMLSbbLinkElement[];

  /** Host element */
  @Element() private _element!: HTMLElement;

  /** This id will be forwarded to the relevant inner element. */
  @Prop() public titleId = `sbb-link-list-heading-${++nextId}`;

  /**
   * Negative coloring variant flag
   */
  @Prop() public negative: boolean;

  /**
   * Selected breakpoint from that the list will be appears horizontal.
   */
  @Prop() public horizontalFrom?: InterfaceLinkListAttributes['horizontalFromBreakpoint'];

  /**
   * The direction in which the list will be shown vertical or horizontal.
   */
  @Prop() public orientation: InterfaceLinkListAttributes['direction'] = 'vertical';

  /**
   * The title text we want to show
   * before the list
   */
  @Prop() public titleText?: string;

  /**
   * The semantic level of the title,
   * e.g. 3 = h3
   */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '2';

  private _getClassString(): string {
    let horizontalClass = this.horizontalFrom
      ? ` link-list--horizontal-from-${this.horizontalFrom}`
      : '';

    if (!horizontalClass) {
      horizontalClass = this.orientation === 'horizontal' ? ' link-list--horizontal' : '';
    }

    return `link-list${horizontalClass}`;
  }

  /**
   * Create an array with only the sbb-link-children
   * @private
   */
  private _readLinks(): void {
    this._links = Array.from(this._element.children).filter(
      (e): e is HTMLSbbLinkElement => e.tagName === 'SBB-LINK'
    );
  }

  public componentWillLoad(): void {
    this._readLinks();
  }

  public render(): JSX.Element {
    let additionalAttributes = {};

    if (this.titleText) {
      additionalAttributes = {
        'aria-labelledby': this.titleId,
      };
    }

    if (this.horizontalFrom || this.orientation === 'horizontal') {
      this._hideTitleAndButton = true;
    }

    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      // the role="list" is needed for voice over: https://bit.ly/3CDiZaG
      <div>
        {!this._hideTitleAndButton && (
          <sbb-title
            id={this.titleId}
            level={this.titleLevel}
            visual-level="5"
            negative={this.negative}
          >
            <span slot="title">{this.titleText}</span>
          </sbb-title>
        )}
        <ul
          {...additionalAttributes}
          class={this._getClassString()}
          role="list"
          aria-labelledby={this.titleText ? this.titleId : undefined}
        >
          {this._links.map((_, index) => (
            <li>
              <slot name={`link-${index}`} onSlotchange={(): void => this._readLinks()} />
            </li>
          ))}
        </ul>
        <span>
          <slot onSlotchange={(): void => this._readLinks()} />
        </span>
        {!this._hideTitleAndButton && (
          <slot name="button"></slot>
        )}
      </div>
    );
  }
}
