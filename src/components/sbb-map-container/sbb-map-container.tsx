import { Component, ComponentInterface, Element, h, JSX, Prop, State } from '@stencil/core';
import { i18nMapContainerButtonLabel } from '../../global/i18n';
import { toggleDatasetEntry } from '../../global/dom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { AgnosticIntersectionObserver } from '../../global/observers';

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
  @Prop({ reflect: true }) public hideScrollUpButton = false;

  /** Container element. */
  @Element() private _element!: HTMLElement;

  @State() private _scrollUpButtonVisible = false;

  /** Current document language used for translation of the button label. */
  @State() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  private _intersector: HTMLSpanElement;
  private _observer = new AgnosticIntersectionObserver((entries) =>
    this._toggleButtonVisibilityOnIntersect(entries),
  );

  /**
   * Button click callback to trigger the scroll to container top
   * @private
   */
  private _onScrollButtonClick(): void {
    this._element.scrollIntoView({ behavior: 'smooth' });
  }
  /**
   * Intersection callback. Toggles the visibility.
   * @param entries
   * @private
   */
  private _toggleButtonVisibilityOnIntersect(entries): void {
    entries.forEach((entry) => {
      const mapIsHidden = !entry.isIntersecting;
      toggleDatasetEntry(this._element, 'scrollUpButtonVisible', mapIsHidden);
      this._scrollUpButtonVisible = mapIsHidden;
    });
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._updateIntersectionObserver();
  }

  private _updateIntersectionObserver(): void {
    this._observer.disconnect();
    if (!this.hideScrollUpButton && this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  public disconnectedCallback(): void {
    this._handlerRepository.connect();
    this._observer.disconnect();
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-map-container">
        <div class="sbb-map-container__sidebar">
          {!this.hideScrollUpButton && (
            <span
              ref={(el): void => {
                if (this._intersector === el) {
                  return;
                }
                this._intersector = el;
                this._updateIntersectionObserver();
              }}
            ></span>
          )}

          <slot />

          {!this.hideScrollUpButton && (
            <sbb-button
              class="sbb-map-container__sidebar-button"
              ref={(ref) => (ref.inert = !this._scrollUpButtonVisible)}
              variant="tertiary"
              size="l"
              icon-name="location-pin-map-small"
              type="button"
              onClick={() => this._onScrollButtonClick()}
            >
              {i18nMapContainerButtonLabel[this._currentLanguage]}
            </sbb-button>
          )}
        </div>
        <div class="sbb-map-container__map">
          <slot name="map" />
        </div>
      </div>
    );
  }
}
