import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { ɵstateController } from '../mixins/element-internals-mixin.ts';
import type { SbbElementInternalsMixinType } from '../mixins.ts';

import { sbbInputModalityDetector } from './input-modality-detector.ts';

// Determine whether the element has a visible focus within.
export class SbbFocusVisibleWithinController implements ReactiveController {
  public constructor(
    private _host: SbbElementInternalsMixinType & ReactiveControllerHost & HTMLElement,
  ) {
    this._host.addController(this);
  }

  private _focusinHandler = (): void => {
    ɵstateController(this._host).toggle(
      'has-visible-focus-within',
      sbbInputModalityDetector.mostRecentModality === 'keyboard',
    );
  };

  private _focusoutHandler = (): void => {
    ɵstateController(this._host).delete('has-visible-focus-within');
  };

  public hostConnected(): void {
    this._host.addEventListener('focusin', this._focusinHandler);
    this._host.addEventListener('focusout', this._focusoutHandler);
  }

  public hostDisconnected(): void {
    this._host.removeEventListener('focusin', this._focusinHandler);
    this._host.removeEventListener('focusout', this._focusoutHandler);
  }
}
