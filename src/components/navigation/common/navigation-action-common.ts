import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { AbstractConstructor, SbbActionBaseElement } from '../../core/common-behaviors';
import { hostContext, toggleDatasetEntry } from '../../core/dom';
import { ConnectedAbortController } from '../../core/eventing';
import type { SbbNavigationMarkerElement } from '../navigation-marker';

import style from './navigation-action.scss?lit&inline';

export type SbbNavigationActionSize = 's' | 'm' | 'l';

export declare class SbbNavigationActionCommonElementMixinType {
  public size?: SbbNavigationActionSize;
  public navigationMarker?: SbbNavigationMarkerElement | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNavigationActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbNavigationActionCommonElementMixinType> & T => {
  abstract class SbbNavigationActionCommonElement
    extends superClass
    implements Partial<SbbNavigationActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Action size variant. */
    @property({ reflect: true }) public size?: SbbNavigationActionSize = 'l';

    private _abort = new ConnectedAbortController(this);
    private _navigationMarker: SbbNavigationMarkerElement | null = null;

    public get navigationMarker(): SbbNavigationMarkerElement | null {
      return this._navigationMarker;
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      const signal = this._abort.signal;
      this.addEventListener(
        'click',
        () => {
          if (!this.hasAttribute('data-action-active') && this._navigationMarker) {
            toggleDatasetEntry(this, 'actionActive', true);
          }
        },
        { signal },
      );

      // Check if the current element is nested inside a navigation marker.
      this._navigationMarker = hostContext(
        'sbb-navigation-marker',
        this,
      ) as SbbNavigationMarkerElement;
    }

    protected override renderTemplate(): TemplateResult {
      return html` <slot></slot> `;
    }
  }
  return SbbNavigationActionCommonElement as unknown as AbstractConstructor<SbbNavigationActionCommonElementMixinType> &
    T;
};
