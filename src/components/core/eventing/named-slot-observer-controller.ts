import { ReactiveController, ReactiveControllerHost } from 'lit';

import { SlotObserverController } from './slot-observer-controller';

export class NamedSlotObserverController
  extends SlotObserverController
  implements ReactiveController
{
  private _detectedSlotNames: string[] = [];

  public constructor(
    host: ReactiveControllerHost & Partial<HTMLElement>,
    private _observableSlots: string[],
  ) {
    super(host, () => this._detectSlotNames());
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
    const detectedSlotNames = Array.from(this.host.children ?? [])
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
      this.host.requestUpdate();
    }
  }
}
