function findSlots(element: HTMLElement): (Partial<HTMLSlotElement> & HTMLSlotElement)[] {
  return Array.from(element.shadowRoot.querySelectorAll('slot'));
}

/**
 * Stencil.js does not support slotchange events in its unit test (spec.ts) environment
 * (See https://github.com/ionic-team/stencil/issues/3536). This function triggers a slotchange
 * event, if anything is slotted.
 * @param element The host element.
 */
export function triggerSlotchangeEvent(element: HTMLElement): void {
  if (!element.shadowRoot) {
    throw new Error(`No shadowRoot attached to ${element.tagName}`);
  }
  for (const slot of findSlots(element).filter((s) => s.assignedNodes().length)) {
    slot.dispatchEvent(new Event('slotchange', { bubbles: true, cancelable: true }));
  }
}

/**
 * Stencil.js does not support slotchange events in its unit test (spec.ts) environment
 * (See https://github.com/ionic-team/stencil/issues/3536). This function
 * patches the slot elements with the assignedElements and assignedNodes methods
 * and triggers a slotchange event, if anything is slotted.
 * @param element The host element.
 */
export function patchSlotchangeEvent(element: HTMLElement): void {
  if (!element.shadowRoot) {
    throw new Error(`No shadowRoot attached to ${element.tagName}`);
  }

  findSlots(element).forEach((slot) => {
    Object.assign(slot, {
      assignedElements(options?: AssignedNodesOptions): Element[] {
        if (options?.flatten) {
          throw new Error(`flatten is not supported by this patch!`);
        }

        const name = this.getAttribute('name');
        return Array.from(element.children).filter((e) => e.getAttribute('slot') === name);
      },
      assignedNodes(options?: AssignedNodesOptions): Node[] {
        if (options?.flatten) {
          throw new Error(`flatten is not supported by this patch!`);
        }

        const name = this.getAttribute('name');
        const filter =
          name === null
            ? (e: Node | Element) => !('getAttribute' in e) || e.getAttribute('slot') === name
            : (e: Node | Element) => 'getAttribute' in e && e.getAttribute('slot') === name;
        return Array.from(element.childNodes).filter(filter);
      },
    } as Partial<HTMLSlotElement>);
  });
  triggerSlotchangeEvent(element);
}
