import { isServer } from 'lit';

import { SbbOpenCloseBaseElement } from './open-close-base-element.js';

const overlayStack = new Array<WeakRef<SbbOpenCloseEscapableElement>>();
const registry = new FinalizationRegistry((element: WeakRef<SbbOpenCloseEscapableElement>) => {
  overlayStack.splice(
    overlayStack.findIndex((e) => e === element),
    1,
  );
});

if (!isServer) {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.preventDefault();
      overlayStack.at(-1)?.deref()?.close();
    }
  });
}

/**
 * Class for overlay components which extends SbbOpenCloseBaseElement
 * and adds the functionality to close the overlay pressing the `Escape` button.
 */
export abstract class SbbOpenCloseEscapableElement extends SbbOpenCloseBaseElement {
  /** Opens the component. */
  public open(): void {
    this._cleanStack();
    const componentWeakRef = new WeakRef(this);
    overlayStack.push(componentWeakRef);
    registry.register(this, componentWeakRef);
  }

  /** Closes the component. */
  public close(): void {
    if (overlayStack.length) {
      overlayStack.pop();
    }
  }

  private _cleanStack(): void {
    overlayStack
      .map((overlay: WeakRef<SbbOpenCloseEscapableElement>) => overlay.deref()?.id)
      .forEach((overlayId: string | undefined, index: number) => {
        if (overlayId && !document.getElementById(overlayId)) {
          overlayStack.splice(index, 1);
        }
      });
  }
}
