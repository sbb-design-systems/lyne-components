import { AgnosticMutationObserver } from './mutation-observer';

const extractSlotNames = (nodeLists: NodeList[], slotNames = new Set<string>()): Set<string> => {
  for (const nodeList of nodeLists) {
    nodeList.forEach((node) => {
      const slotName = (node as Element).getAttribute?.('slot');
      if (slotName) {
        slotNames.add(slotName);
      }
    });
  }

  return slotNames;
};

const observer = new AgnosticMutationObserver((mutations) => {
  const mutationMap = mutations.reduce(
    (map, mutation) =>
      map.set(
        mutation.target,
        extractSlotNames([mutation.addedNodes, mutation.removedNodes], map.get(mutation.target))
      ),
    new Map<Node, Set<string>>()
  );
  mutationMap.forEach((slotNames, host) => {
    if (slotNames.size) {
      host.dispatchEvent(new CustomEvent('◬slotNameChange', { detail: slotNames }));
    }
  });
});

/**
 * Observes a host element for changes in light DOM children.
 *
 * Only a single mutation observer is used for this purpose, as it is the most performant option.
 * https://www.peterkroener.de/100000-mutationobserver-vs-100000-funktionen/
 *
 * Calling observe on the same node multiple times has no observable negative performance impact
 * and observed nodes can still be garbage collected.
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect#usage_notes
 *
 * @example
 * ```
 * private _hasTitle = false;
 *
 * @Element() private _element: HTMLElement;
 *
 * public connectedCallback(): void {
 *   this._hasTitle = !!this._element.query
 *   observeNamedSlotChanges(this._element);
 * }
 *
 * @Listen('◬slotNameChange', { passive: true })
 * public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
 *   console.log(Date.now(), event);
 * }
 * ```
 *
 * @param element The host element to observe.
 */
export function observeNamedSlotChanges(element: Element): void {
  // We only observe the child list of the host element, both for performance and to reduce
  // complexity. If we were to observe the slot attribute of the children, this could only be done
  // via subtree (which includes host and children of children), which would make it more difficult
  // to differentiate between intended observed element and potentially other ancestors or
  // descendents that are observed as well.
  // This means that changes to the slot attribute of children would not be detected.
  observer.observe(element, { childList: true });
}

/**
 * Checks whether an element with the given slot attribute name exists as a child of the given
 * element.
 *
 * @param element The host element.
 * @param name The name of the slot.
 * @returns Whether an element with the given slot attribute name exists.
 */
export function hasNamedSlotElement(element: Element, name: string): boolean {
  return !!element.querySelector(`[slot="${name}"]`);
}
