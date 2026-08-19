export function pageScrollDisabled(): boolean {
  return document.body.hasAttribute('data-sbb-scroll-disabled');
}

/**
 * Checks whether the given element can be scrolled vertically
 * (i.e. it has an overflow of `auto`/`scroll` and its content overflows its box).
 */
function isVerticallyScrollable(element: Element): boolean {
  const overflowY = getComputedStyle(element).overflowY;
  return (
    (overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight
  );
}

/**
 * Walks the event's composed path (to properly support shadow DOM) and returns the
 * closest scrollable ancestor, if any, stopping at `document.body`/`document.documentElement`.
 */
function findScrollableAncestor(path: EventTarget[]): Element | null {
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
 */
export class SbbScrollHandler {
  private _scrollPosition = 0;
  private _position!: string;
  private _top!: string;
  private _insetInline!: string;
  private _overflow!: string;
  private _touchStartY = 0;

  private _touchStart = (event: TouchEvent): void => {
    this._touchStartY = event.touches[0]?.clientY ?? 0;
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
    const deltaY = touch.clientY - this._touchStartY;
    const atTop = scrollable.scrollTop <= 0;
    const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;
    if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
      event.preventDefault();
    }
  };

  public disableScroll(): void {
    if (pageScrollDisabled()) {
      return;
    }

    // Remember the current scroll position, so it can be restored once the scroll is re-enabled.
    this._scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Save any pre-existing styles to reapply them to the body when enabling the scroll again.
    this._position = document.body.style.position;
    this._top = document.body.style.top;
    this._insetInline = document.body.style.insetInlineStart;
    this._overflow = document.body.style.overflow;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${this._scrollPosition}px`;
    document.body.style.insetInline = `0 ${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    document.body.style.setProperty('--sbb-scrollbar-reserved-space', `${scrollbarWidth}px`);

    // iOS Safari can still allow touch scrolling/rubber-banding in some edge cases even with the
    // styles above, so we additionally intercept touch events as a safety net.
    document.addEventListener('touchstart', this._touchStart, { passive: true });
    document.addEventListener('touchmove', this._touchMove, { passive: false });

    document.body.toggleAttribute('data-sbb-scroll-disabled', true);
  }

  public enableScroll(): void {
    if (!pageScrollDisabled()) {
      return;
    }

    // Revert body inline styles.
    document.body.style.position = this._position || '';
    document.body.style.top = this._top || '';
    document.body.style.insetInline = this._insetInline || '';
    document.body.style.overflow = this._overflow || '';
    document.body.style.removeProperty('--sbb-scrollbar-reserved-space');

    document.removeEventListener('touchstart', this._touchStart);
    document.removeEventListener('touchmove', this._touchMove);

    document.body.removeAttribute('data-sbb-scroll-disabled');

    // Restore the scroll position that was saved before fixing the body.
    window.scrollTo(0, this._scrollPosition);
  }
}
