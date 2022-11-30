import { Component, Element, h, Host, JSX, Listen, Prop, Watch } from '@stencil/core';

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
   * Marker size variant 
   */
  @Prop() public size?: 'l' | 's' = 'l';

  @Element() private _element: HTMLElement;

  @Watch('size')
  private _updateMarkerActions(): void {
    for (const action of this._navigationActions) {
      action.size = this.size;
    }
  }

  public componentDidLoad(): void {
    this._element.style.setProperty(
      '--sbb-navigation-marker-position-y',
      `${this._activeNavigationAction.offsetTop}px`
    );
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
    this._element.style.setProperty('--sbb-navigation-marker-position-y', `${action.offsetTop}px`);
  }

  private get _navigationActions(): HTMLSbbNavigationActionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-navigation-action'));
  }

  private get _activeNavigationAction(): HTMLSbbNavigationActionElement {
    return this._navigationActions.find((action) => action.classList.contains('active'));
  }

  public render(): JSX.Element {
    return (
      <Host>
        <slot onSlotchange={() => this._updateMarkerActions()} />
      </Host>
    );
  }
}
