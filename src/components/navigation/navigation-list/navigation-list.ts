import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { setAttribute } from '../../core/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../core/eventing';
import type { SbbNavigationAction } from '../navigation-action';

import style from './navigation-list.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-action` within a `sbb-navigation-section`.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-list`.
 * @slot label - Use this to provide a label element.
 */
@customElement('sbb-navigation-list')
export class SbbNavigationList extends LitElement {
  public static override styles: CSSResultGroup = style;

  /*
   * The label to be shown before the action list.
   */
  @property() public label?: string;

  /*
   * Navigation action elements.
   */
  @state() private _actions: SbbNavigationAction[] = [];

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @state() private _namedSlots = createNamedSlotState('label');

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Create an array with only the sbb-navigation-action children.
   */
  private _readActions(): void {
    this._actions = Array.from(this.children ?? []).filter(
      (e): e is SbbNavigationAction => e.tagName === 'SBB-NAVIGATION-ACTION',
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
    this._readActions();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const hasLabel = !!this.label || this._namedSlots['label'];
    this._actions.forEach((action, index) => {
      action.setAttribute('slot', `action-${index}`);
      action.size = 'm';
    });
    const ariaLabelledByAttribute = hasLabel
      ? { 'aria-labelledby': 'sbb-navigation-link-label-id' }
      : {};

    setAttribute(this, 'class', 'sbb-navigation-list');

    return html`
      ${hasLabel
        ? html`<span class="sbb-navigation-list__label" id="sbb-navigation-link-label-id">
            <slot name="label">${this.label}</slot>
          </span>`
        : nothing}
      <ul class="sbb-navigation-list__content" ${spread(ariaLabelledByAttribute)}>
        ${this._actions.map(
          (_, index) => html`
            <li class="sbb-navigation-list__action">
              <slot name=${`action-${index}`} @slotchange=${(): void => this._readActions()}></slot>
            </li>
          `,
        )}
      </ul>
      <span hidden>
        <slot @slotchange=${(): void => this._readActions()}></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-list': SbbNavigationList;
  }
}
