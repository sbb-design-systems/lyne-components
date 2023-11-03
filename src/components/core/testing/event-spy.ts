/**
 * This class exists to facilitate the E2E tests from stencil to lit.
 * It mimics the API that stencil provided to test events.
 *
 * TODO: Properly implement and document this class
 */
export class EventSpy<T extends Event> {
  private _count: number = 0;
  public get count(): number {
    return this._count;
  }

  private _events: T[] = [];
  public get events(): { length: number } {
    return this._events;
  }

  public get firstEvent(): T {
    return this.events.length ? this.events[0] : null;
  }

  public get lastEvent(): T {
    return this.events.length ? this.events[this.events.length - 1] : null;
  }

  public constructor(
    private _event: string,
    private readonly _target: Node = null,
  ) {
    if (!this._target) {
      this._target = document;
    }
    this._listenForEvent();
  }

  private _listenForEvent(): void {
    this._target.addEventListener(this._event, (ev) => {
      this._events.push(ev as T);
      this._count++;
    });
  }
}
