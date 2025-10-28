import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

export class SbbSlottedChangeEvent extends Event {
  public constructor(public readonly slot: HTMLSlotElement) {
    super('slottedchange', { composed: true });
  }
}

/**
 * This controller checks for slotted children. From these it updates
 * the ElementInternals states with the pattern `slotted-<name>` or `slotted`
 * for the unnamed slot.
 *
 * This allows a :state(slotted-<name>) CSS selector to display/hide/configure
 * a section of the component as required.
 *
 * @example
 * .example {
 *   display: none;
 *
 *   :host(:state(slotted-icon)) & {
 *     display: inline;
 *   }
 * }
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/:state
 */
export class SbbSlotStateController implements ReactiveController {
  private _textObserver =
    !isServer &&
    new MutationObserver(() => {
      const slot = this._host.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])');
      if (slot) {
        this._updateSlottedState(slot);
      } else {
        this._textObserver.disconnect();
      }
    });

  public constructor(
    private _host: ReactiveControllerHost & HTMLElement,
    private _internals: ElementInternals,
  ) {
    this._host.addController(this);
  }

  public hostConnected: ReactiveController['hostConnected'] = (): void => {
    this._host.shadowRoot?.addEventListener('slotchange', (e) =>
      this._slotchangeHandler(e, e.target as HTMLSlotElement),
    );
    this._host.shadowRoot?.addEventListener(
      'slottedchange',
      (e) => this._slotchangeHandler(e, e.slot),
      { capture: true },
    );
    this._internals.shadowRoot
      ?.querySelectorAll('slot')
      .forEach((slot) => this._handleSlotChange(slot));
    this.hostConnected = undefined;
  };

  private _slotchangeHandler(event: Event, slot: HTMLSlotElement): void {
    const resolvedSlot = this._host.shadowRoot!.contains(slot)
      ? slot
      : event
          .composedPath()
          .find(
            (el): el is HTMLSlotElement =>
              el instanceof HTMLSlotElement && this._host.shadowRoot!.contains(el),
          );
    if (resolvedSlot) {
      this._handleSlotChange(resolvedSlot);
    }
  }

  private _handleSlotChange(slot: HTMLSlotElement): void {
    this._updateSlottedState(slot);
    if (!slot.name) {
      this._observeTextNodesInSlot(slot);
    }
  }

  private _updateSlottedState(slot: HTMLSlotElement): void {
    const stateName = slot.name ? `slotted-${slot.name}` : 'slotted';
    const hasSlottedContent = this._hasSlottedContent(slot);
    if (hasSlottedContent && !this._internals.states.has(stateName)) {
      this._internals.states.add(stateName);
      this._host.dispatchEvent(new SbbSlottedChangeEvent(slot));
    } else if (!hasSlottedContent && this._internals.states.has(stateName)) {
      this._internals.states.delete(stateName);
      this._host.dispatchEvent(new SbbSlottedChangeEvent(slot));
    }
  }

  private _observeTextNodesInSlot(slot: HTMLSlotElement): void {
    this._textObserver.disconnect();
    // Text nodes can be empty and filled later (or vice versa).
    // Filling an existing node later would not trigger another slotchange event.
    // Therefore, we need to observe text nodes and check if they become filled or empty.
    // This is only needed for the unnamed slot as for every other there would
    // be a tag which triggers the slot change event.
    // The main reason is that Angular creates empty text nodes and fills them later.
    slot
      .assignedNodes()
      .filter((n) => n.nodeType === n.TEXT_NODE)
      .forEach((node) => this._textObserver.observe(node, { characterData: true }));
  }

  private _hasSlottedContent(slot: HTMLSlotElement): boolean {
    return slot.name
      ? slot
          .assignedElements()
          .some((node) => !(node instanceof HTMLSlotElement) || this._hasSlottedContent(node))
      : slot.assignedNodes().some((node) => {
          return node instanceof HTMLSlotElement
            ? this._hasSlottedContent(node)
            : node.nodeType !== node.TEXT_NODE || !!node.textContent?.trim();
        });
  }
}

declare global {
  interface HTMLElementEventMap {
    slottedchange: SbbSlottedChangeEvent;
  }
  interface ShadowRootEventMap {
    slottedchange: SbbSlottedChangeEvent;
  }
}
