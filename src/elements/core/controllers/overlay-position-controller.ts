import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

import type { SbbElementInternalsMixinType } from '../mixins.ts';

const cssAnchorPositionSupported = !isServer && CSS.supports('anchor-name', '--test');

const physicalSupportedPositions = [
  'top',
  'bottom',
  'left',
  'right',
  'top span-left',
  'top span-right',
  'bottom span-left',
  'bottom span-right',
  'left span-top',
  'left span-bottom',
  'right span-top',
  'right span-bottom',
];

// Note: if you add new logical supported positions, update also the 'rtlPositionMapping'
const logicalSupportedPositions = [
  'block-start',
  'block-end',
  'inline-start',
  'inline-end',
  'block-start span-inline-start',
  'block-start span-inline-end',
  'block-end span-inline-start',
  'block-end span-inline-end',
  'inline-start span-block-start',
  'inline-start span-block-end',
  'inline-end span-block-start',
  'inline-end span-block-end',
];

const rtlPositionMapping: { [key: string]: string } = {
  'block-start': 'block-start',
  'block-end': 'block-end',
  'inline-start': 'inline-end',
  'inline-end': 'inline-start',
  'block-start span-inline-start': 'block-start span-inline-end',
  'block-start span-inline-end': 'block-start span-inline-start',
  'block-end span-inline-start': 'block-end span-inline-end',
  'block-end span-inline-end': 'block-end span-inline-start',
  'inline-start span-block-start': 'inline-end span-block-start',
  'inline-start span-block-end': 'inline-end span-block-end',
  'inline-end span-block-start': 'inline-start span-block-start',
  'inline-end span-block-end': 'inline-start span-block-end',
};

const supportedPositions = [...physicalSupportedPositions, ...logicalSupportedPositions];
let nextId = 0;

/**
 * Controller for managing overlays positioning. Also acts as a polyfill when native
 * CSS Anchor Positioning is not supported (enough).
 * Applies unique anchor names when using native CSS Anchor Positioning
 * or calculates and applies correct positions in polyfill mode.
 *
 * Also, the controller sets the 'data-position' attribute on the overlay element.
 * This can be used to apply specific styles based on the current position of the overlay.
 *
 * ### Implementation
 * Define and apply the following CSS variables on the overlay element:
 * ```scss
 *   --sbb-overlay-position-area: block-end; // Default
 *   --sbb-overlay-position-try-fallbacks: block-start, inline-end, inline-start; // Fallbacks
 *
 *   position-area: var(--sbb-overlay-position-area);
 *   position-try-fallbacks: var(--sbb-overlay-position-try-fallbacks);
 * ```
 */
export class SbbOverlayPositionController implements ReactiveController {
  private readonly _resizeObserver = !isServer
    ? new ResizeObserver(() => this._requestCalculatePosition())
    : null!;
  private readonly _overlay: ReactiveControllerHost & HTMLElement & SbbElementInternalsMixinType;
  private _abortController?: AbortController;
  private _anchor?: HTMLElement;
  private _overlayStyles?: CSSStyleDeclaration;
  private _frame?: ReturnType<typeof requestAnimationFrame>;
  private _anchorName = `--sbb-overlay-anchor-${++nextId}`;
  private _positions: string[] = [];
  private _lastPosition?: string;

  /** Get the current position. (e.g. block-end, block-start, etc.) */
  public get currentPosition(): string {
    if (this._usePolyfill) {
      return this._lastPosition ?? this._positions[0] ?? '';
    } else {
      this._overlayStyles ??= getComputedStyle(this._overlay);
      return this._overlayStyles.getPropertyValue('position-area');
    }
  }

  public constructor(
    host: ReactiveControllerHost & HTMLElement & SbbElementInternalsMixinType,
    private _usePolyfill = !cssAnchorPositionSupported,
  ) {
    host.addController(this);
    this._overlay = host;
  }

  public hostConnected(): void {
    if (!this._usePolyfill) {
      this._overlay.style.setProperty('position-anchor', this._anchorName);
    } else {
      // Reset the 'position-area' value to avoid any unwanted side effect when using the polyfill.
      this._overlay.style.setProperty('position-area', 'initial');
    }
  }

  public hostUpdate(): void {
    if (isServer) {
      return;
    }
    this._readPositionsFromCss();
  }

  /**
   * Connects the overlay to the given trigger element and determines the optimal position.
   * Usually, this is called when the overlay is opened.
   * @param anchor The anchor element.
   */
  public connect(anchor: HTMLElement): void {
    if (isServer) {
      return;
    }

    if (this._anchor) {
      this.disconnect();
    }
    this._anchor = anchor;

    if (!this._usePolyfill) {
      this._anchor.style.setProperty('anchor-name', this._anchorName!);
    }

    this._readPositionsFromCss();
    this._calculatePosition();
    this._abortController?.abort();
    this._abortController = new AbortController();

    // We need to use capture here to react to all scroll events.
    // If capture was not used, then scroll events inside separate scroll
    // containers would not be caught.
    document.addEventListener('scroll', () => this._requestCalculatePosition(), {
      capture: true,
      passive: true,
      signal: this._abortController.signal,
    });
    window.addEventListener('resize', () => this._requestCalculatePosition(), {
      passive: true,
      signal: this._abortController.signal,
    });
    this._resizeObserver.observe(anchor, { box: 'border-box' });
    this._resizeObserver.observe(this._overlay, { box: 'border-box' });
  }

  public disconnect(): void {
    this._anchor?.style.removeProperty('anchor-name');
    this._anchor = undefined;
    this._abortController?.abort();
    this._resizeObserver.disconnect();
  }

  private _requestCalculatePosition(): void {
    this._frame ??= requestAnimationFrame(() => {
      this._calculatePosition();
      this._frame = undefined;
    });
  }

  private _calculatePosition(): void {
    if (!this._anchor) {
      return;
    }

    if (this._usePolyfill) {
      const position = this._getOptimalPosition(this._positions);
      this._applyOverlayPosition(position.position, position.left, position.top);
    }

    this._overlay.setAttribute('data-position', this.currentPosition);
  }

  /**
   * Calculates the optimal position that fits the overlay.
   * @param positions The list of positions to check.
   * @private
   */
  private _getOptimalPosition(positions: string[]): {
    left: number;
    top: number;
    position: string;
    fits?: boolean;
  } {
    const { offsetHeight: overlayHeight, offsetWidth: overlayWidth } = this._overlay;
    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;
    const {
      top: triggerOffsetTop,
      left: triggerOffsetLeft,
      height: triggerHeight,
      width: triggerWidth,
    } = this._anchor!.getBoundingClientRect();

    const isRtl = this._overlay.matches(':dir(rtl)');
    const topSpace = triggerOffsetTop;
    const bottomSpace = viewportHeight - triggerHeight - triggerOffsetTop;
    const leftSpace = triggerOffsetLeft;
    const rightSpace = viewportWidth - triggerWidth - triggerOffsetLeft;

    // The difference between the overlay and the trigger width/height.
    const overlayWidthNet = overlayWidth - triggerWidth;
    const overlayHeightNet = overlayHeight - triggerHeight;

    // The amount that would exceed the trigger if the overlay were centered on it.
    const overlayWidthOverlap = overlayWidthNet / 2;
    const overlayHeightOverlap = overlayHeightNet / 2;

    this._overlay.style.setProperty(
      '--sbb-overlay-controller-trigger-height',
      `${triggerHeight}px`,
    );
    this._overlay.style.setProperty('--sbb-overlay-controller-trigger-width', `${triggerWidth}px`);

    // eslint-disable-next-line no-useless-assignment
    let result: ReturnType<typeof this._getOptimalPosition> = { left: 0, top: 0, position: '' };
    let firstPosition: ReturnType<typeof this._getOptimalPosition> | undefined = undefined;
    for (const position of positions) {
      // If rtl is enabled, we map the logical position to their RTL equivalent. (e.g. 'inline-start' -> 'inline-end')
      const physicalPosition =
        isRtl && logicalSupportedPositions.includes(position)
          ? rtlPositionMapping[position]
          : position;

      switch (physicalPosition) {
        default:
        case 'bottom':
        case 'block-end':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidthOverlap,
            top: triggerOffsetTop + triggerHeight,
            fits:
              overlayHeight <= bottomSpace &&
              overlayWidthOverlap <= leftSpace &&
              overlayWidthOverlap <= rightSpace,
          };
          break;
        case 'top':
        case 'block-start':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidthOverlap,
            top: triggerOffsetTop - overlayHeight,
            fits:
              overlayHeight <= topSpace &&
              overlayWidthOverlap <= leftSpace &&
              overlayWidthOverlap <= rightSpace,
          };
          break;
        case 'right':
        case 'inline-end':
          result = {
            position,
            left: triggerOffsetLeft + triggerWidth,
            top: triggerOffsetTop - overlayHeightOverlap,
            fits:
              overlayWidth <= rightSpace &&
              overlayHeightOverlap <= topSpace &&
              overlayHeightOverlap <= bottomSpace,
          };
          break;
        case 'left':
        case 'inline-start':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidth,
            top: triggerOffsetTop - overlayHeightOverlap,
            fits:
              overlayWidth <= leftSpace &&
              overlayHeightOverlap <= topSpace &&
              overlayHeightOverlap <= bottomSpace,
          };
          break;
        case 'top span-left':
        case 'block-start span-inline-start':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidthNet,
            top: triggerOffsetTop - overlayHeight,
            fits: overlayHeight <= topSpace && overlayWidthNet <= leftSpace,
          };
          break;
        case 'top span-right':
        case 'block-start span-inline-end':
          result = {
            position,
            left: triggerOffsetLeft,
            top: triggerOffsetTop - overlayHeight,
            fits: overlayHeight <= topSpace && overlayWidthNet <= rightSpace,
          };
          break;
        case 'bottom span-left':
        case 'block-end span-inline-start':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidthNet,
            top: triggerOffsetTop + triggerHeight,
            fits: overlayHeight <= bottomSpace && overlayWidthNet <= leftSpace,
          };
          break;
        case 'bottom span-right':
        case 'block-end span-inline-end':
          result = {
            position,
            left: triggerOffsetLeft,
            top: triggerOffsetTop + triggerHeight,
            fits: overlayHeight <= bottomSpace && overlayWidthNet <= rightSpace,
          };
          break;
        case 'left span-top':
        case 'inline-start span-block-start':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidth,
            top: triggerOffsetTop + triggerHeight - overlayHeight,
            fits: overlayWidth <= leftSpace && overlayHeightNet <= topSpace,
          };
          break;
        case 'left span-bottom':
        case 'inline-start span-block-end':
          result = {
            position,
            left: triggerOffsetLeft - overlayWidth,
            top: triggerOffsetTop,
            fits: overlayWidth <= leftSpace && overlayHeightNet <= bottomSpace,
          };
          break;
        case 'right span-top':
        case 'inline-end span-block-start':
          result = {
            position,
            left: triggerOffsetLeft + triggerWidth,
            top: triggerOffsetTop + triggerHeight - overlayHeight,
            fits: overlayWidth <= rightSpace && overlayHeightNet <= topSpace,
          };
          break;
        case 'right span-bottom':
        case 'inline-end span-block-end':
          result = {
            position,
            left: triggerOffsetLeft + triggerWidth,
            top: triggerOffsetTop,
            fits: overlayWidth <= rightSpace && overlayHeightNet <= bottomSpace,
          };
          break;
      }
      if (result.fits) {
        return result;
      }
      firstPosition ??= result;
    }

    // If no position fits, we return the first one.
    return firstPosition!;
  }

  private _applyOverlayPosition(position: string, left: number, top: number): void {
    this._lastPosition = position;
    this._overlay.style.left = `${left}px`;
    this._overlay.style.top = `${top}px`;
  }

  /**
   * Only used in polyfill mode.
   * Reads the list of the configured positions from the CSS variables.
   * @private
   */
  private _readPositionsFromCss(): void {
    if (!this._usePolyfill) {
      return;
    }
    this._overlayStyles ??= getComputedStyle(this._overlay);
    const positions = [
      this._overlayStyles.getPropertyValue('--sbb-overlay-position-area') || 'block-end',
      ...this._overlayStyles
        .getPropertyValue('--sbb-overlay-position-try-fallbacks')
        .split(',')
        .map((f) => f.trim())
        .filter((f) => !!f),
    ];

    if (import.meta.env.DEV && positions.some((p) => !supportedPositions.includes(p))) {
      const unsupportedPositions = positions
        .filter((p) => !supportedPositions.includes(p))
        .sort()
        .join(', ');
      throw new Error(
        `Unsupported position-try-fallbacks ${unsupportedPositions} (Supported: ${supportedPositions.join(', ')})`,
      );
    }

    this._positions = positions;
    if (this._lastPosition && !this._positions.includes(this._lastPosition)) {
      this._lastPosition = undefined;
    }
  }
}
