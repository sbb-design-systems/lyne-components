import { Component, Element, h, Host, JSX, Listen, Prop, State, Watch } from '@stencil/core';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

/**
 * @slot unnamed - Use this slot to project anything into the sbb-navigation-marker.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-marker.scss',
  tag: 'sbb-navigation-marker',
})
export class SbbNavigationMarker {
  /**
   * Marker size variant.
   */
  @Prop() public size?: 'l' | 's' = 'l';

  /**
   * Whether the list has an active action.
   */
  @State() private _hasActiveAction = false;

  private _navigationMarkerResizeObserver = new ResizeObserver(() => this._setMarkerPosition());

  @Element() private _element: HTMLElement;

  @Watch('size')
  private _updateMarkerActions(): void {
    for (const action of this._navigationActions) {
      action.size = this.size;
    }

    this._setMarkerPosition();
    this._hasActiveAction = !!this._activeNavigationAction;
  }

  public connectedCallback(): void {
    this._navigationMarkerResizeObserver.observe(this._element);
  }

  public disconnectedCallback(): void {
    this._navigationMarkerResizeObserver.disconnect();
  }

  /**
   * Handles click and checks if its target is an sbb-navigation-action.
   */
  @Listen('click')
  public onClick(event: Event): void {
    const action = event.target as HTMLSbbNavigationActionElement | undefined;
    if (action?.tagName !== 'SBB-NAVIGATION-ACTION' || action.hasAttribute('disabled')) {
      return;
    }

    this._navigationActions.forEach(
      (action) => ((action as HTMLSbbNavigationActionElement).active = false)
    );
    action.active = true;
    this._setMarkerPosition();
    this._hasActiveAction = true;
  }

  private get _navigationActions(): HTMLSbbNavigationActionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-navigation-action'));
  }

  private get _activeNavigationAction(): HTMLSbbNavigationActionElement {
    return this._navigationActions.find((action) => action.active);
  }

  private _setMarkerPosition(): void {
    this._element?.style.setProperty(
      '--sbb-navigation-marker-position-y',
      `${this._activeNavigationAction?.offsetTop}px`
    );
  }

  public render(): JSX.Element {
    return (
      <Host class={{ 'sbb-navigation-marker--visible': this._hasActiveAction }}>
        <slot onSlotchange={() => this._updateMarkerActions()} />
      </Host>
    );
  }
}
