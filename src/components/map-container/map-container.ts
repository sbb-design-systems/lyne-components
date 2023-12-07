import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { LanguageController } from '../core/common-behaviors';
import { toggleDatasetEntry } from '../core/dom';
import { i18nMapContainerButtonLabel } from '../core/i18n';
import { AgnosticIntersectionObserver } from '../core/observers';
import '../button';

import style from './map-container.scss?lit&inline';

/**
 * It can be used as a container for maps.
 *
 * @slot - Use the unnamed slot to add content to the sidebar.
 * @slot map - Used for slotting the map.
 */
@customElement('sbb-map-container')
export class SbbMapContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Flag to show/hide the scroll up button inside the sidebar on mobile. */
  @property({ attribute: 'hide-scroll-up-button', reflect: true, type: Boolean })
  public hideScrollUpButton = false;

  @state() private _scrollUpButtonVisible = false;

  private _intersector: HTMLSpanElement;
  private _language = new LanguageController(this);
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
                variant="tertiary"
                size="l"
                icon-name="location-pin-map-small"
                type="button"
                @click=${() => this._onScrollButtonClick()}
                ${ref((ref: HTMLElement) => {
                  if (ref) {
                    ref.inert = !this._scrollUpButtonVisible;
                  }
                })}
              >
                ${i18nMapContainerButtonLabel[this._language.current]}
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
    'sbb-map-container': SbbMapContainerElement;
  }
}
