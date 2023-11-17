const defaultOptions = {
  bubbles: true,
  cancelable: true,
  composed: true,
};

export class EventEmitter<T = any> {
  public constructor(
    private _element: HTMLElement,
    private _eventName: string,
    private _options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean },
  ) {}

  public emit(data?: T): CustomEvent<T> {
    const options = this._options ?? defaultOptions;
    const event = new CustomEvent(this._eventName, Object.assign({}, options, { detail: data }));
    this._element.dispatchEvent?.(event);
    return event;
  }
}
