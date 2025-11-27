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
    ['state-opened', 'state-closed', 'state-closing', 'state-opening'].forEach((s) =>
      this.internals.states.delete(s),
    );
    this.internals.states.add(`state-${state}`);
  }
  protected get state(): SbbOpenedClosedState {
    return (
      (Array.from(this.internals.states)
        .find((s) => s.startsWith('state-'))
        ?.replace('state-', '') as SbbOpenedClosedState) ?? 'closed'
    );
  }

  /** Whether the element is open. */
  public get isOpen(): boolean {
    return this.state === 'opened';
  }

  public constructor() {
    super();

    // We need to make sure that the initial state is set to 'closed', if not defined externally.
    if (this.state === 'closed') {
      this.state = 'closed';
    }
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
