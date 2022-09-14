/**
 * Class to annotate slotted elements with the data-slot-context attribute.
 */
export class SlotMarker {
  private _history = new WeakMap<Node, { mark: string; elements: Element[] }>();

  /**
   * @param _markerFactory Factory function to append to the marker.
   */
  public constructor(private _markerFactory?: () => string | void) {}

  /**
   * Mark slotted elements of the given slot element/event.
   * Combines the element name of the host and the slot name, optionally appended
   * with the result of the marker factory.
   */
  public mark = (origin: Event | HTMLSlotElement): void => {
    const slot: HTMLSlotElement =
      origin instanceof HTMLSlotElement
        ? origin
        : (origin.target as HTMLSlotElement) ?? (origin.composedPath()[0] as HTMLSlotElement);
    if (!slot) {
      return;
    }

    const entry = this._history.get(slot);
    if (entry) {
      this._unmarkElements(entry.elements);
    }

    const markAppendage = this._markerFactory?.();
    const mark = `${(slot.getRootNode() as ShadowRoot).host.tagName.toLowerCase()}${
      slot.name ? `/${slot.name}` : ''
    }${markAppendage ? `/${markAppendage}` : ''}`;

    const elements = slot.assignedElements();
    if (!elements) {
      return;
    }

    for (const element of elements) {
      if (element instanceof HTMLElement) {
        element.dataset.slotContext = mark;
      }
    }
    this._history.set(slot, { elements, mark });
  };

  /**
   * Apply marker to slotted elements and add event listener to the inner shadow root of the given
   * element, to mark slotted elements on slot change.
   * @param element The element to add the event listener to.
   */
  public connect(element: HTMLElement): void {
    element.shadowRoot?.addEventListener('slotchange', this.mark);
    element.shadowRoot?.querySelectorAll('slot').forEach((s) => this.mark(s));
  }

  /**
   * Removes the marker from the slotted elements and removes the event listener from the inner
   * shadow root.
   * @param element The element to remove the event listener from.
   */
  public disconnect(element: HTMLElement): void {
    element.shadowRoot?.removeEventListener('slotchange', this.mark);
    element.shadowRoot?.querySelectorAll('slot').forEach((s) => this.unmark(s));
  }

  /**
   * Removes the marker fro the slotted elements of the given slot.
   * @param slot The slot whose slotted elements should have the marker removed.
   */
  public unmark(slot: HTMLSlotElement): void {
    const entry = this._history.get(slot);
    if (!entry?.elements) {
      return;
    }
    this._history.delete(slot);
    this._unmarkElements(entry.elements);
  }

  private _unmarkElements(elements: Element[]): void {
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        delete element.dataset.slotContext;
      }
    }
  }
}
