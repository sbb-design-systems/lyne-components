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
    this._cleanStack();
    this._abortController = new AbortController();
    if (!overlayStack.length) {
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
    overlayStack.push(this);
  }

  /** Closes the component. */
  public close(): void {
    if (overlayStack.length) {
      overlayStack.pop();
      this._abortController.abort();
    }
  }

  private _cleanStack(): void {
    overlayStack
      .map((overlay: SbbOpenCloseEscapableElement) => overlay.id)
      .forEach((overlayId: string, index: number) => {
        if (!document.getElementById(overlayId)) {
          overlayStack.splice(index, 1);
        }
      });
  }
}
