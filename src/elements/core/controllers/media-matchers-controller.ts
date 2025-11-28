import {
  SbbBreakpointLargeMax,
  SbbBreakpointLargeMin,
  SbbBreakpointSmallMax,
  SbbBreakpointSmallMin,
  SbbBreakpointUltraMin,
  SbbBreakpointZeroMin,
} from '@sbb-esta/lyne-design-tokens';
import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

import { ɵstateController } from '../mixins/element-internals-mixin.ts';
import type { SbbElementInternalsMixinType } from '../mixins.ts';

/* eslint-disable @typescript-eslint/naming-convention */
export const SbbMediaQueryForcedColors = '(forced-colors: active)';
export const SbbMediaQueryDarkMode = '(prefers-color-scheme: dark)';
export const SbbMediaQueryHover = '(any-hover: hover)';
export const SbbMediaQueryPointerCoarse = '(pointer: coarse)';
export const SbbMediaQueryBreakpointZeroAndAbove = `(min-width: ${SbbBreakpointZeroMin})`;
export const SbbMediaQueryBreakpointSmallAndAbove = `(min-width: ${SbbBreakpointSmallMin})`;
export const SbbMediaQueryBreakpointLargeAndAbove = `(min-width: ${SbbBreakpointLargeMin})`;
export const SbbMediaQueryBreakpointUltraAndAbove = `(min-width: ${SbbBreakpointUltraMin})`;
export const SbbMediaQueryBreakpointSmallAndBelow = `(max-width: ${SbbBreakpointSmallMax})`;
export const SbbMediaQueryBreakpointLargeAndBelow = `(max-width: ${SbbBreakpointLargeMax})`;
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * A callback, which is invoked when the associated media query match
 * status changes.
 */
export type SbbMediaMatcherHandler = (matches: boolean) => void;

interface MediaQueryEntry {
  mediaQueryList: MediaQueryList;
  eventHandler: (event: MediaQueryListEvent) => void;
  handlers: Set<SbbMediaMatcherHandler>;
}

/**
 * We want to cache MediaQueryList instances and corresponding
 * event handlers, as a multitude of event handlers on global objects
 * can degrade performance with time.
 */
const mediaQueryRegistry = new Map<string, MediaQueryEntry>();

/**
 * This controller allows listening to media query changes.
 *
 * @example
 * new SbbMediaMatcherController(this, {
 *   [SbbForcedColorsQuery]: (matches) => doSomething(matches),
 * })
 */
export class SbbMediaMatcherController implements ReactiveController {
  public constructor(
    host: ReactiveControllerHost,
    private _queries: Record<string, SbbMediaMatcherHandler>,
  ) {
    host.addController(this);
  }

  /**
   * Returns whether the given query matches. Returns null with SSR.
   * @param query The query to check against.
   * @returns Whether the query matches or null with SSR.
   */
  public matches(query: string): boolean | null {
    // If we use the cached instance, Webkit seems to update the state a tick too late.
    // Due to this we directly use matchMedia here.
    return isServer ? null : matchMedia(query).matches;
  }

  public hostConnected(): void {
    if (isServer) {
      return;
    }

    for (const [query, handler] of Object.entries(this._queries)) {
      const mediaQuery = mediaQueryRegistry.get(query);
      if (mediaQuery) {
        mediaQuery.handlers.add(handler);
      } else {
        const mediaQueryList = matchMedia(query);
        const handlers = new Set([handler]);
        const eventHandler = (e: MediaQueryListEvent): void =>
          handlers.forEach((h) => h(e.matches));
        mediaQueryList.addEventListener('change', eventHandler);
        mediaQueryRegistry.set(query, { mediaQueryList, handlers, eventHandler });
      }
    }
  }

  public hostDisconnected(): void {
    for (const [query, handler] of Object.entries(this._queries)) {
      const mediaQuery = mediaQueryRegistry.get(query);
      if (mediaQuery) {
        mediaQuery.handlers.delete(handler);
        if (!mediaQuery.handlers.size) {
          mediaQueryRegistry.delete(query);
        }
      }
    }
  }
}

/**
 * A specialized version of the SbbMediaMatcherController, which
 * takes the color-scheme CSS property into account when determining
 * the dark mode state and updates a :state(dark) on the host.
 *
 * @example
 * new SbbDarkModeController(this, (isDarkMode) => doSomething(isDarkMode));
 */
export class SbbDarkModeController extends SbbMediaMatcherController {
  /** The current mode based on the class attribute of the <html> element. */
  private static _currentMode: 'sbb-light-dark' | 'sbb-light' | 'sbb-dark' | null =
    this._readLightDarkClass();

  /** MutationObserver that observes the "class" attribute of the <html> element. */
  private static readonly _observer = !isServer
    ? new MutationObserver((mutations) => {
        if (mutations[0].oldValue !== document.documentElement.getAttribute('class')) {
          const newMode = this._readLightDarkClass();
          if (this._currentMode !== newMode) {
            SbbDarkModeController.requestUpdate();
            this._currentMode = newMode;
          }
        }
      })
    : null;

  private static readonly _observerConfig = {
    attributeFilter: ['class'],
    attributeOldValue: true,
  };

  private readonly _onChangeWithStateUpdater: () => void;

  public constructor(
    private _host: ReactiveControllerHost & HTMLElement & SbbElementInternalsMixinType,
    onChange: SbbMediaMatcherHandler,
  ) {
    const onChangeWithStateUpdater: () => void = () => {
      onChange(this.matches());
      ɵstateController(this._host).toggle('dark', this.matches());
    };
    super(_host, {
      [SbbMediaQueryDarkMode]: onChangeWithStateUpdater,
    });
    this._onChangeWithStateUpdater = onChangeWithStateUpdater;
  }

  private static _readLightDarkClass(): 'sbb-light-dark' | 'sbb-light' | 'sbb-dark' | null {
    if (isServer) {
      return null;
    }
    const classList = document.documentElement.classList;
    return (
      (['sbb-light-dark', 'sbb-dark', 'sbb-light'] as const).find((mode) =>
        classList.contains(mode),
      ) ?? null
    );
  }

  /**
   * Requests an update of the dark mode state. This is needed when the color-scheme
   * CSS property changes, as the media query does not pick this up automatically.
   */
  // eslint-disable-next-line lyne/needs-super-call-rule
  public static requestUpdate(): void {
    const entry = mediaQueryRegistry.get(SbbMediaQueryDarkMode);
    if (entry) {
      entry.handlers.forEach((h) => h(entry.mediaQueryList.matches));
    }
  }

  public override hostConnected(): void {
    const isFirstListener =
      (mediaQueryRegistry.get(SbbMediaQueryDarkMode)?.handlers.size ?? 0) === 0;
    super.hostConnected();

    if (isFirstListener) {
      SbbDarkModeController._observer!.observe(
        document.documentElement,
        SbbDarkModeController._observerConfig,
      );
    }

    this._onChangeWithStateUpdater();
  }

  public override hostDisconnected(): void {
    super.hostDisconnected();

    if ((mediaQueryRegistry.get(SbbMediaQueryDarkMode)?.handlers.size ?? 0) === 0) {
      SbbDarkModeController._observer!.disconnect();
    }
  }

  public override matches(): boolean {
    if (isServer) {
      return false;
    }
    const colorScheme = getComputedStyle(this._host).getPropertyValue('color-scheme');
    const darkAvailable = colorScheme.includes('dark');
    const darkOnly = colorScheme.trim() === 'dark';
    const preferredDarkMode = super.matches(SbbMediaQueryDarkMode) as boolean;

    return (preferredDarkMode && darkAvailable) || darkOnly;
  }
}
