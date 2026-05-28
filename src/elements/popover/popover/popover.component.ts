import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  forceType,
  isFakeMousedownFromScreenReader,
  readConfig,
  sbbInputModalityDetector,
  SbbMediaQueryPointerCoarse,
  scrollbarStyles,
  ɵstateController,
} from '../../core.ts';
import { SbbPopoverBaseElement } from '../popover-base/popover-base.ts';

import style from './popover.scss?inline';

const pointerCoarse = isServer ? false : matchMedia(SbbMediaQueryPointerCoarse).matches;

/**
 * It displays contextual information within a popover.
 *
 * @slot - Use the unnamed slot to add the `sbb-popover-close-button` and content into the popover.
 * @cssprop [--sbb-popover-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export class SbbPopoverElement extends SbbPopoverBaseElement {
  public static override readonly elementName: string = 'sbb-popover';
  public static override styles: CSSResultGroup = [scrollbarStyles, unsafeCSS(style)];

  /** Whether the popover should be triggered on hover. */
  @forceType()
  @property({ attribute: 'hover-trigger', type: Boolean })
  public accessor hoverTrigger: boolean = false;

  /**
   * Open the popover after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   *
   * @default 0
   */
  @property({ attribute: 'open-delay', type: Number })
  public set openDelay(value: number) {
    this._openDelay = +value;
  }
  public get openDelay(): number {
    return this._openDelay ?? readConfig().popover?.openDelay ?? 0;
  }
  private _openDelay?: number;

  /**
   * Close the popover after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   *
   * @default 0
   */
  @property({ attribute: 'close-delay', type: Number })
  public set closeDelay(value: number) {
    this._closeDelay = +value;
  }
  public get closeDelay(): number {
    return this._closeDelay ?? readConfig().popover?.closeDelay ?? 0;
  }
  private _closeDelay?: number;

  @state() private accessor _hoverTrigger = false;
  private _openTimeout?: ReturnType<typeof setTimeout>;
  private _overlayAbortController: AbortController | null = null;

  protected override configureTrigger(oldTrigger: HTMLElement | null): void {
    // Check whether the trigger can be hovered. Some devices might interpret the media query (hover: hover) differently,
    // and not respect the fallback mechanism on the click. Therefore, the following is preferred to identify
    // all non-touchscreen devices.
    const hoverTrigger = this.hoverTrigger && !pointerCoarse;

    if (this.trigger === oldTrigger && hoverTrigger === this._hoverTrigger) {
      return;
    }

    if (this._hoverTrigger !== hoverTrigger) {
      this._hoverTrigger = hoverTrigger;
      this.toggleState('hover-trigger', this._hoverTrigger);
      this._registerOverlayListeners();
    }

    super.configureTrigger(oldTrigger);
  }

  private _registerOverlayListeners(): void {
    this._overlayAbortController?.abort();

    if (this._hoverTrigger) {
      this._overlayAbortController = new AbortController();
      this.overlay?.addEventListener('mouseenter', () => this._onOverlayMouseEnter(), {
        signal: this._overlayAbortController.signal,
      });
      this.overlay?.addEventListener('mouseleave', () => this._onOverlayMouseLeave(), {
        signal: this._overlayAbortController.signal,
      });
    }
  }

  protected override registerTriggerListeners(signal: AbortSignal): void {
    if (this._hoverTrigger && this.trigger) {
      this.trigger.addEventListener('mouseenter', this._onTriggerMouseEnter, { signal });
      this.trigger.addEventListener('mouseleave', this._onTriggerMouseLeave, { signal });
      this.trigger.addEventListener(
        'keydown',
        (evt: KeyboardEvent) => {
          if (evt.code === 'Space' || evt.code === 'Enter') {
            this.open();
          }
        },
        { signal },
      );
      this.trigger.addEventListener(
        'mousedown',
        (evt: MouseEvent) => {
          // Without this check, NVDA can't open the popover on keyboard interaction.
          if (isFakeMousedownFromScreenReader(evt)) {
            this.open();
          }
        },
        { signal },
      );
    } else {
      super.registerTriggerListeners(signal);
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._registerOverlayListeners();
  }

  public override open(): void {
    super.open();

    if (this.hoverTrigger && this.trigger) {
      ɵstateController(this.trigger).add('force-hover');
    }
  }

  public override close(): void {
    super.close();

    ɵstateController(this.trigger)?.delete('force-hover');
  }

  private _onTriggerMouseEnter = (): void => {
    if (this.state === 'closed' || this.state === 'closing') {
      this._openTimeout = setTimeout(() => {
        // If the trigger is focused by keyboard and hovered with the mouse, the outline would be visible.
        // So we reset the input modality to hide the outline.
        sbbInputModalityDetector.reset();
        this.open();
      }, this.openDelay);
    } else {
      clearTimeout(this.closeTimeout);
    }
  };

  private _onTriggerMouseLeave = (): void => {
    if (this.state === 'opened' || this.state === 'opening') {
      this.closeTimeout = setTimeout(() => this.close(), this.closeDelay);
    } else {
      clearTimeout(this._openTimeout);
    }
  };

  private _onOverlayMouseEnter = (): void => {
    if (this.state !== 'opening') {
      clearTimeout(this.closeTimeout);
    }
  };

  private _onOverlayMouseLeave = (): void => {
    if (this.state !== 'opening') {
      this.closeTimeout = setTimeout(() => this.close(), this.closeDelay);
    }
  };

  protected override renderContent(): TemplateResult {
    return html`
      <span class="sbb-popover__scrollable-content sbb-scrollbar">
        <slot
          @slotchange=${() =>
            this.toggleState('has-close-button', !!this.querySelector('sbb-popover-close-button'))}
        ></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover': SbbPopoverElement;
  }
}
