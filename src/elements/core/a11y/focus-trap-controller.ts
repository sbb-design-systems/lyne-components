import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.js';

import { getFocusableElements } from './focus.js';

export class SbbFocusTrapController implements ReactiveController {
  private _abortController: AbortController | null = null;

  /**
   * @param _options.filter filter function which is applied during searching for focusable element. If an element is filtered, also child elements are filtered.
   * @param _options.postFilter filter function which is applied after collecting focusable elements.
   */
  public constructor(
    private _host: ReactiveControllerHost & SbbOpenCloseBaseElement,
    private _options?: {
      filter?: (el: HTMLElement) => boolean;
      postFilter?: (el: HTMLElement) => boolean;
    },
  ) {
    this._host.addController?.(this);
  }

  public hostConnected(): void {
    if (this._host.isOpen) {
      this.trap();
    }
  }

  public hostDisconnected(): void {
    this.unTrap();
  }

  public trap(): void {
    this._abortController = new AbortController();
    this._host.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Tab') {
          return;
        }

        // Dynamically get first and last focusable element, as this might have changed since opening overlay
        const elementChildren: HTMLElement[] = Array.from(
          this._host.shadowRoot!.children || [],
        ) as HTMLElement[];
        const focusableElements = getFocusableElements(elementChildren, {
          filter: this._options?.filter,
        });
        const filteredFocusableElements = focusableElements.filter(
          this._options?.postFilter ?? (() => true),
        );

        if (!filteredFocusableElements.length) {
          return;
        }

        const firstFocusable = filteredFocusableElements[0] as HTMLElement;
        const lastFocusable = filteredFocusableElements[
          filteredFocusableElements.length - 1
        ] as HTMLElement;

        const [pivot, next] = event.shiftKey
          ? [firstFocusable, lastFocusable]
          : [lastFocusable, firstFocusable];

        if (
          (firstFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot ||
          (lastFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot
        ) {
          next.focus();
          event.preventDefault();
        }
      },
      { signal: this._abortController.signal },
    );
  }

  public unTrap(): void {
    this._abortController?.abort();
    this._abortController = null;
  }

  public isTrapped(): boolean {
    return !!this._abortController;
  }
}
