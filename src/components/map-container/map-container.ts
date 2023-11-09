import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { toggleDatasetEntry } from '../core/dom';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { i18nMapContainerButtonLabel } from '../core/i18n';
import { AgnosticIntersectionObserver } from '../core/observers';

import style from './map-container.scss?lit&inline';
import '../button';

/**
 * @slot - Use the unnamed slot to add content to the sidebar.
 * @slot map - Used for slotting the map.
 */
@customElement('sbb-map-container')
export class SbbMapContainer extends LitElement {
  public static override styles: CSSResult = style;

  /** Flag to show/hide the scroll up button inside the sidebar on mobile. */
  @property({ attribute: 'hide-scroll-up-button', reflect: true, type: Boolean })
  public hideScrollUpButton = false;

  @state() private _scrollUpButtonVisible = false;

  /** Current document language used for translation of the button label. */
  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
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
    this.scrollIntoView({ behavior: 'smooth' });
  }
  /**
   * Intersection callback. Toggles the visibility.
   * @param entries
   * @private
   */
  private _toggleButtonVisibilityOnIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const mapIsHidden = !entry.isIntersecting;
      toggleDatasetEntry(this, 'scrollUpButtonVisible', mapIsHidden);
      this._scrollUpButtonVisible = mapIsHidden;
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
    this._updateIntersectionObserver();
  }

  private _updateIntersectionObserver(): void {
    this._observer.disconnect();
    if (!this.hideScrollUpButton && this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.connect();
    this._observer.disconnect();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-map-container">
        <div class="sbb-map-container__sidebar">
          ${!this.hideScrollUpButton
            ? html`<span
                ${ref((el: HTMLElement): void => {
                  if (this._intersector === el) {
                    return;
                  }
                  this._intersector = el;
                  this._updateIntersectionObserver();
                })}
              ></span>`
            : nothing}

          <slot></slot>

          ${!this.hideScrollUpButton
            ? html`<sbb-button
                class="sbb-map-container__sidebar-button"
                ${ref((ref: HTMLElement) => {
                  if (ref) {
                    ref.inert = !this._scrollUpButtonVisible;
                  }
                })}
                variant="tertiary"
                size="l"
                icon-name="location-pin-map-small"
                type="button"
                @click=${() => this._onScrollButtonClick()}
              >
                ${i18nMapContainerButtonLabel[this._currentLanguage]}
              </sbb-button>`
            : nothing}
        </div>
        <div class="sbb-map-container__map">
          <slot name="map"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-map-container': SbbMapContainer;
  }
}
