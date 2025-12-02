import {
  type ReactiveControllerHost,
  type LitElement,
  type ReactiveController,
  isServer,
} from 'lit';

type PropertyWatcherHandler<T extends LitElement> = (reference: T) => void;

class PropertyWatcher<T extends LitElement> implements ReactiveController {
  private _value: unknown;
  private _handlers = new Set<PropertyWatcherHandler<T>>();
  private _hostDefinedPromise: Promise<void> | null = null;

  public get size(): number {
    return this._handlers.size;
  }

  public constructor(
    private readonly _host: T,
    private readonly _property: string,
  ) {
    if (!isServer) {
      if (customElements.get(this._host.localName)) {
        customElements.upgrade(this._host);
      } else {
        // The host element is not yet defined, wait for its definition before upgrading
        this._hostDefinedPromise = customElements.whenDefined(this._host.localName).then(() => {
          customElements.upgrade(this._host);
          this._hostDefinedPromise = null;
        });
      }
    }
    this._value = (this._host as unknown as Record<string, unknown>)[this._property];
  }

  public addHandler(handler: PropertyWatcherHandler<T>): void {
    if (!this._handlers.size) {
      // We check if the addController method is available (element was defined && upgraded), otherwise we wait for the host to be defined
      if (this._host.addController) {
        this._host.addController(this);
      } else if (this._hostDefinedPromise) {
        this._hostDefinedPromise.then(() => this._host.addController(this));
      }
    }
    this._handlers.add(handler);

    if (!this._hostDefinedPromise) {
      handler(this._host);
    } else {
      this._hostDefinedPromise.then(() => handler(this._host));
    }
  }

  public removeHandler(handler: PropertyWatcherHandler<T>): void {
    this._handlers.delete(handler);
    if (!this._handlers.size) {
      // We check if the removeController method is available (element was defined && upgraded), otherwise we wait for the host to be defined
      if (this._host.removeController) {
        this._host.removeController(this);
      } else if (this._hostDefinedPromise) {
        this._hostDefinedPromise.then(() => this._host.removeController(this));
      }
    }
  }

  public hostUpdate(): void {
    const currentValue = (this._host as unknown as Record<string, unknown>)[this._property];
    if (this._value !== currentValue) {
      this._value = currentValue;
      for (const handler of this._handlers) {
        handler(this._host);
      }
    }
  }
}

const propertyWatchers = new WeakMap<LitElement, Map<string, PropertyWatcher<any>>>();

export class SbbPropertyWatcherController<T extends LitElement> implements ReactiveController {
  private _reference?: T | null;
  private _watchers?: Map<string, PropertyWatcher<T>>;

  public constructor(
    private readonly _host: ReactiveControllerHost & HTMLElement,
    private readonly _referenceResolver: () => T | null,
    private readonly _handlers: Partial<Record<keyof T, PropertyWatcherHandler<T>>>,
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    this.connect();
  }

  public hostDisconnected(): void {
    if (this._reference !== this._referenceResolver()) {
      this.disconnect();
    }
  }

  public connect(): void {
    const reference = this._referenceResolver();
    if (this._reference === reference) {
      return;
    }
    this.disconnect();
    this._reference = reference;
    if (!this._reference) {
      return;
    }
    let watchers = propertyWatchers.get(this._reference) as
      | Map<string, PropertyWatcher<T>>
      | undefined;
    if (!watchers) {
      watchers = new Map();
      propertyWatchers.set(this._reference, watchers);
    }
    this._watchers = watchers;

    for (const [property, handler] of Object.entries(this._handlers)) {
      let watcher = this._watchers.get(property);
      if (!watcher) {
        watcher = new PropertyWatcher<T>(this._reference, property);
        this._watchers.set(property, watcher);
      }
      watcher.addHandler(handler);
    }
  }

  public disconnect(): void {
    if (!this._reference) {
      return;
    }

    for (const [property, handler] of Object.entries(this._handlers)) {
      const watcher = this._watchers?.get(property);
      if (watcher) {
        watcher.removeHandler(handler);
        if (!watcher.size) {
          this._watchers!.delete(property);
          if (!this._watchers!.size && this._reference) {
            propertyWatchers.delete(this._reference);
          }
        }
      }
    }
    this._reference = null;
  }
}
