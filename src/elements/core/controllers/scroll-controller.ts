import { type ReactiveController, type ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.ts';

interface ScrollSavedProperties {
  scrollPosition: number;
  savedPosition?: string;
  savedTop?: string;
  savedInsetInline?: string;
  savedOverflow?: string;
  touchStartY: number;
}

export function pageScrollDisabled(): boolean {
  return document.body.hasAttribute('data-sbb-scroll-disabled');
}

/**
 * Checks whether the given element can be scrolled vertically
 * (i.e. it has an overflow of `auto`/`scroll` and its content overflows its box).
 */
export function isVerticallyScrollable(element: Element): boolean {
  const overflowY = getComputedStyle(element).overflowY;
  return (
    (overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight
  );
}

/**
 * Walks the event's composed path (to properly support shadow DOM) and returns the
 * closest scrollable ancestor, if any, stopping at `document.body`/`document.documentElement`.
 */
export function findScrollableAncestor(path: EventTarget[]): Element | null {
  for (const target of path) {
    if (target === document.body || target === document.documentElement) {
      break;
    }
    if (target instanceof Element && isVerticallyScrollable(target)) {
      return target;
    }
  }
  return null;
}

/**
 * Overlays currently holding a scroll lock, shared across all `SbbScrollController` instances.
 * Only the transition 'empty => non-empty' actually disables scroll, and only 'non-empty => empty' restores it,
 * so that closing one overlay never re-enables scroll while another one is still open.
 */
const lockers = new Set<SbbOpenCloseBaseElement>();

/**
 * Handle the page scroll, allowing to disable/enable the window scroll avoiding a potential
 * content shift caused by the disappearance/appearance of the scrollbar.
 *
 * The body is fixed in place (instead of just using `overflow: hidden`), which reliably prevents
 * scrolling of the underlying page. The current scroll position is stored before
 * fixing the body and restored again once the scroll is re-enabled, so the page doesn't jump
 * and content that was previously scrolled out of view isn't hidden behind the fixed body.
 *
 * As an additional safety net for edge cases, `touchmove` events are intercepted and prevented,
 * unless they originate from within a scrollable element that is not at its scroll boundary
 * (e.g. an internal scrollable content of a dialog, navigation, sidebar, etc.).
 *
 * Multiple independent instances (e.g. one per menu/dialog/navigation) can call
 * `disableScroll()`/`enableScroll()` in any nesting order:
 * each holds the lock under its own `owner` reference,
 * so scroll is only re-enabled once every owner that disabled it has re-enabled it again.
 */
export class SbbScrollController implements ReactiveController {
  private _locked = false;
  private _scrollProperties: ScrollSavedProperties = { scrollPosition: 0, touchStartY: 0 };

  public constructor(private _host: ReactiveControllerHost & SbbOpenCloseBaseElement) {
    this._host.addController?.(this);
  }

  public hostDisconnected(): void {
    this.enableScroll();
  }

  public disableScroll(): void {
    // Guard against the same instance calling disableScroll() twice without a matching enableScroll() in between.
    if (this._locked) {
      return;
    }
    this._locked = true;
    const wasEmpty = lockers.size === 0;
    lockers.add(this._host);

    // Another owner already holds the lock: scroll is already disabled, nothing to do.
    if (!wasEmpty) {
      return;
    }

    // Remember the current scroll position, so it can be restored once the scroll is re-enabled.
    this._scrollProperties.scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Save any pre-existing styles to reapply them to the body when enabling the scroll again.
    this._scrollProperties.savedPosition = document.body.style.position;
    this._scrollProperties.savedTop = document.body.style.top;
    this._scrollProperties.savedInsetInline = document.body.style.insetInline;
    this._scrollProperties.savedOverflow = document.body.style.overflow;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${this._scrollProperties.scrollPosition}px`;
    document.body.style.insetInline = `0 ${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    document.body.style.setProperty('--sbb-scrollbar-reserved-space', `${scrollbarWidth}px`);

    // iOS Safari can still allow touch scrolling/rubber-banding in some edge cases even with the
    // styles above, so we additionally intercept touch events as a safety net.
    // Note: `touchmove` listeners on `document`/`window`/`document.body` default to passive:true
    // in some browsers (e.g. Chrome's "scrolling intervention"), which would silently ignore our
    // `event.preventDefault()` call. We explicitly opt out of that by passing `passive: false`.
    document.addEventListener('touchstart', this._touchStart, { passive: true });
    document.addEventListener('touchmove', this._touchMove, { passive: false });

    document.body.toggleAttribute('data-sbb-scroll-disabled', true);
  }

  public enableScroll(): void {
    // Guard against calling enableScroll() without this instance having disabled scroll first.
    if (!this._locked) {
      return;
    }
    this._locked = false;
    lockers.delete(this._host);

    // Another owner still holds the lock: keep scroll disabled.
    if (lockers.size > 0) {
      return;
    }

    // Revert body inline styles.
    document.body.style.position = this._scrollProperties.savedPosition || '';
    document.body.style.top = this._scrollProperties.savedTop || '';
    document.body.style.insetInline = this._scrollProperties.savedInsetInline || '';
    document.body.style.overflow = this._scrollProperties.savedOverflow || '';
    document.body.style.removeProperty('--sbb-scrollbar-reserved-space');

    document.removeEventListener('touchstart', this._touchStart);
    document.removeEventListener('touchmove', this._touchMove);

    document.body.removeAttribute('data-sbb-scroll-disabled');

    // Restore the scroll position that was saved before fixing the body.
    window.scrollTo(0, this._scrollProperties.scrollPosition);
  }

  private _touchStart = (event: TouchEvent): void => {
    this._scrollProperties.touchStartY = event.touches[0]?.clientY ?? 0;
  };

  private _touchMove = (event: TouchEvent): void => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    const scrollable = findScrollableAncestor(event.composedPath());
    if (!scrollable) {
      // The touch did not originate from within a scrollable element: prevent any scroll/bounce
      // of the page behind (e.g. touching a backdrop or non-scrollable overlay content).
      event.preventDefault();
      return;
    }

    // Prevent rubber-banding at the scroll boundaries, which would otherwise bubble up and
    // scroll/bounce the page behind on iOS.
    const deltaY = touch.clientY - this._scrollProperties.touchStartY;
    const atTop = scrollable.scrollTop <= 0;
    const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;
    if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
      event.preventDefault();
    }
  };
}
