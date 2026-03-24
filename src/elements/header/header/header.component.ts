import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  SbbFocusVisibleWithinController,
  SbbElement,
  forceType,
  idReference,
  isLean,
  queueDomContentLoaded,
  boxSizingStyles,
} from '../../core.ts';

import style from './header.scss?inline';

const IS_MENU_OPENED_QUERY = "[aria-controls][aria-expanded='true']";

/**
 * It displays a header section for the page.
 *
 * @slot - Use the unnamed slot to add actions, content and logo to the header.
 * @cssprop [--sbb-header-z-index=10] - Can be used to modify the z-index of the header.
 * @cssprop [--sbb-header-height=zero-small:var(--sbb-spacing-fixed-14x);large-ultra:var(--sbb-spacing-fixed-24x)] - Can be used to modify height of the header.
 */
export class SbbHeaderElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-header';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  private static _headerScrollOrigins = new Set<HTMLElement>();
  private static _headerElements = new Set<SbbHeaderElement>();

  static {
    if (!isServer) {
      // We don't want to block execution for initialization,
      // so we defer it until the DOM content is loaded.
      queueDomContentLoaded(() => this._initializeScrollOriginObserver());
    }
  }

  /**
   * Whether to allow the header content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor expanded: boolean = false;

  /**
   * The element's id or the element on which the scroll listener is attached.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property({ attribute: 'scroll-origin' })
  public accessor scrollOrigin: HTMLElement | null = null;

  /** Whether the header should hide and show on scroll. */
  @forceType()
  @property({ attribute: 'hide-on-scroll', reflect: true, type: Boolean })
  public accessor hideOnScroll: boolean = false;

  /**
   * Size of the header, either m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'm' | 's' = isLean() ? 's' : 'm';

  @state() private accessor _headerOnTop = true;

  private _scrollElement: HTMLElement | Document | null | undefined;
  private _scrollEventsController!: AbortController;
  private _scrollFunction: (() => void) | undefined;
  private _lastScroll = 0;
  private _scrollOriginFromObserver: HTMLElement | null = null;

  public constructor() {
    super();
    this.addController(new SbbFocusVisibleWithinController(this));
  }

  private static _initializeScrollOriginObserver(): void {
    // We are using MutationObserver directly here, as it will only be called on client side,
    // and we do not need to disconnect it, as we want it to work during the full lifetime
    // of the page.
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          this._handleScrollOriginElement(mutation.target as HTMLElement);
        } else if (mutation.type === 'childList') {
          for (const node of [...mutation.addedNodes, ...mutation.removedNodes].filter(
            (n): n is HTMLElement => n.nodeType === n.ELEMENT_NODE,
          )) {
            this._handleScrollOriginElement(node);
            this._findAndHandleScrollOrigins(node);
          }
        }
      }
      this._updateHeaderElements();
    }).observe(document.documentElement, {
      attributeFilter: ['sbb-header-scroll-origin'],
      childList: true,
      subtree: true,
    });
    this._findAndHandleScrollOrigins(document.body);
    this._updateHeaderElements();
  }

  private static _findAndHandleScrollOrigins(root: HTMLElement): void {
    root
      .querySelectorAll<HTMLElement>('[sbb-header-scroll-origin]')
      .forEach((e) => this._handleScrollOriginElement(e));
  }

  private static _handleScrollOriginElement(element: HTMLElement): void {
    if (element.isConnected && element.hasAttribute('sbb-header-scroll-origin')) {
      this._headerScrollOrigins.add(element);
    } else {
      this._headerScrollOrigins.delete(element);
    }
  }

  private static _updateHeaderElements(): void {
    for (const header of this._headerElements) {
      if (this._headerScrollOrigins.size === 0) {
        header._scrollOriginFromObserver = null;
      } else if (this._headerScrollOrigins.size === 1) {
        header._scrollOriginFromObserver = this._headerScrollOrigins.values().next().value ?? null;
      } else {
        header._scrollOriginFromObserver =
          Array.from(this._headerScrollOrigins)
            .sort((c1, c2) => c1.compareDocumentPosition(c2) & Node.DOCUMENT_POSITION_CONTAINS)
            .at(-1) ?? null;
      }
      header._updateScrollListener();
    }
  }

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public override connectedCallback(): void {
    super.connectedCallback();
    SbbHeaderElement._headerElements.add(this);
    if (this.hasUpdated) {
      this._updateScrollListener();
    }
  }

  /** Removes the scroll listener, if previously attached. */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._scrollElement = null;
    this._scrollEventsController?.abort();
    SbbHeaderElement._headerElements.delete(this);
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (!isServer && (!name || name === 'scrollOrigin') && this.hasUpdated) {
      this._updateScrollListener();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._updateScrollListener();
  }

  private _updateScrollListener(): void {
    const scrollElement = this.scrollOrigin ?? this._scrollOriginFromObserver ?? document;
    if (scrollElement === this._scrollElement) {
      return;
    }

    this._scrollEventsController?.abort();
    this._scrollElement = scrollElement;
    if (!this._scrollElement) {
      return;
    }
    this._scrollEventsController = new AbortController();
    this._scrollFunction = this._getScrollFunction.bind(this);
    this._scrollElement.addEventListener('scroll', this._scrollFunction, {
      passive: true,
      signal: this._scrollEventsController.signal,
    });

    const currentScroll = this._getCurrentScrollProperty('scrollTop');
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  /** Returns the correct function to attach on scroll. */
  private _getScrollFunction(): void {
    return this.hideOnScroll ? this._scrollListener() : this._scrollShadowListener();
  }

  /** Returns the requested property of the scrollContext. */
  private _getCurrentScrollProperty(property: 'scrollTop' | 'scrollHeight'): number {
    if (this._scrollElement instanceof Document) {
      return this._scrollElement.documentElement[property] || this._scrollElement.body[property];
    }
    return this._scrollElement?.[property] || 0;
  }

  /**
   * Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    const currentScroll = this._getCurrentScrollProperty('scrollTop');

    // Whether the scroll view is bouncing past the edge of content and back again.
    if (this._getCurrentScrollProperty('scrollHeight') - window.innerHeight - currentScroll <= 0) {
      return;
    }

    this.toggleState('shadow', currentScroll !== 0);

    // Close open overlays when scrolling down if the header is scrolled out of sight.
    if (
      currentScroll > this.offsetHeight &&
      currentScroll > 0 &&
      this._lastScroll < currentScroll
    ) {
      this._closeOpenOverlays();
    }
    // Check if the header is scrolled out of sight, scroll position > header height * 2.
    if (currentScroll > this.offsetHeight * 2) {
      this._headerOnTop = false;
      if (currentScroll > 0 && this._lastScroll < currentScroll) {
        // Scrolling down
        ['shadow', 'visible'].forEach((name) => this.internals.states.delete(name));
      } else {
        // Scrolling up
        ['fixed', 'shadow', 'animated', 'visible'].forEach((name) =>
          this.internals.states.add(name),
        );
      }
    } else {
      // Check if header in its original position, scroll position < header height.
      // Reset header behavior when scroll hits top of the page, on scroll position = 0.
      if (currentScroll === 0) {
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        ['shadow', 'animated', 'fixed', 'visible'].forEach((name) =>
          this.internals.states.delete(name),
        );
      }
    }
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  /** Apply the shadow if the element/document has been scrolled down. */
  private _scrollShadowListener(): void {
    this.toggleState('shadow', this._getCurrentScrollProperty('scrollTop') !== 0);
  }

  private _closeOpenOverlays(): void {
    if (this.matches(':state(has-visible-focus-within)')) {
      return;
    }
    const overlayTriggers: HTMLElement[] = Array.from(
      this.querySelectorAll(IS_MENU_OPENED_QUERY) as NodeListOf<HTMLElement>,
    );
    for (const overlayTrigger of overlayTriggers) {
      const overlayId: string = overlayTrigger.getAttribute('aria-controls')!;
      const overlay = document.getElementById(overlayId) as HTMLElement & { close: () => void };
      if (typeof overlay?.close === 'function') {
        overlay.close();
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <header class="sbb-header">
        <div class="sbb-header__wrapper">
          <slot></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header': SbbHeaderElement;
  }
}
