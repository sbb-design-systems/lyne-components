import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SlotChildObserver } from '../../core/common-behaviors';
import { setAttribute } from '../../core/dom';
import { AgnosticResizeObserver } from '../../core/observers';
import type { SbbNavigationActionElement } from '../navigation-action';

import style from './navigation-marker.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-action` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-action` elements into the `sbb-navigation-marker`.
 */
@customElement('sbb-navigation-marker')
export class SbbNavigationMarkerElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * Marker size variant.
   */
  @property({ reflect: true }) public size?: 'l' | 's' = 'l';

  /**
   * Whether the list has an active action.
   */
  @state() private _hasActiveAction = false;

  /**
   * Navigation action elements.
   */
  @state() private _actions: SbbNavigationActionElement[] = [];

  private _currentActiveAction: SbbNavigationActionElement;
  private _navigationMarkerResizeObserver = new AgnosticResizeObserver(() =>
    this._setMarkerPosition(),
  );

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('size')) {
      this._updateMarkerActions();
    }
  }

  private _updateMarkerActions(): void {
    for (const action of this._navigationActions) {
      action.size = this.size;
    }

    this._hasActiveAction = !!this._activeNavigationAction;
    this._currentActiveAction = this._activeNavigationAction;
    this._setMarkerPosition();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._navigationMarkerResizeObserver.observe(this);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._navigationMarkerResizeObserver.disconnect();
  }

  public select(action: SbbNavigationActionElement): void {
    this.reset();
    action.active = true;
    this._currentActiveAction = action;
    this._hasActiveAction = true;
    setTimeout(() => this._setMarkerPosition());
  }

  public reset(): void {
    if (!this._hasActiveAction) {
      return;
    }
    this._currentActiveAction.active = false;
    this._hasActiveAction = false;
  }

  private get _navigationActions(): SbbNavigationActionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-navigation-action') ?? []);
  }

  private get _activeNavigationAction(): SbbNavigationActionElement {
    return this._navigationActions.find((action) => action.active);
  }

  // Create an array with only the sbb-navigation-action children.
  protected override checkChildren(): void {
    this._actions = Array.from(this.children).filter(
      (e): e is SbbNavigationActionElement => e.tagName === 'SBB-NAVIGATION-ACTION',
    );
  }

  private _setMarkerPosition(): void {
    if (this._hasActiveAction) {
      this.style?.setProperty(
        '--sbb-navigation-marker-position-y',
        `${(this.shadowRoot.querySelector('[data-active]') as HTMLElement)?.offsetTop}px`,
      );
    }
  }

  protected override render(): TemplateResult {
    this._actions.forEach((action, index) => action.setAttribute('slot', `action-${index}`));
    setAttribute(this, 'data-has-active-action', this._hasActiveAction);

    return html`
      <ul class="sbb-navigation-marker">
        ${this._actions.map(
          (action, index) => html`
            <li class="sbb-navigation-marker__action" ?data-active=${action.active}>
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
    'sbb-navigation-marker': SbbNavigationMarkerElement;
  }
}
