import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';

/**
 * @slot label - Use this to provide a label element.
 * @slot unnamed - Use this to provide content for sbb-navigation-list
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-list.scss',
  tag: 'sbb-navigation-list',
})
export class SbbNavigationList implements ComponentInterface {
  /*
   * The label to be shown before the action list.
   */
  @Prop() public label?: string;

  /*
   * Navigation action elements.
   */
  @State() private _actions: HTMLSbbNavigationActionElement[];

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('label');

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Create an array with only the sbb-navigation-action children.
   */
  private _readActions(): void {
    this._actions = Array.from(this._element.children).filter(
      (e): e is HTMLSbbNavigationActionElement => e.tagName === 'SBB-NAVIGATION-ACTION',
    );
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._readActions();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const hasLabel = !!this.label || this._namedSlots['label'];
    this._actions.forEach((action, index) => {
      action.setAttribute('slot', `action-${index}`);
      action.size = 'm';
    });
    const ariaLabelledByAttribute = hasLabel
      ? { 'aria-labelledby': 'sbb-navigation-link-label-id' }
      : {};
    return (
      <Host class="sbb-navigation-list">
        {hasLabel && (
          <span class="sbb-navigation-list__label" id="sbb-navigation-link-label-id">
            <slot name="label">{this.label}</slot>
          </span>
        )}
        <ul class="sbb-navigation-list__content" {...ariaLabelledByAttribute}>
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
