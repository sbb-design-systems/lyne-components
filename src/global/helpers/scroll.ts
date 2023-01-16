/**
 * Handle the page scroll, allowing to disable/enable the window scroll avoiding a potential
 * content shift caused by the disappearance/appearance of the scrollbar.
 */
export class ScrollHandler {
  private _documentScrollTop: number;
  private _top: string;
  private _position: string;
  private _overflowY: string;
  private _inlineSize: string;

  public disableScroll(): void {
    if (!this._hasScrollbar()) {
      document.body.style.overflowY = 'hidden';
      return;
    }

    // Save a reference to the document's current vertical scroll.
    this._documentScrollTop = document.documentElement.scrollTop;

    // Save any pre-existing styles to reapply them to the body when enabling the scroll again.
    this._top = document.body.style.top;
    this._position = document.body.style.position;
    this._overflowY = document.body.style.overflowY;
    this._inlineSize = document.body.style.inlineSize;

    // Set the page as fixed to the top and keep showing an "empty" scrollbar by setting "overflow-y" to "scroll".
    document.body.style.top = `-${this._documentScrollTop}px`;
    document.body.style.position = 'fixed';
    document.body.style.overflowY = 'scroll';
    document.body.style.inlineSize = this._inlineSize || '100%';
  }

  public enableScroll(): void {
    // Revert body inline styles.
    document.body.style.top = this._top || null;
    document.body.style.position = this._position || null;
    document.body.style.overflowY = this._overflowY || null;
    document.body.style.inlineSize = this._inlineSize || null;

    // Scroll the page to the correct position.
    document.documentElement.scrollTo(0, this._documentScrollTop);
  }

  private _hasScrollbar(): boolean {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight;
  }
}
