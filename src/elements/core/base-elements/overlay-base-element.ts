import { LitElement } from 'lit';

import { EventEmitter } from '../eventing.js';
import type { SbbOpenedClosedState } from '../interfaces.js';

/** Base class for overlay components. */
export abstract class SbbOverlayBaseElement extends LitElement {
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** The state of the component. */
  protected set state(state: SbbOpenedClosedState) {
    this.setAttribute('data-state', state);
  }
  protected get state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Emits whenever the component starts the opening transition. */
  protected willOpen: EventEmitter = new EventEmitter(this, SbbOverlayBaseElement.events.willOpen);

  /** Emits whenever the component is opened. */
  protected didOpen: EventEmitter = new EventEmitter(this, SbbOverlayBaseElement.events.didOpen);

  /** Emits whenever the component begins the closing transition. */
  protected willClose: EventEmitter = new EventEmitter(
    this,
    SbbOverlayBaseElement.events.willClose,
  );

  /** Emits whenever the component is closed. */
  protected didClose: EventEmitter = new EventEmitter(this, SbbOverlayBaseElement.events.didClose);

  /** Opens the component. */
  public abstract open(): void;
  /** Closes the component. */
  public abstract close(): void;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.state ||= 'closed';
  }
}
