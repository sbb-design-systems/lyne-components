import { Component, h, Prop, State, JSX, Element, Watch, ComponentInterface } from '@stencil/core';
import { InterfaceLinkListAttributes } from './sbb-link-list.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom.d';
import { InterfaceLinkAttributes } from '../sbb-link/sbb-link.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

@Component({
  shadow: true,
  styleUrl: 'sbb-link-list.scss',
  tag: 'sbb-link-list',
})
export class SbbLinkList implements ComponentInterface {
  /** The title text we want to show before the list. */
  @Prop() public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '2';

  /**
   * Text size of the nested sbb-link instances. This will overwrite the size attribute of
   * nested sbb-link instances.
   */
  @Prop({ reflect: true }) public size: InterfaceLinkAttributes['size'] = 's';

  /**
   * Whether to render the link list and nested sbb-link instances as negative. This will overwrite
   * the negative attribute of nested sbb-link instances.
   */
  @Prop({ reflect: true }) public negative: boolean;

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

  @Watch('size')
  @Watch('negative')
  public syncLinks(): void {
    this._element.querySelectorAll('sbb-link').forEach((link) => {
      link.negative = this.negative;
      link.size = this.size;
      link.variant = 'block';
    });
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Create an array with only the sbb-link children
   */
  private _readLinks(): void {
    const links = Array.from(this._element.children).filter(
      (e): e is HTMLSbbLinkElement => e.tagName === 'SBB-LINK',
    );
    // If the slotted sbb-link instances have not changed, we can skip syncing and updating
    // the link reference list.
    if (
      this._links &&
      links.length === this._links.length &&
      this._links.every((e, i) => links[i] === e)
    ) {
      return;
    }

    this.syncLinks();
    this._links = links;
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._readLinks();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    let ariaLabelledByAttribute: Record<string, string> = {};

    if (this._namedSlots.title || this.titleContent) {
      ariaLabelledByAttribute = {
        'aria-labelledby': 'sbb-link-list-title-id',
      };
    }
    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      <div class="sbb-link-list-wrapper">
        {(this._namedSlots.title || this.titleContent) && (
          <sbb-title
            class="sbb-link-list-title"
            level={this.titleLevel}
            visual-level="5"
            negative={this.negative}
            id="sbb-link-list-title-id"
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
