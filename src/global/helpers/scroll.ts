/**
 * Handle the page scroll, allowing to disable/enable the window scroll avoiding a potential
 * content shift caused by the disappearance/appearance of the scrollbar.
 */
export class ScrollHandler {
  private _documentScrollTop: number;

  public disableScroll(): void {
    if (!this._hasScrollbar()) {
      document.body.style.overflow = 'hidden';
      return;
    }

    // Save a reference to the document's current vertical scroll.
    this._documentScrollTop = document.documentElement.scrollTop;

    // Set the page as fixed to the top and keep showing an "empty" scrollbar by setting "overflow-y" to "scroll".
    document.body.style.top = `-${this._documentScrollTop}px`;
    document.body.style.position = 'fixed';
    document.body.style.overflowY = 'scroll';
    document.body.style.inlineSize = '100%';
  }

  public enableScroll(): void {
    // Revert body inline styles.
    document.body.style.top = null;
    document.body.style.position = null;
    document.body.style.overflowX = null;
    document.body.style.overflowY = null;
    document.body.style.inlineSize = null;

    // Scroll the page to the correct position.
    document.documentElement.scrollTo(0, this._documentScrollTop);
  }

  private _hasScrollbar(): boolean {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight;
  }
}
