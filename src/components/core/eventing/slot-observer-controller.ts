import { ReactiveController, ReactiveControllerHost } from 'lit';

export class SlotObserverController implements ReactiveController {
  private _abortController: AbortController;

  public constructor(
    protected readonly host: ReactiveControllerHost & Partial<HTMLElement>,
    private _handler: () => void,
  ) {
    this.host.addController(this);
  }

  public hostConnected(): void {
    this._abortController = new AbortController();
    this._handler();
    this.host.shadowRoot?.addEventListener('slotchange', this._handler, {
      signal: this._abortController.signal,
    });
  }

  public hostDisconnected(): void {
    this._abortController?.abort();
  }
}
