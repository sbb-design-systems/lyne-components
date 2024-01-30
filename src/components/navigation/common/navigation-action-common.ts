import type { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from '../../core/common-behaviors';
import { hostContext } from '../../core/dom';
import {
  actionElementHandlerAspect,
  ConnectedAbortController,
  HandlerRepository,
} from '../../core/eventing';
import type { SbbNavigationButtonElement } from '../navigation-button';
import type { SbbNavigationLinkElement } from '../navigation-link';
import type { SbbNavigationMarkerElement } from '../navigation-marker';

import style from './navigation-action.scss?lit&inline';

export type SbbNavigationActionSize = 's' | 'm' | 'l';

export declare class SbbNavigationActionCommonElementMixinType {
  public size?: SbbNavigationActionSize;
  public active: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNavigationActionCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbNavigationActionCommonElementMixinType> & T => {
  abstract class SbbNavigationActionCommonElement
    extends superClass
    implements Partial<SbbNavigationActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Action size variant. */
    @property({ reflect: true }) public size?: SbbNavigationActionSize = 'l';

    /**
     * Whether the action is active.
     */
    @property({ reflect: true, type: Boolean })
    public set active(value: boolean) {
      const oldValue = this.active;
      if (value !== oldValue) {
        this._active = value;
        this._handleActiveChange(this.active, oldValue);
      }
    }
    public get active(): boolean {
      return this._active;
    }
    private _active = false;

    private _navigationMarker: SbbNavigationMarkerElement | null = null;
    private _abort = new ConnectedAbortController(this);

    private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

    public override connectedCallback(): void {
      super.connectedCallback();
      const signal = this._abort.signal;
      this.addEventListener(
        'click',
        () => {
          if (!this.active && this._navigationMarker) {
            this.active = true;
          }
        },
        { signal },
      );
      this._handlerRepository.connect();

      // Check if the current element is nested inside a navigation marker.
      this._navigationMarker = hostContext(
        'sbb-navigation-marker',
        this,
      ) as SbbNavigationMarkerElement;
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }

    // Check whether the `active` attribute has been added or removed from the DOM
    // and call the `select()` or `reset()` method accordingly.
    private _handleActiveChange(newValue: boolean, oldValue: boolean): void {
      if (newValue && !oldValue) {
        this._navigationMarker?.select(
          this as unknown as SbbNavigationButtonElement | SbbNavigationLinkElement,
        );
      } else if (!newValue && oldValue) {
        this._navigationMarker?.reset();
      }
    }
  }
  return SbbNavigationActionCommonElement as unknown as AbstractConstructor<SbbNavigationActionCommonElementMixinType> &
    T;
};
