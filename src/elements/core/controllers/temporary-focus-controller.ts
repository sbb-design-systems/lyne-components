import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Temporarily allows focus to be set to an element that does not have a tabindex.
 */
export class SbbTemporaryFocusController implements ReactiveController {
  private _abortController = new AbortController();
  private _host: ReactiveControllerHost & HTMLElement;

  public constructor(host: ReactiveControllerHost & HTMLElement) {
    this._host = host;
    host.addController(this);
    host.tabIndex = -1;
    host.addEventListener('blur', () => this._purge(), {
      once: true,
      signal: this._abortController.signal,
    });
  }

  public hostDisconnected(): void {
    this._abortController.abort();
    this._purge();
  }

  private _purge(): void {
    this._host.removeController(this);
    this._host.removeAttribute('tabindex');
  }
}
