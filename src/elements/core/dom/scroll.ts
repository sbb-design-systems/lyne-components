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
 * On iOS, `overflow: hidden` on the body is not enough to prevent scrolling/rubber-banding
 * of the underlying page, so `touchmove` events are additionally intercepted and prevented,
 * unless they originate from within a scrollable element that is not at its scroll boundary
 * (e.g. an internal scrollable content of a dialog, navigation, sidebar, etc.).
 */
export class SbbScrollHandler {
  private _height!: string;
  private _position!: string;
  private _overflow!: string;
  private _marginInlineEnd!: string;
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

    // Save any pre-existing styles to reapply them to the body when enabling the scroll again.
    this._height = document.body.style.height;
    this._position = document.body.style.position;
    this._overflow = document.body.style.overflow;
    this._marginInlineEnd = document.body.style.marginInlineEnd;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
    document.body.style.position = 'relative';
    document.body.style.marginInlineEnd = `${scrollbarWidth}px`;
    document.body.style.setProperty('--sbb-scrollbar-width', `${scrollbarWidth}px`);

    // iOS Safari still allows touch scrolling/rubber-banding of the body even with the styles
    // above, so we need to explicitly intercept touch events to fully prevent it.
    document.addEventListener('touchstart', this._touchStart, { passive: true });
    document.addEventListener('touchmove', this._touchMove, { passive: false });

    document.body.toggleAttribute('data-sbb-scroll-disabled', true);
  }

  public enableScroll(): void {
    if (!pageScrollDisabled()) {
      return;
    }

    // Revert body inline styles.
    document.body.style.height = this._height || '';
    document.body.style.position = this._position || '';
    document.body.style.overflow = this._overflow || '';
    document.body.style.marginInlineEnd = this._marginInlineEnd || '';
    document.body.style.setProperty('--sbb-scrollbar-width', '0');

    document.removeEventListener('touchstart', this._touchStart);
    document.removeEventListener('touchmove', this._touchMove);

    document.body.removeAttribute('data-sbb-scroll-disabled');
  }
}
