import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

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
];

const logicalSupportedPositions = [
  'block-start',
  'block-end',
  'inline-start',
  'inline-end',
  'block-start span-inline-start',
  'block-start span-inline-end',
  'block-end span-inline-start',
  'block-end span-inline-end',
];

// TODO: Support more positions?
const supportedPositions = [
  ...physicalSupportedPositions,
  ...logicalSupportedPositions,

  'end', // probably not needed
  'start', // probably not needed
];
let nextId = 0;

/**
 * Controller for managing overlays positioning. Also acts as a polyfill when native
 * CSS Anchor Positioning is not supported (enough).
 * Applies unique anchor names when using native CSS Anchor Positioning
 * or calculates and applies correct positions in polyfill mode.
 *
 * ### Implementation
 * Define and apply the following CSS variables on the overlay element:
 * ```scss
 *   --sbb-overlay-controller-position-area: block-end; // Default
 *   --sbb-overlay-controller-position-try-fallbacks: block-start, inline-end, inline-start; // Fallbacks
 *
 *   position-area: var(--sbb-overlay-controller-position-area);
 *   position-try-fallbacks: var(--sbb-overlay-controller-position-try-fallbacks);
 * ```
 */
export class SbbOverlayController implements ReactiveController {
  private readonly _resizeObserver =
    this._usePolyfill && !isServer
      ? new ResizeObserver(() => this._requestCalculatePosition())
      : null!;
  private _abortController?: AbortController;
  private _trigger?: HTMLElement;
  private _overlay: HTMLElement;
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
    host: ReactiveControllerHost & HTMLElement,
    overlay?: HTMLElement,
    private _usePolyfill = !cssAnchorPositionSupported,
  ) {
    host.addController(this);
    this._overlay = overlay ?? host;
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
    if (isServer || !this._usePolyfill) {
      return;
    }
    this._overlayStyles ??= getComputedStyle(this._overlay);
    const positions = [
      this._overlayStyles.getPropertyValue('--sbb-overlay-controller-position-area') || 'block-end',
      ...this._overlayStyles
        .getPropertyValue('--sbb-overlay-controller-position-try-fallbacks')
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

  public connect(trigger: HTMLElement): void {
    if (isServer) {
      return;
    }

    if (this._trigger) {
      this.disconnect();
    }
    this._trigger = trigger;

    if (!this._usePolyfill) {
      this._trigger.style.setProperty('anchor-name', this._anchorName!);
      return;
    }

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
    this._resizeObserver.observe(trigger, { box: 'border-box' });
    this._resizeObserver.observe(this._overlay, { box: 'border-box' });
  }

  public disconnect(): void {
    this._trigger?.style.removeProperty('anchor-name');
    this._trigger = undefined;
    if (this._usePolyfill) {
      this._abortController?.abort();
      this._resizeObserver.disconnect();
    }
  }

  private _requestCalculatePosition(): void {
    if (this._frame) {
      return;
    }

    this._frame = requestAnimationFrame(() => {
      this._calculatePosition();
      this._frame = undefined;
    });
  }

  private _calculatePosition(): void {
    const { offsetHeight: overlayHeight, offsetWidth: overlayWidth } = this._overlay;
    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;
    const {
      top: triggerOffsetTop,
      left: triggerOffsetLeft,
      height: triggerHeight,
      width: triggerWidth,
    } = this._trigger!.getBoundingClientRect();

    const isRtl = document.documentElement.matches(':dir(rtl)');
    const blockStartSpace = triggerOffsetTop;
    const blockEndSpace = viewportHeight - triggerHeight - triggerOffsetTop;

    const leftSpace = triggerOffsetLeft;
    const rightSpace = viewportWidth - triggerWidth - triggerOffsetLeft;

    // These sizes represent the amount that would exceed the trigger if the overlay were centered on it.
    const overlayWidthOverlap = (overlayWidth - triggerWidth) / 2;
    const overlayHeightOverlap = (overlayHeight - triggerHeight) / 2;

    this._overlay.style.setProperty(
      '--sbb-overlay-controller-trigger-height',
      `${triggerHeight}px`,
    );
    this._overlay.style.setProperty('--sbb-overlay-controller-trigger-width', `${triggerWidth}px`);

    // TODO: RTL is probably not working correctly yet.
    for (const position of this._positions) {
      let inlineStartSpace = leftSpace;
      let inlineEndSpace = rightSpace;

      if (isRtl && logicalSupportedPositions.includes(position)) {
        inlineStartSpace = rightSpace;
        inlineEndSpace = leftSpace;
      }

      switch (position) {
        default:
        case 'block-end':
        case 'bottom':
          if (
            overlayHeight <= blockEndSpace &&
            overlayWidthOverlap <= inlineStartSpace &&
            overlayWidthOverlap <= inlineEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetLeft - overlayWidthOverlap,
              triggerOffsetTop + triggerHeight,
            );
          }
          break;
        case 'block-start':
        case 'top':
          if (
            overlayHeight <= blockStartSpace &&
            overlayWidthOverlap <= inlineStartSpace &&
            overlayWidthOverlap <= inlineEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetLeft - overlayWidthOverlap,
              triggerOffsetTop - overlayHeight,
            );
          }
          break;
        case 'inline-end':
        case 'right':
          if (
            overlayWidth <= inlineEndSpace &&
            overlayHeightOverlap <= blockStartSpace &&
            overlayHeightOverlap <= blockEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetLeft + triggerWidth,
              triggerOffsetTop - overlayHeightOverlap,
            );
          }
          break;
        case 'inline-start':
        case 'left':
          if (
            overlayWidth <= inlineStartSpace &&
            overlayHeightOverlap <= blockStartSpace &&
            overlayHeightOverlap <= blockEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetLeft - overlayWidth,
              triggerOffsetTop - overlayHeightOverlap,
            );
          }
          break;

        case 'start':
          if (overlayHeight <= blockStartSpace && overlayWidth <= inlineStartSpace) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetLeft - overlayWidth,
              triggerOffsetTop - overlayHeight,
            );
          }
          break;
        case 'end':
          if (overlayHeight <= blockEndSpace && overlayWidth <= inlineEndSpace) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetLeft + triggerWidth,
              triggerOffsetTop + triggerHeight,
            );
          }
          break;
      }
    }
  }

  private _applyOverlayPosition(position: string, inlineStart: number, blockStart: number): void {
    if (this._lastPosition !== position) {
      this._lastPosition = position;
      this._overlay.style.insetInlineStart = `${inlineStart}px`;
      this._overlay.style.insetBlockStart = `${blockStart}px`;
    }
  }
}
