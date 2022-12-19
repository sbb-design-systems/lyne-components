import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

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
  @Prop() public size?: 'l' | 's' = 'l';

  /**
   * Whether the list has an active action.
   */
  @State() private _hasActiveAction = false;

  /**
   * Navigation action elements.
   */
  @State() private _actions: HTMLSbbNavigationActionElement[];

  private _navigationMarkerResizeObserver = new ResizeObserver(() => this._setMarkerPosition());

  @Element() private _element: HTMLElement;

  @Watch('size')
  private _updateMarkerActions(): void {
    for (const action of this._navigationActions) {
      action.size = this.size;
    }

    this._hasActiveAction = !!this._activeNavigationAction;
    this._setMarkerPosition();
  }

  public connectedCallback(): void {
    this._navigationMarkerResizeObserver.observe(this._element);
    this._readActions();
  }

  public disconnectedCallback(): void {
    this._navigationMarkerResizeObserver.disconnect();
  }

  /**
   * Handles click and checks if its target is an sbb-navigation-action.
   */
  @Listen('click')
  public async onClick(event: Event): Promise<void> {
    const action = event.target as HTMLSbbNavigationActionElement | undefined;
    if (action?.tagName !== 'SBB-NAVIGATION-ACTION') {
      return;
    }

    await this.reset();
    action.active = true;
    this._hasActiveAction = true;
    this._setMarkerPosition();
  }

  @Method()
  public async reset(): Promise<void> {
    if (!this._hasActiveAction) {
      return;
    }
    this._activeNavigationAction.active = false;
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
      (e): e is HTMLSbbNavigationActionElement => e.tagName === 'SBB-NAVIGATION-ACTION'
    );
    this._updateMarkerActions();
  }

  private _setMarkerPosition(): void {
    if (this._hasActiveAction) {
      this._element?.style.setProperty(
        '--sbb-navigation-marker-position-y',
        `${this._activeNavigationAction?.offsetTop}px`
      );
    }
  }

  public render(): JSX.Element {
    this._actions.forEach((action, index) => action.setAttribute('slot', `action-${index}`));
    return (
      <Host class={{ 'sbb-navigation-marker--visible': this._hasActiveAction }}>
        <ul class="sbb-navigation-marker__content">
          {this._actions.map((_, index) => (
            <li>
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
