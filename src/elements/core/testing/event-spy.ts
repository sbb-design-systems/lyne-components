/**
 * This class exists to facilitate the test migration from stencil to lit.
 * It mimics the API that stencil provided to test events.
 */
export class EventSpy<T extends Event> {
  private _count: number = 0;
  public get count(): number {
    return this._count;
  }

  private _events: T[] = [];
  public get events(): T[] {
    return this._events;
  }

  public get firstEvent(): T | null {
    return this.events.length ? this.events[0] : null;
  }

  public get lastEvent(): T | null {
    return this.events.length ? this.events[this.events.length - 1] : null;
  }

  private _calledOnceExecutor!: { resolve: (value: T) => void; reject: (reason?: any) => void };
  private _calledTwiceExecutor!: { resolve: (value: T) => void; reject: (reason?: any) => void };
  private _calledTriceExecutor!: { resolve: (value: T) => void; reject: (reason?: any) => void };

  private _calledOnce = new Promise<T>(
    (resolve, reject) => (this._calledOnceExecutor = { resolve, reject }),
  );
  private _calledTwice = new Promise<T>(
    (resolve, reject) => (this._calledTwiceExecutor = { resolve, reject }),
  );
  private _calledTrice = new Promise<T>(
    (resolve, reject) => (this._calledTriceExecutor = { resolve, reject }),
  );

  public constructor(
    private _event: string,
    private readonly _target: Node | null = null,
  ) {
    if (!this._target) {
      this._target = document;
    }

    this._listenForEvent();
  }

  public calledOnce(timeout = 1000): Promise<T> {
    const clearTimeoutId = setTimeout(
      () => this._calledOnceExecutor.reject('awaiting calledOnce timeout'),
      timeout,
    );
    this._calledOnce.then(() => clearTimeout(clearTimeoutId));
    return this._calledOnce;
  }

  public calledTwice(timeout = 1000): Promise<T> {
    const clearTimeoutId = setTimeout(
      () => this._calledTwiceExecutor.reject('awaiting calledTwice timeout'),
      timeout,
    );
    this._calledTwice.then(() => clearTimeout(clearTimeoutId));
    return this._calledTwice;
  }

  public calledTrice(timeout = 1000): Promise<T> {
    const clearTimeoutId = setTimeout(
      () => this._calledTriceExecutor.reject('awaiting calledTrice timeout'),
      timeout,
    );
    this._calledTrice.then(() => clearTimeout(clearTimeoutId));
    return this._calledTrice;
  }

  private _listenForEvent(): void {
    this._target?.addEventListener(this._event, (ev) => {
      this._events.push(ev as T);
      this._count++;
      if (this._count === 1) {
        this._calledOnceExecutor.resolve(ev as T);
      } else if (this._count === 2) {
        this._calledTwiceExecutor.resolve(ev as T);
      } else if (this._count === 3) {
        this._calledTriceExecutor.resolve(ev as T);
      }
    });
  }
}
