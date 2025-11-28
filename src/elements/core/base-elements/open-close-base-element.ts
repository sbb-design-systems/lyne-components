import { LitElement } from 'lit';

import type { SbbOpenedClosedState } from '../interfaces.ts';
import { SbbElementInternalsMixin } from '../mixins.ts';

/**
 * Base class for overlay components.
 */
export abstract class SbbOpenCloseBaseElement extends SbbElementInternalsMixin(LitElement) {
  public static readonly events = {
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  /** The state of the component. */
  protected set state(state: SbbOpenedClosedState) {
    if (this._state) {
      this.internals.states.delete(`state-${this._state}`);
    }
    this._state = state;
    if (this._state) {
      this.internals.states.add(`state-${this._state}`);
    }
  }
  protected get state(): SbbOpenedClosedState {
    return this._state;
  }
  private _state!: SbbOpenedClosedState;

  /** Whether the element is open. */
  public get isOpen(): boolean {
    return this.state === 'opened';
  }

  public constructor() {
    super();
    this.state = 'closed';
  }

  /** Opens the component. */
  public abstract open(): void;
  /** Closes the component. */
  public abstract close(): void;

  /** The method which is called on escape key press. Defaults to calling close() */
  public escapeStrategy(): void {
    this.close();
  }

  protected dispatchBeforeOpenEvent(): boolean {
    /** Emits whenever the component starts the opening transition. Can be canceled. */
    return this.dispatchEvent(new Event('beforeopen', { cancelable: true }));
  }

  protected dispatchOpenEvent(): boolean {
    /** Emits whenever the component is opened. */
    return this.dispatchEvent(new Event('open'));
  }

  protected dispatchBeforeCloseEvent(): boolean {
    /** Emits whenever the component begins the closing transition. Can be canceled. */
    return this.dispatchEvent(new Event('beforeclose', { cancelable: true }));
  }

  protected dispatchCloseEvent(): boolean {
    /** Emits whenever the component is closed. */
    return this.dispatchEvent(new Event('close'));
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    beforeopen: Event;
    beforeclose: Event;
    open: Event;
    close: Event;
  }
}
