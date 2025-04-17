import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

/**
 * This controller checks for slotted children. From these it generates
 * a list of used slot names (`unnamed` for children without a slot attribute)
 * and adds this to the `data-slot-names` attribute, as a space separated list.
 *
 * This allows CSS attribute selector to display/hide/configure a section
 * of the component as required (see [attr~=value] selector specifically).
 *
 * @example
 * .example {
 *   display: none;
 *
 *   :host([data-slot-names~="icon"]) & {
 *     display: inline;
 *   }
 * }
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
 */
export class SbbSlotStateController implements ReactiveController {
  public readonly slots = new Set<string>();

  private _textObserver =
    !isServer &&
    new MutationObserver(() => {
      const hasTextNodeContent = Array.from(this._host.childNodes)
        .filter((n) => n.nodeType === n.TEXT_NODE)
        .some((n) => n.textContent?.trim());

      if (hasTextNodeContent) {
        this.slots.add('unnamed');
      } else if (Array.from(this._host.children).every((e) => e.slot)) {
        this.slots.delete('unnamed');
      }
      this._updateSlotNameAttribute();
    });

  public constructor(
    private _host: ReactiveControllerHost & HTMLElement,
    private _onChangeCallback: (() => void) | null = null,
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    this._syncSlots(...(this._host.shadowRoot?.querySelectorAll?.('slot') ?? []));
    this._host.shadowRoot?.addEventListener('slotchange', this._slotchangeHandler);
  }

  public hostDisconnected(): void {
    this._host.shadowRoot?.removeEventListener('slotchange', this._slotchangeHandler);
    this._textObserver.disconnect();
  }

  // We avoid using AbortController here, as it would mean creating
  // a new instance for every SbbSlotStateController instance.
  private _slotchangeHandler = (event: Event): void => {
    this._syncSlots(event.target as HTMLSlotElement);
  };

  private _syncSlots(...slots: HTMLSlotElement[]): void {
    this._textObserver.disconnect();

    for (const slot of slots) {
      const slotName = slot.name || 'unnamed';
      // We want to check, whether an element is slotted or a text node with actual content.
      if (slot.assignedNodes().some((n) => 'tagName' in n || n.textContent?.trim())) {
        this.slots.add(slotName);
      } else {
        this.slots.delete(slotName);
      }
      this._updateSlotNameAttribute();
    }

    // Text nodes can be empty and filled later (or vice versa).
    // Filling an existing node later would not trigger another slotchange event.
    // Therefore, we need to observe text nodes and check if they become filled or empty.
    // This is only needed for the unnamed slot as for every other there would
    // be a tag which triggers the slot change event.
    // The main reason is that Angular creates empty text nodes and fills them later.
    slots
      .find((s) => !s.name)
      ?.assignedNodes()
      .filter((n) => n.nodeType === n.TEXT_NODE)
      .forEach((node) => this._textObserver.observe(node, { characterData: true }));
  }

  private _updateSlotNameAttribute(): void {
    const oldValue = this._host.getAttribute('data-slot-names');
    const joinedSlotNames = [...this.slots].sort().join(' ');
    if (!joinedSlotNames) {
      this._host.removeAttribute('data-slot-names');
    } else if (this._host.getAttribute('data-slot-names') !== joinedSlotNames) {
      this._host.setAttribute('data-slot-names', joinedSlotNames);
    }

    if (joinedSlotNames !== oldValue) {
      this._onChangeCallback?.();
    }
  }
}
