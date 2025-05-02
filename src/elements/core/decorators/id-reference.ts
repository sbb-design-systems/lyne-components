import { isServer, type ReactiveController, type ReactiveElement } from 'lit';

import type { Interface } from './base.js';

interface IdReferenceController extends ReactiveController {
  host: Interface<ReactiveElement>;
  rootNode: Document | ShadowRoot | null;
  checkIdReference: (changedIds?: Set<string>) => void;
}

const observers = new WeakMap<
  Node,
  {
    observer: MutationObserver;
    controllers: Set<IdReferenceController>;
  }
>();
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
            const id = idReferences.get(this.host) ?? this.host.getAttribute(attributeName);
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
          if (typeof value === 'string') {
            if (value) {
              idReferences.set(this, value);
              const element = (this.getRootNode?.() as Document | ShadowRoot)?.getElementById?.(
                value,
              );
              value = (element ?? null) as unknown as V;
            } else {
              idReferences.delete(this);
              value = null!;
            }
          } else {
            idReferences.delete(this);
          }

          (target as ClassAccessorDecoratorTarget<C, V>).set.call(this as unknown as C, value);
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
