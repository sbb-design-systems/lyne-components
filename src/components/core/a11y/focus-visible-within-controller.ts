import { ReactiveController, ReactiveControllerHost } from 'lit';

import { toggleDatasetEntry } from '../dom';

import { sbbInputModalityDetector } from './input-modality-detector';

// Determine whether the element has a visible focus within.
export class FocusVisibleWithinController implements ReactiveController {
  private _focusinHanlder = (): void => {
    toggleDatasetEntry(
      this._host,
      'hasVisibleFocusWithin',
      sbbInputModalityDetector.mostRecentModality === 'keyboard',
    );
  };

  private _focusoutHanlder = (): void => {
    toggleDatasetEntry(this._host, 'hasVisibleFocusWithin', false);
  };

  public constructor(private _host: ReactiveControllerHost & HTMLElement) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    this._host.addEventListener('focusin', this._focusinHanlder);
    this._host.addEventListener('focusout', this._focusoutHanlder);
  }

  public hostDisconnected(): void {
    this._host.removeEventListener('focusin', this._focusinHanlder);
    this._host.removeEventListener('focusout', this._focusoutHanlder);
  }
}
