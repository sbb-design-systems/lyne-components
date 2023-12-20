import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { NamedSlotStateController, SlotChildObserver } from '../../core/common-behaviors';
import type { SbbNavigationActionElement } from '../navigation-action';

import style from './navigation-list.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-action` within a `sbb-navigation-section`.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-list`.
 * @slot label - Use this to provide a label element.
 */
@customElement('sbb-navigation-list')
export class SbbNavigationListElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * The label to be shown before the action list.
   */
  @property({ reflect: true }) public label?: string;

  /**
   * Navigation action elements.
   * @ssrchildcounter
   */
  @state() private _actions: SbbNavigationActionElement[] = [];

  private _namedSlots = new NamedSlotStateController(this);

  /**
   * Create an array with only the sbb-navigation-action children.
   */
  protected override checkChildren(): void {
    this._actions = Array.from(this.children ?? []).filter(
      (e): e is SbbNavigationActionElement => e.tagName === 'SBB-NAVIGATION-ACTION',
    );
  }

  protected override render(): TemplateResult {
    const hasLabel = !!this.label || this._namedSlots.slots.has('label');
    this._actions.forEach((action, index) => {
      action.setAttribute('slot', `action-${index}`);
      action.size = 'm';
    });
    const actions = this._actions.length
      ? this._actions
      : Array.from({ length: +this.getAttribute('data-ssr-child-count') });
    const ariaLabelledByAttribute = hasLabel
      ? { 'aria-labelledby': 'sbb-navigation-link-label-id' }
      : {};

    return html`
      <span class="sbb-navigation-list__label" id="sbb-navigation-link-label-id">
        <slot name="label" @slotchange=${() => this.requestUpdate()}>${this.label}</slot>
      </span>
      <ul class="sbb-navigation-list__content" ${spread(ariaLabelledByAttribute)}>
        ${actions.map(
          (_, index) => html`
            <li class="sbb-navigation-list__action">
              <slot name=${`action-${index}`}></slot>
            </li>
          `,
        )}
      </ul>
      <span hidden>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-list': SbbNavigationListElement;
  }
}
