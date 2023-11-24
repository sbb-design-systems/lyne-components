import { ReactiveController, ReactiveControllerHost } from 'lit';

export class NamedSlotObserverController implements ReactiveController {
  private _abortController: AbortController;
  private _detectedSlotNames: string[] = [];

  public constructor(
    private _host: ReactiveControllerHost & Partial<HTMLElement>,
    private _observableSlots: string[],
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    this._abortController = new AbortController();
    this._detectSlotNames();
    this._host.shadowRoot?.addEventListener('slotchange', () => this._detectSlotNames(), {
      signal: this._abortController.signal,
    });
  }

  public hostDisconnected(): void {
    this._abortController?.abort();
  }

  public has(name: string): boolean {
    if (!this._observableSlots.includes(name)) {
      // TODO: Should this check be done via linting?
      throw new Error(
        `Slot name ${name} is not being observed. It should be added to observed slots in the constructor!`,
      );
    }
    return this._detectedSlotNames.includes(name);
  }

  private _detectSlotNames(): void {
    const detectedSlotNames = Array.from(this._host.children ?? [])
      .map((e) => e.slot)
      .filter((v, i, a) => !!v && a.indexOf(v) === i);
    if (!this._detectedSlotNames.length && !detectedSlotNames.length) {
      return;
    }
    const changedSlotNames = this._detectedSlotNames
      .filter((n) => !detectedSlotNames.includes(n))
      .concat(detectedSlotNames.filter((n) => !this._detectedSlotNames.includes(n)));
    if (!changedSlotNames.length) {
      return;
    }

    this._detectedSlotNames = detectedSlotNames;
    if (this._observableSlots.some((n) => this._detectedSlotNames.includes(n))) {
      this._host.requestUpdate();
    }
  }
}
