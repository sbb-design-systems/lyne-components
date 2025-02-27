import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.js';

/**
 * The registry is mapped as an array of WeakRef: it has been noticed that changing page
 * nor the `disconnectedCallback` nor other `unload` hooks are triggered,
 * so if the change is done with an opened dialog in the view, its instance is not removed.
 * This way the reference should be removed from the array when the garbage collector acts.
 */
const overlayStack = new Array<WeakRef<SbbOpenCloseBaseElement>>();
const registry = new FinalizationRegistry((element: WeakRef<SbbOpenCloseBaseElement>) => {
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

export class SbbOverlayController implements ReactiveController {
  public constructor(private _host: ReactiveControllerHost & SbbOpenCloseBaseElement) {
    this._host.addController?.(this);
  }

  public hostConnected(): void {
    // nothing
  }

  // This is meant to be called when the overlay is opened
  public connect(): void {
    this._cleanStack();
    const componentWeakRef = new WeakRef(this._host);
    overlayStack.push(componentWeakRef);
    registry.register(this, componentWeakRef);
  }

  // This is meant to be called when the overlay is closed
  public disconnect(): void {
    if (overlayStack.length) {
      overlayStack.pop();
    }
  }

  private _cleanStack(): void {
    overlayStack
      .map((overlay: WeakRef<SbbOpenCloseBaseElement>) => overlay.deref()?.id)
      .forEach((overlayId: string | undefined, index: number) => {
        if (overlayId && !document.getElementById(overlayId)) {
          overlayStack.splice(index, 1);
        }
      });
  }
}
