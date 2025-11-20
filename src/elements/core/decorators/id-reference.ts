import { isServer, type ReactiveController, type ReactiveElement } from 'lit';

import type { Interface } from './base.ts';

interface IdReferenceController extends ReactiveController {
  host: Interface<ReactiveElement>;
  rootNode: Document | ShadowRoot | null;
  checkIdReference: (changedIds?: Set<string>) => void;
}

/**
 * We keep track of the observers for each root node, which is either a document
 * or a shadow root.
 * Each observer is associated with a set of controllers that each represent
 * an id reference.
 * Whenever the MutationObserver detects a change that affects a potential id
 * reference, it notifies all controllers associated with that observer.
 */
const observers = new WeakMap<
  Node,
  {
    observer: MutationObserver;
    controllers: Set<IdReferenceController>;
  }
>();
/**
 * Whenever an id string is passed to the setter and no reference is found,
 * we store it in this WeakMap.
 * The key is the host element and the value is the id string.
 * Please note that if an id reference property has both an entry
 * in this WeakMap and an associated attribute, the attribute will take precedence.
 */
const idReferences = new WeakMap<object, string | null>();

/**
 * Accessor decorator that resolves id references dynamically.
 * If a string is passed (e.g. from an attribute), it will be resolved to the element with that id.
 * This decorator observes the connected document fragment for changes to the id attribute
 * and child elements and if any id reference is established or removed, it will
 * update the associated property.
 */
export const idReference = <C extends Interface<ReactiveElement>, V>() => {
  return (
    target: ClassAccessorDecoratorTarget<C, V>,
    context: ClassAccessorDecoratorContext<C, V>,
  ): any => {
    const { kind, metadata, name } = context;
    if (kind === 'accessor') {
      if (isServer) {
        return {};
      }

      const attribute = globalThis.litPropertyMetadata.get(metadata)?.get(name)?.attribute;
      const attributeName = typeof attribute === 'string' ? attribute : (name as string);
      context.addInitializer(function () {
        this.addController({
          host: this,
          rootNode: null,
          checkIdReference(changedIds?: Set<string>): void {
            const id = this.host.getAttribute(attributeName) ?? idReferences.get(this.host);
            if (id && typeof id === 'string' && (!changedIds || changedIds.has(id))) {
              const value = (this.rootNode?.getElementById?.(id) ?? null) as unknown as V;
              if (context.access.get(this.host as C) !== value) {
                context.access.set(this.host as C, value);
              }
            }
          },
          hostConnected() {
            this.rootNode = this.host.getRootNode() as Document | ShadowRoot;
            this.checkIdReference();
            const observerContext = observers.get(this.rootNode);

            if (observerContext) {
              observerContext.controllers.add(this);
            } else {
              const controllers = new Set([this]);
              const observer = new MutationObserver((mutations) => {
                const mutatedIds = new Set<string>();

                for (const mutation of mutations) {
                  if (mutation.type === 'attributes') {
                    if (mutation.oldValue) {
                      mutatedIds.add(mutation.oldValue!);
                    }
                    if ((mutation.target as HTMLElement).id) {
                      mutatedIds.add((mutation.target as HTMLElement).id);
                    }
                  } else if (mutation.type === 'childList') {
                    for (const node of [...mutation.addedNodes, ...mutation.removedNodes]) {
                      if (node instanceof HTMLElement) {
                        if (node.id) {
                          mutatedIds.add(node.id);
                        }
                        node.querySelectorAll('[id]').forEach((e) => {
                          if (e.id) {
                            mutatedIds.add(e.id);
                          }
                        });
                      }
                    }
                  }
                }

                controllers.forEach((c) => c.checkIdReference(mutatedIds));
              });

              observer.observe(this.rootNode, {
                attributeFilter: ['id'],
                attributeOldValue: true,
                childList: true,
                subtree: true,
              });

              observers.set(this.rootNode, { observer, controllers });
            }
          },
          hostDisconnected() {
            if (isServer || !this.rootNode) {
              return;
            }

            const observerContext = observers.get(this.rootNode);
            if (!observerContext) {
              this.rootNode = null;
              return;
            }

            observerContext.controllers.delete(this);
            if (observerContext.controllers.size === 0) {
              observerContext.observer.disconnect();
              observers.delete(this.rootNode);
            }

            this.rootNode = null;
          },
        } as IdReferenceController);
      });
      return {
        set(this: C, value) {
          if (typeof value !== 'string') {
            idReferences.delete(this);
            if (
              value instanceof HTMLElement &&
              this.hasAttribute(attributeName) &&
              value.id !== this.getAttribute(attributeName)
            ) {
              if (import.meta.env.DEV) {
                const elementIdentity = value.id
                  ? `#${value.id}`
                  : value.classList.value
                      .split(' ')
                      .map((c) => `.${c}`)
                      .join('');
                console.warn(
                  `An element (${value.localName + elementIdentity}) was ` +
                    `passed to the ${this.localName}.${name as string} property, ` +
                    `which does not match the existing id reference attribute ` +
                    `${attributeName} with value ${this.getAttribute(attributeName)}. ` +
                    `This will remove the current attribute value.`,
                );
              }
              this.removeAttribute(attributeName);
            }
          } else if (
            this.hasAttribute(attributeName) &&
            this.getAttribute(attributeName) !== value
          ) {
            // When a string is passed to the setter but the attribute is set to a
            // different value, we ignore the passed value.
            return;
          } else {
            const element = value
              ? (this.getRootNode?.() as Document | ShadowRoot)?.getElementById?.(value)
              : null;
            if (element) {
              value = element as unknown as V;
            } else if (value) {
              // If we are unable to resolve the id reference, we temporarily store it
              // to try to resolve it later.
              idReferences.set(this, value as string);
              value = null!;
            }
          }

          (target as ClassAccessorDecoratorTarget<C, V>).set.call(this as unknown as C, value);
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
