import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { forceType } from '../core/decorators.js';
import { isZeroAnimationDuration } from '../core/dom.js';
import { forwardEvent } from '../core/eventing.js';
import { i18nCloseDialog } from '../core/i18n.js';

import { overlayRefs, SbbOverlayBaseElement } from './overlay-base-element.js';
import style from './overlay.scss?lit&inline';

import '../button/secondary-button.js';
import '../button/transparent-button.js';
import '../container.js';
import '../screen-reader-only.js';

let nextId = 0;

/**
 * It displays an interactive overlay element.
 *
 * @slot - Use the unnamed slot to provide a content for the overlay.
 * @cssprop [--sbb-overlay-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-overlay')
class SbbOverlayElement extends SbbOverlayBaseElement {
  public static override styles: CSSResultGroup = style;

  // TODO: fix using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static override readonly events = {
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  /**
   * Whether to allow the overlay content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor expanded: boolean = false;

  /** This will be forwarded as aria-label to the close button element. */
  @forceType()
  @property({ attribute: 'accessibility-close-label' })
  public accessor accessibilityCloseLabel: string = '';

  protected closeAttribute: string = 'sbb-overlay-close';
  private _overlayContentElement: HTMLElement | null = null;

  public override connectedCallback(): void {
    this.id ||= `sbb-overlay-${nextId++}`;

    super.connectedCallback();
  }

  protected isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-overlay-animation-duration');
  }

  protected handleOpening(): void {
    this.state = 'opened';
    this.inertController.activate();
    this.escapableOverlayController.connect();
    this.attachOpenOverlayEvents();
    this.focusTrapController.focusInitialElement();
    // Use timeout to read label after focused element
    setTimeout(() => this.setAriaLiveRefContent(this.accessibilityLabel));
    this.focusTrapController.enabled = true;
    this.dispatchOpenEvent();
  }

  protected override handleClosing(): void {
    this._overlayContentElement?.scrollTo(0, 0);
    this.state = 'closed';
    this.hidePopover?.();
    this.inertController.deactivate();
    if (!this.skipFocusRestoration) {
      // Manually focus last focused element
      this.lastFocusedElement?.focus();
    }
    this.openOverlayController?.abort();
    this.focusTrapController.enabled = false;
    this.removeInstanceFromGlobalCollection();
    // Enable scrolling for content below the overlay if no overlay is open
    if (!overlayRefs.length) {
      this.scrollHandler.enableScroll();
    }
    this.escapableOverlayController.disconnect();
    this.dispatchCloseEvent({
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    });
  }

  protected override render(): TemplateResult {
    const TAG_NAME = this.negative ? 'sbb-transparent-button' : 'sbb-secondary-button';

    /* eslint-disable lit/binding-positions */
    const closeButton = html`
      <${unsafeStatic(TAG_NAME)}
        class="sbb-overlay__close"
        aria-label=${this.accessibilityCloseLabel || i18nCloseDialog[this.language.current]}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-overlay-close
      ></${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-enable lit/binding-positions */

    return html`
      <div class="sbb-overlay__container" @animationend=${this.onOverlayAnimationEnd}>
        <div class="sbb-overlay">
          <div
            @click=${(event: Event) => this.closeOnSbbOverlayCloseClick(event)}
            class="sbb-overlay__wrapper"
          >
            <div class="sbb-overlay__header">${closeButton}</div>
            <div
              class="sbb-overlay__content"
              ${ref((el?: Element) => (this._overlayContentElement = el as HTMLDivElement))}
              @scroll=${(e: Event) => forwardEvent(e, document)}
            >
              <sbb-container
                class="sbb-overlay__content-container"
                ?expanded=${this.expanded}
                color="transparent"
              >
                <slot></slot>
              </sbb-container>
            </div>
          </div>
        </div>
      </div>
      <sbb-screen-reader-only aria-live="polite"></sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-overlay': SbbOverlayElement;
  }
}
