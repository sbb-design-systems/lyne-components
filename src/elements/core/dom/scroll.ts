export function pageScrollDisabled(): boolean {
  return document.body.hasAttribute('data-sbb-scroll-disabled');
}

/**
 * Handle the page scroll, allowing to disable/enable the window scroll avoiding a potential
 * content shift caused by the disappearance/appearance of the scrollbar.
 */
export class SbbScrollHandler {
  private _height!: string;
  private _overflow!: string;
  private _marginInlineEnd!: string;

  public disableScroll(): void {
    if (pageScrollDisabled()) {
      return;
    }

    // Save any pre-existing styles to reapply them to the body when enabling the scroll again.
    this._height = document.body.style.height;
    this._overflow = document.body.style.overflow;
    this._marginInlineEnd = document.body.style.marginInlineEnd;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.marginInlineEnd = `${scrollbarWidth}px`;
    document.body.style.setProperty('--sbb-scrollbar-width', `${scrollbarWidth}px`);

    document.body.toggleAttribute('data-sbb-scroll-disabled', true);
  }

  public enableScroll(): void {
    if (!pageScrollDisabled()) {
      return;
    }

    // Revert body inline styles.
    document.body.style.height = this._height || '';
    document.body.style.overflow = this._overflow || '';
    document.body.style.marginInlineEnd = this._marginInlineEnd || '';
    document.body.style.setProperty('--sbb-scrollbar-width', '0');

    document.body.removeAttribute('data-sbb-scroll-disabled');
  }
}
