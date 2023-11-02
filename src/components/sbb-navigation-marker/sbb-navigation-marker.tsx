import { AgnosticResizeObserver } from '../core/observers';
import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbNavigationAction } from '../sbb-navigation-action';
import { setAttribute } from '../core/dom';
import style from './sbb-navigation-marker.scss?lit&inline';

/**
 * @slot - Use the unnamed slot to add `sbb-navigation-action` elements into the sbb-navigation-marker.
 */
@customElement('sbb-navigation-marker')
export class SbbNavigationMarker extends LitElement {
  public static override styles: CSSResult = style;

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
  @state() private _actions: SbbNavigationAction[];

  private _currentActiveAction: SbbNavigationAction;
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
    this._readActions();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._navigationMarkerResizeObserver.disconnect();
  }

  public select(action: SbbNavigationAction): void {
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

  private get _navigationActions(): SbbNavigationAction[] {
    return Array.from(this.querySelectorAll('sbb-navigation-action'));
  }

  private get _activeNavigationAction(): SbbNavigationAction {
    return this._navigationActions.find((action) => action.active);
  }

  // Create an array with only the sbb-navigation-action children.
  private _readActions(): void {
    this._actions = Array.from(this.children).filter(
      (e): e is SbbNavigationAction => e.tagName === 'SBB-NAVIGATION-ACTION',
    );
  }

  private _setMarkerPosition(): void {
    if (this._hasActiveAction) {
      this?.style.setProperty(
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
    'sbb-navigation-marker': SbbNavigationMarker;
  }
}
