import { SbbOpenCloseBaseElement } from './open-close-base-element.js';

const overlayStack = new Array<SbbOpenCloseEscapableElement>();

/**
 * Class for overlay components which extends SbbOpenCloseBaseElement
 * and adds the functionality to close the overlay pressing the `Escape` button.
 */
export abstract class SbbOpenCloseEscapableElement extends SbbOpenCloseBaseElement {
  private _abortController: AbortController = new AbortController();

  /** Opens the component. */
  public open(): void {
    overlayStack.push(this);
    this._abortController = new AbortController();
    window.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.defaultPrevented) {
          event.preventDefault();
          overlayStack.at(-1)?.close();
        }
      },
      { signal: this._abortController.signal },
    );
  }

  /** Closes the component. */
  public close(): void {
    if (overlayStack.length) {
      overlayStack.pop();
      this._abortController.abort();
    }
  }
}
