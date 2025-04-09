import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { interactivityChecker } from './interactivity-checker.js';

export class SbbFocusTrapController implements ReactiveController {
  public set enabled(enabled: boolean) {
    if (enabled) {
      this._trap();
    } else {
      this._untrap();
    }
  }
  public get enabled(): boolean {
    return !!this._abortController;
  }

  private _abortController: AbortController | null = null;

  public constructor(private _host: ReactiveControllerHost & HTMLElement) {
    this._host.addController?.(this);
  }

  public hostDisconnected(): void {
    this._untrap();
  }

  private _trap(): void {
    this._abortController = new AbortController();
    this._host.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Tab') {
          return;
        }

        if (!event.shiftKey) {
          const lastFocusableElement = this._getLastTabbableElement(this._host);
          if (lastFocusableElement && event.composedPath().includes(lastFocusableElement)) {
            this._getFirstTabbableElement(this._host)?.focus();
            event.preventDefault();
          }
        } else {
          const firstFocusableElement = this._getFirstTabbableElement(this._host);
          if (firstFocusableElement && event.composedPath().includes(firstFocusableElement)) {
            this._getLastTabbableElement(this._host)?.focus();
            event.preventDefault();
          }
        }
      },
      { signal: this._abortController.signal },
    );
  }

  /** Get the first tabbable element from a DOM subtree (inclusive). */
  private _getFirstTabbableElement(root: HTMLElement): HTMLElement | null {
    if (
      root !== this._host &&
      interactivityChecker.isFocusable(root) &&
      interactivityChecker.isTabbable(root)
    ) {
      return root;
    }

    const children = root.shadowRoot
      ? root.shadowRoot.children
      : root.localName === 'slot'
        ? (root as HTMLSlotElement).assignedElements()
        : root.children;

    for (let i = 0; i < children.length; i++) {
      const tabbableChild =
        children[i].nodeType === document.ELEMENT_NODE
          ? this._getFirstTabbableElement(children[i] as HTMLElement)
          : null;

      if (tabbableChild) {
        return tabbableChild;
      }
    }

    return null;
  }

  /** Get the last tabbable element from a DOM subtree (inclusive). */
  private _getLastTabbableElement(root: HTMLElement): HTMLElement | null {
    if (
      root !== this._host &&
      interactivityChecker.isFocusable(root) &&
      interactivityChecker.isTabbable(root)
    ) {
      return root;
    }

    const children = root.shadowRoot
      ? root.shadowRoot.children
      : root.localName === 'slot'
        ? (root as HTMLSlotElement).assignedElements()
        : root.children;

    // Iterate in reverse DOM order.
    for (let i = children.length - 1; i >= 0; i--) {
      const tabbableChild =
        children[i].nodeType === document.ELEMENT_NODE
          ? this._getLastTabbableElement(children[i] as HTMLElement)
          : null;

      if (tabbableChild) {
        return tabbableChild;
      }
    }

    return null;
  }

  private _untrap(): void {
    this._abortController?.abort();
    this._abortController = null;
  }
}
