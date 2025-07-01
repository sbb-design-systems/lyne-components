import { LitElement } from 'lit';

import type { SbbOpenedClosedState } from '../interfaces.js';
import { SbbElementInternalsMixin } from '../mixins.js';

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
    this.setAttribute('data-state', state);
  }
  protected get state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Whether the element is open. */
  public get isOpen(): boolean {
    return this.state === 'opened';
  }

  /** Opens the component. */
  public abstract open(): void;
  /** Closes the component. */
  public abstract close(): void;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.state ||= 'closed';
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
