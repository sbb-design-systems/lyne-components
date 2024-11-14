type PromiseExecutorHolder<T extends Event> = {
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
};

/**
 * This class exists to facilitate the test migration from stencil to lit.
 * It mimics the API that stencil provided to test events.
 */
export class EventSpy<T extends Event> {
  public get count(): number {
    return this._count;
  }
  private _count: number = 0;

  public get events(): T[] {
    return this._events;
  }
  private _events: T[] = [];

  public get firstEvent(): T | null {
    return this.events.length ? this.events[0] : null;
  }

  public get lastEvent(): T | null {
    return this.events.length ? this.events[this.events.length - 1] : null;
  }

  private _calledOnceExecutor!: PromiseExecutorHolder<T>;
  private _calledTwiceExecutor!: PromiseExecutorHolder<T>;
  private _calledTriceExecutor!: PromiseExecutorHolder<T>;

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
    return this._wrapPromiseWithTimeout(
      timeout,
      'calledOnce',
      this._calledOnce,
      this._calledOnceExecutor,
    );
  }

  public calledTwice(timeout = 1000): Promise<T> {
    return this._wrapPromiseWithTimeout(
      timeout,
      'calledTwice',
      this._calledTwice,
      this._calledTwiceExecutor,
    );
  }

  public calledTrice(timeout = 1000): Promise<T> {
    return this._wrapPromiseWithTimeout(
      timeout,
      'calledTrice',
      this._calledTrice,
      this._calledTriceExecutor,
    );
  }

  private _wrapPromiseWithTimeout(
    timeout: number,
    name: string,
    promise: Promise<T>,
    executor: PromiseExecutorHolder<T>,
  ): Promise<T> {
    const clearTimeoutId = setTimeout(() => {
      console.trace();
      executor.reject(`awaiting ${name} results in timeout`);
    }, timeout);
    promise.then(() => clearTimeout(clearTimeoutId));
    return promise;
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
