import { Component, h, Prop, State, JSX, Element } from '@stencil/core';
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
  /** This id will be forwarded to the relevant inner element. */
  @Prop() public titleId = `sbb-link-list-heading-${++nextId}`;

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

  /**
   * Negative coloring variant flag
   */
  @Prop() public negative: boolean;

  /**
   * Selected breakpoint from which the list is rendered horizontally.
   */
  @Prop() public horizontalFrom?: InterfaceLinkListAttributes['horizontalFromBreakpoint'];

  /**
   * The direction in which the list will be shown vertical or horizontal.
   */
  @Prop() public orientation: InterfaceLinkListAttributes['direction'] = 'vertical';

  private _hideTitle = false;
  private _titleIsSlotted: boolean;

  /** Sbb-Link elements */
  @State() private _links: HTMLSbbLinkElement[];

  /** Host element */
  @Element() private _element!: HTMLElement;

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
   */
  private _readLinks(): void {
    this._links = Array.from(this._element.children).filter(
      (e): e is HTMLSbbLinkElement => e.tagName === 'SBB-LINK'
    );
  }

  public connectedCallback(): void {
    this._titleIsSlotted = Boolean(this._element.querySelector('[slot="title"]'));
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
      this._hideTitle = true;
    }

    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      // the role="list" is needed for voice over: https://bit.ly/3CDiZaG
      <div>
        {(!this._hideTitle && this._titleIsSlotted) || this.titleText ? (
          <sbb-title level={this.titleLevel} visual-level="5" negative={this.negative}>
            <slot name="title">{this.titleText}</slot>
          </sbb-title>
        ) : (
          ''
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
      </div>
    );
  }
}
