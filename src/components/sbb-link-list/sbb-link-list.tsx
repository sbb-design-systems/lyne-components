import { Component, h, Prop, State, JSX, Element, Listen, ComponentInterface } from '@stencil/core';
import { InterfaceLinkListAttributes } from './sbb-link-list.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom.d';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-link-list.scss',
  tag: 'sbb-link-list',
})
export class SbbLinkList implements ComponentInterface {
  /** This id will be forwarded to the relevant inner element. */
  @Prop() public titleId = `sbb-link-list-title-${++nextId}`;

  /** The title text we want to show before the list. */
  @Prop() public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '2';

  /** Negative coloring variant flag. */
  @Prop() public negative: boolean;

  /** Selected breakpoint from which the list is rendered horizontally. */
  @Prop({ reflect: true })
  public horizontalFrom?: InterfaceLinkListAttributes['horizontalFromBreakpoint'];

  /** The orientation in which the list will be shown vertical or horizontal. */
  @Prop({ reflect: true }) public orientation: InterfaceLinkListAttributes['orientation'] =
    'vertical';

  /** Sbb-Link elements */
  @State() private _links: HTMLSbbLinkElement[];

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('title');

  /** Host element */
  @Element() private _element!: HTMLElement;

  /**
   * Create an array with only the sbb-link children
   */
  private _readLinks(): void {
    this._links = Array.from(this._element.children).filter(
      (e): e is HTMLSbbLinkElement => e.tagName === 'SBB-LINK'
    );
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._readLinks();
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  public render(): JSX.Element {
    let ariaLabelledByAttribute = {};

    if (this._namedSlots.title || this.titleContent) {
      ariaLabelledByAttribute = {
        'aria-labelledby': this.titleId,
      };
    }

    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      <div class="sbb-link-list-wrapper">
        {(this._namedSlots.title || this.titleContent) && (
          <sbb-title
            level={this.titleLevel}
            visual-level="5"
            negative={this.negative}
            title-id={this.titleId}
            class="sbb-link-list-title"
          >
            <slot name="title">{this.titleContent}</slot>
          </sbb-title>
        )}
        <ul {...ariaLabelledByAttribute} class="sbb-link-list">
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
