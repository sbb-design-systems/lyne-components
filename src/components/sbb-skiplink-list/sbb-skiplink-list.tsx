import { Component, ComponentInterface, Element, Host, h, JSX, State } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-skiplink-list.scss',
  tag: 'sbb-skiplink-list',
})
export class SbbSkiplinkList implements ComponentInterface {
  /** Sbb-Link elements */
  @State() private _links: HTMLSbbLinkElement[];

  @Element() private _element: HTMLElement;

  /** Create an array with only the sbb-link children */
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

    this._links = links;
    //console.log(links);
  }

  public connectedCallback(): void {
    this._readLinks();
  }

  private _focusedLink = true;

  public render(): JSX.Element {
    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return (
      <Host data-focus-visible={this._focusedLink}>
        <span class="sbb-skiplink-list">
          {this._links.map((_, index) => (
            <li>
              <slot name={`link-${index}`} onSlotchange={(): void => this._readLinks()} />
            </li>
          ))}
        </span>
      </Host>
    );
  }
}
