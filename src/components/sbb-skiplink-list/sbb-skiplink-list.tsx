import { Component, ComponentInterface, Element, Host, h, JSX, State, Prop } from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot unnamed - Use this to provide links for the list.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-skiplink-list.scss',
  tag: 'sbb-skiplink-list',
})
export class SbbSkiplinkList implements ComponentInterface {
  /** The title text we want to show before the list. */
  @Prop() public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '2';

  /** sbb-link elements */
  @State() private _links: HTMLSbbLinkElement[];

  @State() private _focusedLink;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('title');

  @Element() private _element!: HTMLElement;

  public syncLinks(): void {
    this._element.querySelectorAll('sbb-link').forEach((link: HTMLSbbLinkElement) => {
      link.size = 'm';
      link.negative = true;
    });
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  /** Create an array with only the sbb-link children. */
  private _readLinks(): void {
    const links = Array.from(this._element.children).filter(
      (e): e is HTMLSbbLinkElement => e.tagName === 'SBB-LINK'
    );
    // Update links list
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
        'aria-labelledby': 'sbb-skiplink-list-title-id',
      };
    }
    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      <Host
        data-focus-visible={this._focusedLink}
        onFocusin={() => (this._focusedLink = true)}
        onFocusout={() => (this._focusedLink = false)}
      >
        <div class="sbb-skiplink-list__wrapper">
          {(this._namedSlots.title || this.titleContent) && (
            <sbb-title
              class="sbb-link-list-title"
              level={this.titleLevel}
              visual-level="5"
              negative
              id="sbb-skiplink-list-title-id"
            >
              <slot name="title">{this.titleContent}</slot>
            </sbb-title>
          )}
          <ul {...ariaLabelledByAttribute} class="sbb-skiplink-list">
            {this._links.map((_, index) => (
              <li>
                <slot name={`link-${index}`} onSlotchange={(): void => this._readLinks()} />
              </li>
            ))}
          </ul>
        </div>
      </Host>
    );
  }
}
