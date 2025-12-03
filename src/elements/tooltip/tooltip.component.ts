import {
  html,
  isServer,
  type CSSResultGroup,
  type TemplateResult,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbOpenCloseBaseElement } from '../core/base-elements.ts';
import { readConfig } from '../core/config.ts';
import {
  SbbEscapableOverlayController,
  SbbOverlayPositionController,
} from '../core/controllers.ts';
import { idReference } from '../core/decorators.ts';
import { isAndroid, isIOS, isZeroAnimationDuration, queueDomContentLoaded } from '../core/dom.ts';
import { appendAriaElements, removeAriaElements, SbbDisabledMixin } from '../core/mixins.ts';
import { sbbOverlayOutsidePointerEventListener } from '../core/overlay.ts';
import { boxSizingStyles } from '../core/styles.ts';

import style from './tooltip.scss?lit&inline';

/**
 * Defines the default position for the tooltip if this element is used as a trigger.
 */
export interface SbbTooltipDefaultPositions {
  readonly tooltipPositions: string[];
}

/**
 * Time between the user putting the pointer on a tooltip
 * trigger and the long press event being fired.
 */
const LONGPRESS_DELAY = 500;

const isMobile = isAndroid || isIOS;
const tooltipTriggers = new WeakMap<HTMLElement, SbbTooltipElement>();
let nextId = 0;

/**
 * It displays text content within a tooltip.
 *
 * @slot - Use the unnamed slot to add the text into the tooltip.
 * @cssprop [--sbb-overlay-position-area=block-end] - The primary position for the tooltip.
 * @cssprop [--sbb-overlay-position-try-fallbacks=block-end span-inline-end, block-end span-inline-start, block-start, block-start span-inline-end, block-start span-inline-start] -
 * The list of fallback positions, separated by ',', for the tooltip
 * @cssprop [--sbb-tooltip-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-tooltip')
class SbbTooltipElement extends SbbDisabledMixin(SbbOpenCloseBaseElement) {
  public static override readonly role = 'tooltip';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  private static _tooltipOutlet: Element;

  static {
    if (!isServer) {
      // We don't want to block execution for initialization,
      // so we defer it until the DOM content is loaded.
      queueDomContentLoaded(() => this._initializeTooltipOutlet());
    }
  }

  /**
   * The element that will trigger the tooltip overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  /**
   * Open the tooltip after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   *
   * @default null
   */
  @property({ attribute: 'open-delay', type: Number })
  public set openDelay(value: number | null) {
    this._openDelay = value;
  }
  public get openDelay(): number {
    return this._openDelay ?? readConfig().tooltip?.openDelay ?? 0;
  }
  private _openDelay: number | null = null;

  /**
   * Close the tooltip after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   *
   * @default null
   */
  @property({ attribute: 'close-delay', type: Number })
  public set closeDelay(value: number | null) {
    this._closeDelay = value;
  }
  public get closeDelay(): number {
    return this._closeDelay ?? readConfig().tooltip?.closeDelay ?? 0;
  }
  private _closeDelay: number | null = null;

  /**
   * Automatically close the tooltip after it has been open by long press.
   * Global configuration is used as default, if not set.
   *
   * @default 1500
   */
  @property({ attribute: 'long-press-close-delay', type: Number })
  public set longPressCloseDelay(value: number) {
    this._longPressCloseDelay = +value;
  }
  public get longPressCloseDelay(): number {
    return this._longPressCloseDelay ?? readConfig().tooltip?.longPressCloseDelay ?? 1500;
  }
  private _longPressCloseDelay?: number;

  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController?: AbortController;
  private _openStateController!: AbortController;
  private _escapableOverlayController = new SbbEscapableOverlayController(this);
  private _overlayController = new SbbOverlayPositionController(this);
  private _openTimeout?: ReturnType<typeof setTimeout>;
  private _closeTimeout?: ReturnType<typeof setTimeout>;
  private _longPressOpenTimeout?: ReturnType<typeof setTimeout>;
  private _longPressCloseTimeout?: ReturnType<typeof setTimeout>;

  public constructor() {
    super();

    // Until the mouse hovers the tooltip, it stays open.
    // On 'mouseleave' (if the mouse is not moved onto the trigger again), close it.
    this.addEventListener(
      'mouseleave',
      (event) => {
        if (
          (this.state === 'opened' || this.state === 'opening') &&
          (!event.relatedTarget || !this._triggerElement?.contains(event.relatedTarget as Node))
        ) {
          this._delayedClose();
        }
      },
      { passive: true },
    );

    // Any user interaction outside the tooltip closes it immediately
    this.addEventListener('overlayOutsidePointer', () => this.close(), { passive: true });

    this.addEventListener('animationend', (e) => this._onTooltipAnimationEnd(e), { passive: true });
  }

  private static _initializeTooltipOutlet(): void {
    this._tooltipOutlet = document.createElement('div');
    this._tooltipOutlet.classList.add('sbb-overlay-outlet');
    document.body.appendChild(this._tooltipOutlet);

    // We are using MutationObserver directly here, as it will only be called on client side,
    // and we do not need to disconnect it, as we want it to work during the full lifetime
    // of the page.
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          this._handleTooltipTrigger(mutation.target as HTMLElement);
        } else if (mutation.type === 'childList') {
          for (const node of [...mutation.addedNodes, ...mutation.removedNodes].filter(
            (n): n is HTMLElement => n.nodeType === n.ELEMENT_NODE,
          )) {
            this._handleTooltipTrigger(node);
            this._findAndHandleTooltipTriggers(node);
          }
        }
      }
    }).observe(document.documentElement, {
      attributeFilter: [
        'sbb-tooltip',
        'sbb-tooltip-open-delay',
        'sbb-tooltip-close-delay',
        'sbb-tooltip-position',
      ],
      childList: true,
      subtree: true,
    });
    this._findAndHandleTooltipTriggers(document.body);
  }

  private static _findAndHandleTooltipTriggers(root: HTMLElement): void {
    root
      .querySelectorAll<HTMLElement>('[sbb-tooltip]')
      .forEach((e) => this._handleTooltipTrigger(e));
  }

  private static _handleTooltipTrigger(triggerElement: HTMLElement): void {
    const tooltipMessage = triggerElement.getAttribute('sbb-tooltip');
    let tooltip = tooltipTriggers.get(triggerElement);

    if (tooltipMessage && triggerElement.isConnected) {
      if (!tooltip) {
        // Create a new sbb-tooltip in the outlet and attach it to the trigger
        tooltip = document.createElement('sbb-tooltip');
        tooltipTriggers.set(triggerElement, tooltip);
        this._tooltipOutlet.appendChild(tooltip);
        tooltip.trigger = triggerElement;
      }

      tooltip.textContent = tooltipMessage;
      tooltip.openDelay = triggerElement.hasAttribute('sbb-tooltip-open-delay')
        ? +triggerElement.getAttribute('sbb-tooltip-open-delay')!
        : null;
      tooltip.closeDelay = triggerElement.hasAttribute('sbb-tooltip-close-delay')
        ? +triggerElement.getAttribute('sbb-tooltip-close-delay')!
        : null;

      // Read the positions from the trigger (either from the attribute or the property)
      const positions = triggerElement.hasAttribute('sbb-tooltip-position')
        ? triggerElement
            .getAttribute('sbb-tooltip-position')!
            .split(',')
            .map((p) => p.trim())
        : (triggerElement as unknown as SbbTooltipDefaultPositions).tooltipPositions;

      if (positions && positions.length > 0) {
        tooltip.style.setProperty('--sbb-overlay-position-area', positions[0]);
        tooltip.style.setProperty(
          '--sbb-overlay-position-try-fallbacks',
          positions.slice(1).join(', '),
        );
      } else {
        tooltip.style.removeProperty('--sbb-overlay-position-area');
        tooltip.style.removeProperty('--sbb-overlay-position-try-fallbacks');
      }
    } else if (tooltip) {
      // The trigger or the attribute has been deleted => delete the connected tooltip
      tooltipTriggers.delete(triggerElement);
      tooltip._destroy();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.popover = 'manual';
    this.id ||= `sbb-tooltip-${++nextId}`;
    this.state = 'closed';
    sbbOverlayOutsidePointerEventListener.connect(this);

    if (this.hasUpdated && this.trigger) {
      this._attach(this.trigger);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    sbbOverlayOutsidePointerEventListener.disconnect(this);
    this._detach();
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (isServer) {
      return;
    }

    if ((!name || name === 'trigger') && this.hasUpdated) {
      this._attach(this.trigger);
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this._attach(this.trigger);
  }

  public open(): void {
    this._resetOpenCloseTimeout();
    if (
      (this.state !== 'closed' && this.state !== 'closing') ||
      this.disabled ||
      !this.trigger ||
      !this.dispatchBeforeOpenEvent()
    ) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._overlayController.connect(this.trigger);

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  public close(): void {
    this._resetOpenCloseTimeout();
    if (this.state !== 'opened' && this.state !== 'opening') {
      return;
    }

    this.dispatchBeforeCloseEvent();
    this.state = 'closing';

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _delayedOpen(): void {
    this._resetOpenCloseTimeout();
    this._openTimeout = setTimeout(() => this.open(), this.openDelay);
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this._escapableOverlayController.connect();
    this.dispatchOpenEvent();
  }

  private _delayedClose(): void {
    this._resetOpenCloseTimeout();
    this._closeTimeout = setTimeout(() => this.close(), this.closeDelay);
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();
    this._overlayController.disconnect();

    this._escapableOverlayController.disconnect();
    this.dispatchCloseEvent();
    this._openStateController?.abort();
  }

  private _onTooltipAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  private _attach(trigger: HTMLElement | null): void {
    if (this._triggerElement) {
      // Eventually detach from the old trigger
      this._detach();
    }

    this._triggerElement = trigger;
    if (!this._triggerElement) {
      return;
    }
    this._triggerElement.ariaDescribedByElements = appendAriaElements(
      this._triggerElement.ariaDescribedByElements,
      this,
    );
    this._addTriggerEventHandlers();
  }

  private _detach(): void {
    this._triggerAbortController?.abort();
    this._openStateController?.abort();

    // clear timeouts
    this._resetOpenCloseTimeout();
    clearTimeout(this._longPressOpenTimeout);
    clearTimeout(this._longPressCloseTimeout);

    if (!this._triggerElement) {
      return;
    }
    this._triggerElement.ariaDescribedByElements = removeAriaElements(
      this._triggerElement.ariaDescribedByElements,
      this,
    );
    this._triggerElement = null;
  }

  private _destroy(): void {
    this._detach();
    this.remove();
  }

  private _addTriggerEventHandlers(): void {
    const trigger = this._triggerElement;
    if (!trigger) {
      return;
    }

    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();
    const options: AddEventListenerOptions = {
      signal: this._triggerAbortController.signal,
      passive: true,
    };

    if (!isMobile) {
      trigger.addEventListener('mouseenter', () => this._delayedOpen(), options);
      trigger.addEventListener(
        'mouseleave',
        (event) => {
          const newTarget = event.relatedTarget as Node | null;
          if (!newTarget || newTarget !== this) {
            this._delayedClose();
          }
        },
        options,
      );

      // 'blurs' immediately close the tooltip because it is considered an 'interaction with other elements'
      trigger.addEventListener('blur', () => this.close(), options);
      trigger.addEventListener('focus', () => this._delayedOpen(), options);
    }

    // Long-press event handling (mainly for mobile users)
    trigger.addEventListener(
      'touchstart',
      () => {
        clearTimeout(this._longPressOpenTimeout);
        clearTimeout(this._longPressCloseTimeout);
        this._longPressOpenTimeout = setTimeout(() => this.open(), LONGPRESS_DELAY);
      },
      options,
    );
    trigger.addEventListener(
      'touchend',
      () => {
        clearTimeout(this._longPressOpenTimeout);
        this._longPressCloseTimeout = setTimeout(() => this.close(), this.longPressCloseDelay);
      },
      options,
    );
    trigger.addEventListener(
      'touchcancel',
      () => {
        clearTimeout(this._longPressOpenTimeout);
      },
      options,
    );
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-tooltip-animation-duration');
  }

  private _resetOpenCloseTimeout(): void {
    clearTimeout(this._openTimeout);
    clearTimeout(this._closeTimeout);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-tooltip">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tooltip': SbbTooltipElement;
  }
}
