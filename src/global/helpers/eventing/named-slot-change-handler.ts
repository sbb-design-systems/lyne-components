import { AgnosticMutationObserver } from '../mutation-observer';
import { HandlerAspect } from './handler-repository';

export const sbbNamedSlotChangeEventName = 'sbbNamedSlotChange';
export type SbbNamedSlotChangeEvent = CustomEvent<Set<string>>;
export interface SbbNamedSlotChangeCallback {
  (merger: <S extends NamedSlotState>(state: S) => S): void;
}

declare global {
  interface HTMLElementEventMap {
    [sbbNamedSlotChangeEventName]: SbbNamedSlotChangeEvent;
  }
}

function extractSlotNames(nodeLists: NodeList[], slotNames = new Set<string>()): Set<string> {
  for (const nodeList of nodeLists) {
    nodeList.forEach((node) => {
      const slotName = (node as Element).getAttribute?.('slot');
      if (slotName) {
        slotNames.add(slotName);
      }
    });
  }

  return slotNames;
}

const observer = new AgnosticMutationObserver((mutations) => {
  // Aggregate multiple mutations to the corresponding target.
  // This prevents the sbbNamedSlotChange to be triggered multiple times for the same target.
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
      host.dispatchEvent(new CustomEvent('sbbNamedSlotChange', { detail: slotNames }));
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
 * @param element The host element to observe.
 */
function observeNamedSlotChanges(element: Element): void {
  // We only observe the child list of the host element, both for performance and to reduce
  // complexity. If we were to observe the slot attribute of the children, this could only be done
  // via subtree (which includes host and children of children), which would make it more difficult
  // to differentiate between intended observed element and potentially other ancestors or
  // descendents that are observed as well.
  // This means that changes to the slot attribute of children would not be detected.
  observer.observe(element, { childList: true });
}

function hasNamedSlotElement(element: Element, name: string): boolean {
  return !!element.querySelector(`[slot="${name}"]`);
}

/**
 * Type for named slot states. Either a generic readonly record or a named record, if provided
 * with keys via generic parameter.
 *
 * e.g. either { [key: string]: boolean } or { name1: boolean, name2: boolean }
 */
export type NamedSlotState<K = unknown> = K extends string
  ? Readonly<Pick<Record<string, boolean>, K>>
  : Readonly<Record<string, boolean>>;

/**
 * Creates a frozen object with the given names as key with the value being false.
 */
export function createNamedSlotState<K extends string>(name: K): NamedSlotState<K>;
export function createNamedSlotState<K1 extends string, K2 extends string>(
  name1: K1,
  name2: K2
): NamedSlotState<K1 | K2>;
export function createNamedSlotState<K1 extends string, K2 extends string, K3 extends string>(
  name1: K1,
  name2: K2,
  name3: K3
): NamedSlotState<K1 | K2 | K3>;
export function createNamedSlotState(...names: string[]): NamedSlotState {
  return Object.freeze(
    names.reduce(
      (state, key) => Object.assign(state, { [key]: false }),
      {} as Record<string, boolean>
    )
  );
}

/**
 * Queries the host element for child elements with the slot names from the given state.
 *
 * @param element The host element.
 * @param state The previous state.
 * @param names Slot names to check (optional).
 * @returns A new frozen object with values being set to true, if the host contains elements
 *   with the corresponding slot name.
 */
function queryNamedSlotState<S extends NamedSlotState>(
  element: HTMLElement,
  state: S,
  names?: Set<string>
): S {
  const newState: Record<string, boolean> = { ...state };
  if (names) {
    names.forEach((name) => {
      if (name in newState) {
        newState[name] = hasNamedSlotElement(element, name);
      }
    });
  } else {
    for (const name of Object.keys(newState)) {
      newState[name] = hasNamedSlotElement(element, name);
    }
  }

  return Object.freeze(newState) as S;
}

/** Creates event handler for detecting named slot changes. */
export function namedSlotChangeHandlerAspect(action: SbbNamedSlotChangeCallback): HandlerAspect {
  return ({ host, signal }) => {
    host.addEventListener(
      sbbNamedSlotChangeEventName,
      (e) => action((state) => queryNamedSlotState(host, state, e.detail)),
      { signal, passive: true }
    );
    action((state) => queryNamedSlotState(host, state));
    observeNamedSlotChanges(host);
  };
}
