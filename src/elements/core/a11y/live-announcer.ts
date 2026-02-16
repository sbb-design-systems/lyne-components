/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { isServer } from 'lit';

export type AriaLivePoliteness = 'off' | 'polite' | 'assertive';

let uniqueIds = 0;

/**
 * Allows to announce messages to screen readers.
 *
 * Adapted from https://github.com/angular/components/blob/main/src/cdk/a11y/live-announcer/live-announcer.ts
 */
export class SbbLiveAnnouncer {
  private _liveElement!: HTMLElement;
  private _previousTimeout: ReturnType<typeof setTimeout> | undefined;
  private _currentPromise: Promise<void> | undefined;
  private _currentResolve: (() => void) | undefined;

  public constructor() {
    if (!isServer) {
      if (document.body) {
        this._liveElement = this._createLiveElement();
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          this._liveElement = this._createLiveElement();
        });
      }
    }
  }

  /**
   * Announces a message to screen readers.
   * @param message Message to be announced to the screen reader.
   * @returns Promise that will be resolved when the message is added to the DOM.
   */
  public announce(message: string): Promise<void>;

  /**
   * Announces a message to screen readers.
   * @param message Message to be announced to the screen reader.
   * @param politeness The politeness of the announcer element.
   * @returns Promise that will be resolved when the message is added to the DOM.
   */
  public announce(message: string, politeness?: AriaLivePoliteness): Promise<void>;

  /**
   * Announces a message to screen readers.
   * @param message Message to be announced to the screen reader.
   * @param duration Time in milliseconds after which to clear out the announcer element. Note
   *   that this takes effect after the message has been added to the DOM, which can be up to
   *   100ms after `announce` has been called.
   * @returns Promise that will be resolved when the message is added to the DOM.
   */
  public announce(message: string, duration?: number): Promise<void>;

  /**
   * Announces a message to screen readers.
   * @param message Message to be announced to the screen reader.
   * @param politeness The politeness of the announcer element.
   * @param duration Time in milliseconds after which to clear out the announcer element. Note
   *   that this takes effect after the message has been added to the DOM, which can be up to
   *   100ms after `announce` has been called.
   * @returns Promise that will be resolved when the message is added to the DOM.
   */
  public announce(
    message: string,
    politeness?: AriaLivePoliteness,
    duration?: number,
  ): Promise<void>;

  public announce(message: string, ...args: any[]): Promise<void> {
    // On the server or when the DOM is not ready yet, we don't do anything.
    if (!this._liveElement) {
      return Promise.resolve();
    }

    // TODO: Decide whether to have global options.
    const defaultOptions = {} as { politeness?: AriaLivePoliteness; duration?: number };
    let politeness: AriaLivePoliteness | undefined;
    let duration: number | undefined;

    if (args.length === 1 && typeof args[0] === 'number') {
      duration = args[0];
    } else {
      [politeness, duration] = args;
    }

    this.clear();
    clearTimeout(this._previousTimeout);

    politeness ??= defaultOptions?.politeness ?? 'polite';
    duration ??= defaultOptions?.duration;

    this._liveElement.setAttribute('aria-live', politeness);

    // This 100ms timeout is necessary for some browser + screen-reader combinations:
    // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
    // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
    //   second time without clearing and then using a non-zero delay.
    // (using JAWS 17 at time of this writing).
    this._currentPromise ??= new Promise((resolve) => (this._currentResolve = resolve));

    clearTimeout(this._previousTimeout);
    this._previousTimeout = setTimeout(() => {
      this._liveElement.textContent = message;

      if (typeof duration === 'number') {
        this._previousTimeout = setTimeout(() => this.clear(), duration);
      }

      this._currentResolve?.();
      this._currentPromise = this._currentResolve = undefined;
    }, 100);

    return this._currentPromise;
  }

  /**
   * Clears the current text from the announcer element. Can be used to prevent
   * screen readers from reading the text out again while the user is going
   * through the page landmarks.
   */
  public clear(): void {
    if (this._liveElement) {
      this._liveElement.textContent = '';
    }
  }

  public destroy(): void {
    clearTimeout(this._previousTimeout);
    this._liveElement?.remove();
    this._liveElement = null!;
    this._currentResolve?.();
    this._currentPromise = this._currentResolve = undefined;
  }

  private _createLiveElement(): HTMLElement {
    const elementClass = 'sbb-live-announcer-element';
    const previousElements = document.getElementsByClassName(elementClass);
    const liveEl = document.createElement('div');

    // Remove any old containers. This can happen when coming in from a server-side-rendered page.
    for (let i = 0; i < previousElements.length; i++) {
      previousElements[i].remove();
    }

    liveEl.classList.add(elementClass);
    liveEl.classList.add('sbb-screen-reader-only');

    liveEl.setAttribute('aria-atomic', 'true');
    liveEl.setAttribute('aria-live', 'polite');
    liveEl.id = `sbb-live-announcer-${uniqueIds++}`;

    document.body.appendChild(liveEl);

    return liveEl;
  }
}

export const sbbLiveAnnouncer = new SbbLiveAnnouncer();
