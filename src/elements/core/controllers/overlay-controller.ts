import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { type SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.js';

const overlayStack = new Array<SbbOpenCloseBaseElement>();

export class SbbOverlayController implements ReactiveController {
  private _abortController: AbortController = new AbortController();

  public constructor(private _host: ReactiveControllerHost & SbbOpenCloseBaseElement) {
    this._host.addController?.(this);
  }

  public hostConnected(): void {
    // FIXME taken from inert-controller
    if (this._host.isOpen) {
      this.connect();
    }
  }

  // This is meant to be called when the overlay is opened
  public connect(): void {
    overlayStack.push(this._host);
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

  // This is meant to be called when the overlay is closed
  public disconnect(): void {
    if (overlayStack.length) {
      overlayStack.pop();
      this._abortController.abort();
    }
  }
}
