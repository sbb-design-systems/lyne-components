import { LitElement } from 'lit';

import { EventEmitter } from '../eventing.js';
import type { SbbOpenedClosedState } from '../interfaces.js';
import { SbbElementInternalsMixin } from '../mixins.js';

/**
 * Base class for overlay components.
 *
 * @event beforeopen - Emits whenever the component starts the opening transition. Can be canceled.
 * @event open - Emits whenever the component is opened.
 * @event beforeclose - Emits whenever the component begins the closing transition. Can be canceled.
 * @event close - Emits whenever the component is closed.
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
    this.setAttribute('data-state', state);
  }
  protected get state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Whether the element is open. */
  public get isOpen(): boolean {
    return this.state === 'opened';
  }

  /** Emits whenever the component starts the opening transition. */
  protected beforeOpenEmitter: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.beforeopen,
    { cancelable: true },
  );

  /** Emits whenever the component is opened. */
  protected openEmitter: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.open,
    {
      cancelable: true,
    },
  );

  /** Emits whenever the component begins the closing transition. */
  protected beforeCloseEmitter: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.beforeclose,
    { cancelable: true },
  );

  /** Emits whenever the component is closed. */
  protected closeEmitter: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.close,
    { cancelable: true },
  );

  /** Opens the component. */
  public abstract open(): void;
  /** Closes the component. */
  public abstract close(): void;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.state ||= 'closed';
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    beforeopen: CustomEvent<void>;
    beforeclose: CustomEvent<void>;
    open: CustomEvent<void>;
    close: Event;
  }
}
