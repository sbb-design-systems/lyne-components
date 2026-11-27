import { isServer } from 'lit';

let defaultRegistry: CustomElementRegistry | undefined;

/**
 * Sets the registry used by `SbbElement.define()` when no registry is passed explicitly.
 * This allows registering all Lyne elements in a scoped `CustomElementRegistry`
 * (e.g. to avoid tag name conflicts with other libraries in micro frontend setups).
 * The setting is local to this copy of Lyne and must be called before any element is defined.
 * Pass `undefined` to reset to the global registry.
 */
export function setDefaultCustomElementRegistry(registry: CustomElementRegistry | undefined): void {
  defaultRegistry = registry;
}

/** Returns the registry used by `SbbElement.define()` when no registry is passed explicitly. */
export function getDefaultCustomElementRegistry(): CustomElementRegistry {
  return defaultRegistry ?? globalThis.customElements;
}

/**
 * Returns the custom element registry associated with the given node,
 * falling back to the global registry.
 */
export function customElementRegistryOf(node?: Node | null): CustomElementRegistry {
  return (
    (node as Partial<Pick<Element, 'customElementRegistry'>> | null | undefined)
      ?.customElementRegistry ?? globalThis.customElements
  );
}

/**
 * Returns the given node's custom element registry if it is a scoped registry
 * (i.e. not the global registry), otherwise `undefined`.
 */
export function scopedCustomElementRegistryOf(
  node?: Node | null,
): CustomElementRegistry | undefined {
  if (isServer) {
    return undefined;
  }
  const registry = customElementRegistryOf(node);
  return registry !== globalThis.customElements ? registry : undefined;
}

/**
 * Creates an element in the given custom element registry.
 * Falls back to `document.createElement()` without options for the global registry.
 */
export function createElementInRegistry<K extends keyof HTMLElementTagNameMap>(
  registry: CustomElementRegistry | undefined,
  tagName: K,
): HTMLElementTagNameMap[K];
export function createElementInRegistry(
  registry: CustomElementRegistry | undefined,
  tagName: string,
): HTMLElement;
export function createElementInRegistry(
  registry: CustomElementRegistry | undefined,
  tagName: string,
): HTMLElement {
  return registry && registry !== globalThis.customElements
    ? document.createElement(tagName, { customElementRegistry: registry })
    : document.createElement(tagName);
}

/**
 * Creates an element in the same custom element registry as the given context node.
 * Use this instead of `document.createElement()` when creating custom elements
 * from inside a Lyne element, so that scoped registries are respected.
 */
export function createElementInRegistryOf<K extends keyof HTMLElementTagNameMap>(
  context: Node,
  tagName: K,
): HTMLElementTagNameMap[K];
export function createElementInRegistryOf(context: Node, tagName: string): HTMLElement;
export function createElementInRegistryOf(context: Node, tagName: string): HTMLElement {
  return createElementInRegistry(scopedCustomElementRegistryOf(context), tagName);
}
