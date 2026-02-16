import { isServer, type LitElement, type ReactiveController } from 'lit';

const observers = new WeakMap<
  Node,
  { observer: MutationObserver; controllers: Set<SbbIdReferenceController<any>> }
>();

/**
 * Tracks id changes in the DOM and calls component when matching with requestUpdate().
 */
export class SbbIdReferenceController<T extends LitElement> implements ReactiveController {
  private _rootNode: Document | ShadowRoot | null = null;

  public constructor(
    private _host: T,
    private _idRef: keyof T,
    private _observers = observers,
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    if (isServer) {
      return;
    }

    this._rootNode = this._host.getRootNode() as Document | ShadowRoot;
    const observerContext = this._observers.get(this._rootNode);

    if (observerContext) {
      observerContext.controllers.add(this);
    } else {
      const controllers = new Set([this]);
      const observer = new MutationObserver((mutations) => {
        const mutatedIds = new Set<string>();

        for (const mutation of mutations) {
          if (mutation.type === 'attributes') {
            mutatedIds.add(mutation.oldValue!);
            mutatedIds.add((mutation.target as HTMLElement).id);
          } else if (mutation.type === 'childList') {
            for (const node of [...mutation.addedNodes, ...mutation.removedNodes]) {
              if (node instanceof HTMLElement) {
                mutatedIds.add(node.id);
                node.querySelectorAll('[id]').forEach((e) => mutatedIds.add(e.id));
              }
            }
          }
        }

        for (const controller of controllers) {
          const id = controller._host[controller._idRef];
          if (id && typeof id === 'string' && mutatedIds.has(id)) {
            controller._host.requestUpdate();
          }
        }
      });

      observer.observe(this._rootNode, {
        attributeFilter: ['id'],
        childList: true,
        subtree: true,
        attributeOldValue: true,
      });

      this._observers.set(this._rootNode, { observer, controllers });
    }
  }

  public hostDisconnected(): void {
    if (isServer || !this._rootNode) {
      return;
    }

    const observerContext = this._observers.get(this._rootNode);
    if (!observerContext) {
      this._rootNode = null;
      return;
    }

    observerContext.controllers.delete(this);
    if (observerContext.controllers.size === 0) {
      observerContext.observer.disconnect();
      this._observers.delete(this._rootNode);
    }

    this._rootNode = null;
  }

  /**
   * Find the element by id in the current document fragment
   */
  public find(): HTMLElement | null {
    if (isServer || !this._rootNode) {
      return null;
    } else {
      const id = this._host[this._idRef];
      return typeof id == 'string' ? this._rootNode?.getElementById(id) : null;
    }
  }
}
