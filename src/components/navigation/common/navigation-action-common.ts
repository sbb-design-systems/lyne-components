import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { AbstractConstructor, SbbActionBaseElement } from '../../core/common-behaviors';
import { hostContext } from '../../core/dom';
import { ConnectedAbortController } from '../../core/eventing';
import type { SbbNavigationButtonElement } from '../navigation-button';
import type { SbbNavigationLinkElement } from '../navigation-link';
import type { SbbNavigationMarkerElement } from '../navigation-marker';
import type { SbbNavigationSectionElement } from '../navigation-section';

import style from './navigation-action.scss?lit&inline';

export type SbbNavigationActionSize = 's' | 'm' | 'l';

export declare class SbbNavigationActionCommonElementMixinType {
  public size?: SbbNavigationActionSize;
  public navigationMarker?: SbbNavigationMarkerElement | null;
  public navigationSection?: SbbNavigationSectionElement | null;
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
    private _navigationSection: SbbNavigationSectionElement | null = null;

    public get navigationMarker(): SbbNavigationMarkerElement | null {
      return this._navigationMarker;
    }

    public set navigationSection(navSection: SbbNavigationSectionElement) {
      this._navigationSection = navSection;
    }

    public get navigationSection(): SbbNavigationSectionElement | null {
      return this._navigationSection;
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      const signal = this._abort.signal;
      this.addEventListener(
        'click',
        () => {
          if (
            !this.hasAttribute('data-action-active') &&
            this._navigationMarker &&
            !this._navigationSection
          ) {
            this.navigationMarker?.select(
              this as unknown as SbbNavigationButtonElement | SbbNavigationLinkElement,
            );
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
