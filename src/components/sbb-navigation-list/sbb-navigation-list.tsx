import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';

/**
 * @slot label - Use this to provide a label element.
 * @slot unnamed - Use this to provide content for sbb-navigation-list
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-list.scss',
  tag: 'sbb-navigation-list',
})
export class SbbNavigationList {
  @Prop()
  public label?: string;

  /** Sbb-navigation-action elements */
  @State() private _actions: HTMLSbbNavigationActionElement[];

  @Element() private _element: HTMLElement;

  /**
   * Create an array with only the sbb-navigation-action children
   */
  private _readActions(): void {
    this._actions = Array.from(this._element.children).filter(
      (e): e is HTMLSbbNavigationActionElement => e.tagName === 'SBB-NAVIGATION-ACTION'
    );
  }

  public connectedCallback(): void {
    this._readActions();
  }

  public render(): JSX.Element {
    this._actions.forEach((action, index) => action.setAttribute('slot', `action-${index}`));
    return (
      <Host class="sbb-navigation-list">
        <slot name="label"/>
        <ul class="sbb-navigation-list__content">
          {this._actions.map((_, index) => (
            <li class="sbb-navigation-list__action">
              <slot name={`action-${index}`} onSlotchange={(): void => this._readActions()} />
            </li>
          ))}
        </ul>
        <span hidden>
          <slot onSlotchange={(): void => this._readActions()} />
        </span>
      </Host>
    );
  }
}
