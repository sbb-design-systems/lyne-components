import { Component, h, Prop, State, JSX, Element } from '@stencil/core';
import { InterfaceLinkListAttributes } from './sbb-link-list.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom.d';

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-link-list.scss',
  tag: 'sbb-link-list',
})
export class SbbLinkList {
  /** This id will be forwarded to the relevant inner element. */
  @Prop() public titleId = `sbb-link-list-title-${++nextId}`;

  /**
   * The title text we want to show
   * before the list
   */
  @Prop() public titleContent?: string;

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
   * The orientation in which the list will be shown vertical or horizontal.
   */
  @Prop() public orientation: InterfaceLinkListAttributes['orientation'] = 'vertical';

  /** Sbb-Link elements */
  @State() private _links: HTMLSbbLinkElement[];

  /** Host element */
  @Element() private _element!: HTMLElement;

  private _hasSlottedTitle: boolean;

  private _getClassString(): string {
    let horizontalClass = this.horizontalFrom
      ? ` sbb-link-list--horizontal-from-${this.horizontalFrom}`
      : '';

    if (!horizontalClass) {
      horizontalClass = this.orientation === 'horizontal' ? ' sbb-link-list--horizontal' : '';
    }

    return `sbb-link-list${horizontalClass}`;
  }

  /**
   * Create an array with only the sbb-link children
   */
  private _readLinks(): void {
    this._links = Array.from(this._element.children).filter(
      (e): e is HTMLSbbLinkElement => e.tagName === 'SBB-LINK'
    );
  }

  private _onSlotTitleChange(event): void {
    this._hasSlottedTitle = (event.target as HTMLSlotElement).assignedElements().length > 0;
  }

  public connectedCallback(): void {
    this._readLinks();
  }

  public render(): JSX.Element {
    let additionalAttributes = {};

    if (this._hasSlottedTitle || this.titleContent) {
      additionalAttributes = {
        'aria-labelledby': this.titleId,
      };
    }

    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      <div class={this._getClassString()}>
        {this._hasSlottedTitle || this.titleContent ? (
          <sbb-title
            level={this.titleLevel}
            visual-level="5"
            negative={this.negative}
            titleId={this.titleId}
          >
            <slot onSlotchange={(event): void => this._onSlotTitleChange(event)} name="title">
              {this.titleContent}
            </slot>
          </sbb-title>
        ) : (
          ''
        )}
        <ul {...additionalAttributes} role="list">
          {this._links.map((_, index) => (
            <li>
              <slot name={`link-${index}`} onSlotchange={(): void => this._readLinks()} />
            </li>
          ))}
        </ul>
        <span hidden>
          <slot onSlotchange={(): void => this._readLinks()} />
        </span>
      </div>
    );
  }
}
