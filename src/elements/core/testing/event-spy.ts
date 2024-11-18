type PromiseWithExecutor<T extends Event> = {
  promise: Promise<T>;
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

  private _eventMap = new Map<number, PromiseWithExecutor<T>>();

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
    return this.calledTimes(1, timeout);
  }

  public calledTimes(count: number, timeout = 1000): Promise<T> {
    if (this.count >= count) {
      return Promise.resolve(this.events[count - 1]);
    } else if (this._eventMap.has(count)) {
      return this._wrapPromiseWithTimeout(this._eventMap.get(count)!, count, timeout);
    } else {
      let resolve: (value: T) => void;
      let reject: (reason?: any) => void;
      const promise = new Promise<T>((resolveFunction, rejectFunction) => {
        resolve = resolveFunction;
        reject = rejectFunction;
      });

      const promiseWithExecutor = {
        promise,
        resolve: resolve!,
        reject: reject!,
      };

      this._eventMap.set(count, promiseWithExecutor);

      return this._wrapPromiseWithTimeout(promiseWithExecutor, count, timeout);
    }
  }

  private _wrapPromiseWithTimeout(
    promiseWithExecutor: PromiseWithExecutor<T>,
    count: number,
    timeout: number,
  ): Promise<T> {
    const clearTimeoutId = setTimeout(
      () => promiseWithExecutor.reject(`awaiting calledTimes(${count}) results in timeout`),
      timeout,
    );
    promiseWithExecutor.promise.then(() => clearTimeout(clearTimeoutId));
    return promiseWithExecutor.promise;
  }

  private _listenForEvent(): void {
    this._target?.addEventListener(this._event, (ev) => {
      this._events.push(ev as T);
      this._count++;
      this._eventMap.get(this.count)?.resolve(ev as T);
    });
  }
}
