import { ReactiveController, ReactiveControllerHost } from 'lit';

import { SlotObserverController } from './slot-observer-controller';

export class NamedSlotObserverController
  extends SlotObserverController
  implements ReactiveController
{
  private _detectedSlotNames: string[] = [];
  private _hasUnnamedSlotContent = false;

  public constructor(
    host: ReactiveControllerHost & Partial<HTMLElement>,
    private _observableSlots: string[],
  ) {
    super(host, () => this._detectChanges());
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

  public hasUnnamed(): boolean {
    return this._hasUnnamedSlotContent;
  }

  private _detectChanges(): void {
    if (this._detectUnnamedSlotContent() || this._detectSlotNames()) {
      this.host.requestUpdate();
    }
  }

  private _detectUnnamedSlotContent(): boolean {
    const hasUnnamedSlotContent = Array.from(this.host.childNodes ?? []).some(
      (n) =>
        (n.nodeType === Node.TEXT_NODE ||
          (n.nodeType === Node.ELEMENT_NODE && !(n as Element).slot)) &&
        !!n.textContent,
    );
    if (this._hasUnnamedSlotContent === hasUnnamedSlotContent) {
      return false;
    }

    this._hasUnnamedSlotContent = hasUnnamedSlotContent;
    return true;
  }

  private _detectSlotNames(): boolean {
    const detectedSlotNames = Array.from(this.host.children ?? [])
      .map((e) => e.slot)
      .filter((v, i, a) => !!v && a.indexOf(v) === i);
    if (!this._detectedSlotNames.length && !detectedSlotNames.length) {
      return false;
    }
    const changedSlotNames = this._detectedSlotNames
      .filter((n) => !detectedSlotNames.includes(n))
      .concat(detectedSlotNames.filter((n) => !this._detectedSlotNames.includes(n)));
    if (!changedSlotNames.length) {
      return false;
    }

    this._detectedSlotNames = detectedSlotNames;
    return this._observableSlots.some((n) => this._detectedSlotNames.includes(n));
  }
}
