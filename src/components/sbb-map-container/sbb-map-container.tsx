import { Component, ComponentInterface, Element, h, JSX, Prop, State } from '@stencil/core';
import { i18nMapContainerButtonLabel } from '../../global/i18n';
import { AgnosticIntersectionObserver as IntersectionObserver } from '../../global/helpers/intersection-observer';
import { documentLanguage } from '../../global/helpers';

/**
 * @slot unnamed - Used for slotting the sidebar content.
 * @slot map - Used for slotting the map.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-map-container.scss',
  tag: 'sbb-map-container',
})
export class SbbMapContainer implements ComponentInterface {
  /** Flag to show/hide the scroll up button inside the sidebar on mobile. */
  @Prop({ reflect: true }) public hideButton = false;

  /** Container element. */
  @Element() private _element!: HTMLElement;

  /** Current document language used for translation of the button label. */
  @State() private _currentLanguage = documentLanguage();

  private _sidebarButtonContainerElement: HTMLDivElement;
  private _intersector: HTMLSpanElement;
  private _observer = new IntersectionObserver((entries) =>
    this._toggleButtonVisibilityOnIntersect(entries)
  );

  /**
   * Button click callback to trigger the scroll to container top
   * @private
   */
  private _onScrollButtonClick(): void {
    this._element.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Apply the intersection observer to the trigger span in the sidebar
   * @private
   */
  private _applyIntersectionObserver(): void {
    this._observer.observe(this._intersector);
  }

  /**
   * Intersection callback. Toggles the visibility and aria-attributes.
   * @param entries
   * @private
   */
  private _toggleButtonVisibilityOnIntersect(entries): void {
    entries.forEach((entry) => {
      const mapIsHidden = !entry.isIntersecting;
      this._element.dataset.returnButtonVisible = mapIsHidden.toString();
      this._sidebarButtonContainerElement.setAttribute('aria-hidden', `${!mapIsHidden}`);
    });
  }

  public componentDidLoad(): void {
    if (!this.hideButton) {
      this._applyIntersectionObserver();
    }
  }

  public disconnectedCallback(): void {
    if (!this.hideButton) {
      this._observer.disconnect();
    }
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-map-container">
        <div class="sbb-map-container__sidebar">
          {!this.hideButton && (
            <span
              ref={(el): void => {
                this._intersector = el;
              }}
            ></span>
          )}

          <slot />

          {!this.hideButton && (
            <div
              class="sbb-map-container__sidebar-button"
              ref={(el): void => {
                this._sidebarButtonContainerElement = el;
              }}
            >
              <sbb-button
                variant="secondary"
                size="l"
                icon-name="location-pin-map-small"
                type="button"
                onClick={() => this._onScrollButtonClick()}
              >
                {i18nMapContainerButtonLabel[this._currentLanguage]}
              </sbb-button>
            </div>
          )}
        </div>
        <div class="sbb-map-container__map">
          <slot name="map" />
        </div>
      </div>
    );
  }
}
