import { Component, ComponentInterface, Element, h, JSX } from '@stencil/core';

/**
 * @slot unnamed - Used for slotting the sidebar content.
 * @slot map - Used for slotting the map.
 * @slot button - Used for slotting the scroll up button on inside the sidebar.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-map-container.scss',
  tag: 'sbb-map-container',
})
export class SbbMapContainer implements ComponentInterface {
  @Element() private _element!: HTMLElement;
  private _sidebarButtonContainerElement: HTMLDivElement;
  private _intersector: HTMLSpanElement;
  private _buttonSlotted = false;
  private _observer = new IntersectionObserver((entries) =>
    this._toggleButtonVisibilityOnIntersect(entries)
  );

  /**
   * Apply the click listener to the button wrapper element for the scroll up functionality.
   * @private
   */
  private _addClickListener(): void {
    this._sidebarButtonContainerElement.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Apply the intersection observer to the trigger span in the sidebar
   * @private
   */
  private _applyIntersectionObserver() {
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
      this._sidebarButtonContainerElement.classList.toggle('visible', mapIsHidden);
      this._element.dataset.returnButtonVisible = mapIsHidden.toString();
      this._sidebarButtonContainerElement.setAttribute('aria-hidden', `${!mapIsHidden}`);
    });
  }

  public componentDidLoad() {
    if (this._buttonSlotted) {
      this._applyIntersectionObserver();
      this._addClickListener();
    }
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-map-container">
        <div class="sbb-map-container__sidebar">
          <span
            ref={(el): void => {
              this._intersector = el;
            }}
          ></span>

          <slot />

          <div
            class="sbb-map-container__sidebar-button"
            ref={(el): void => {
              this._sidebarButtonContainerElement = el;
            }}
          >
            <slot
              name="button"
              onSlotchange={(): void => {
                this._buttonSlotted = true;
              }}
            />
          </div>
        </div>
        <div class="sbb-map-container__map">
          <slot name="map" />
        </div>
      </div>
    );
  }
}
