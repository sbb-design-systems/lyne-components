import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { AgnosticResizeObserver } from '../../global/observers';

/**
 * @slot unnamed - Use this slot to provide navigation actions into the sbb-navigation-marker.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-marker.scss',
  tag: 'sbb-navigation-marker',
})
export class SbbNavigationMarker implements ComponentInterface {
  /**
   * Marker size variant.
   */
  @Prop({ reflect: true }) public size?: 'l' | 's' = 'l';

  /**
   * Whether the list has an active action.
   */
  @State() private _hasActiveAction = false;

  /**
   * Navigation action elements.
   */
  @State() private _actions: HTMLSbbNavigationActionElement[];

  private _currentActiveAction: HTMLSbbNavigationActionElement;
  private _navigationMarkerResizeObserver = new AgnosticResizeObserver(() =>
    this._setMarkerPosition(),
  );

  @Element() private _element: HTMLElement;

  @Watch('size')
  private _updateMarkerActions(): void {
    for (const action of this._navigationActions) {
      action.size = this.size;
    }

    this._hasActiveAction = !!this._activeNavigationAction;
    this._currentActiveAction = this._activeNavigationAction;
    this._setMarkerPosition();
  }

  public connectedCallback(): void {
    this._navigationMarkerResizeObserver.observe(this._element);
    this._readActions();
  }

  public disconnectedCallback(): void {
    this._navigationMarkerResizeObserver.disconnect();
  }

  @Method()
  public async select(action: HTMLSbbNavigationActionElement): Promise<void> {
    await this.reset();
    action.active = true;
    this._currentActiveAction = action;
    this._hasActiveAction = true;
    this._setMarkerPosition();
  }

  @Method()
  public async reset(): Promise<void> {
    if (!this._hasActiveAction) {
      return;
    }
    this._currentActiveAction.active = false;
    this._hasActiveAction = false;
  }

  private get _navigationActions(): HTMLSbbNavigationActionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-navigation-action'));
  }

  private get _activeNavigationAction(): HTMLSbbNavigationActionElement {
    return this._navigationActions.find((action) => action.active);
  }

  // Create an array with only the sbb-navigation-action children.
  private _readActions(): void {
    this._actions = Array.from(this._element.children).filter(
      (e): e is HTMLSbbNavigationActionElement => e.tagName === 'SBB-NAVIGATION-ACTION',
    );
    this._updateMarkerActions();
  }

  private _setMarkerPosition(): void {
    if (this._hasActiveAction) {
      this._element?.style.setProperty(
        '--sbb-navigation-marker-position-y',
        `${(this._element.shadowRoot.querySelector('[data-active]') as HTMLElement)?.offsetTop}px`,
      );
    }
  }

  public render(): JSX.Element {
    this._actions.forEach((action, index) => action.setAttribute('slot', `action-${index}`));
    return (
      <Host data-has-active-action={this._hasActiveAction}>
        <ul class="sbb-navigation-marker">
          {this._actions.map((action, index) => (
            <li class="sbb-navigation-marker__action" data-active={action.active}>
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
