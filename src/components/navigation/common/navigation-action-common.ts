import { nothing, type CSSResultGroup, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { AbstractConstructor, SbbActionBaseElement } from '../../core/common-behaviors';
import { ConnectedAbortController } from '../../core/eventing';
import type { SbbNavigationButtonElement } from '../navigation-button';
import type { SbbNavigationLinkElement } from '../navigation-link';
import type { SbbNavigationMarkerElement } from '../navigation-marker';
import type { SbbNavigationSectionElement } from '../navigation-section';

import '../../icon';

import style from './navigation-action.scss?lit&inline';

export type SbbNavigationActionSize = 's' | 'm' | 'l';

export declare class SbbNavigationActionCommonElementMixinType {
  public size?: SbbNavigationActionSize;
  public get marker(): SbbNavigationMarkerElement | null;
  public get section(): SbbNavigationSectionElement | null;
  public connectedSection: SbbNavigationSectionElement | null;
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

    /** The section that is beign controlled by the action, if any. */
    public connectedSection: SbbNavigationSectionElement | null = null;

    /** The navigation marker in which the action is nested. */
    public get marker(): SbbNavigationMarkerElement | null {
      return this._navigationMarker;
    }

    /** The section in which the action is nested. */
    public get section(): SbbNavigationSectionElement | null {
      return this._navigationSection;
    }

    private _abort = new ConnectedAbortController(this);
    private _navigationMarker: SbbNavigationMarkerElement | null = null;
    private _navigationSection: SbbNavigationSectionElement | null = null;

    public override connectedCallback(): void {
      super.connectedCallback();
      const signal = this._abort.signal;
      this.addEventListener(
        'click',
        () => {
          if (
            !this.hasAttribute('data-action-active') &&
            this._navigationMarker &&
            !this.connectedSection
          ) {
            this.marker?.select(
              this as unknown as SbbNavigationButtonElement | SbbNavigationLinkElement,
            );
          }
        },
        { signal },
      );

      // Check if the current element is nested inside a navigation marker.
      this._navigationMarker = this.closest('sbb-navigation-marker');

      // Check if the current element is nested inside a navigation section.
      this._navigationSection = this.closest('sbb-navigation-section');
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        ${this._navigationSection && this.classList.contains('sbb-active')
          ? html`<sbb-icon name="minus-small"></sbb-icon>`
          : nothing} <slot></slot>
      `;
    }
  }
  return SbbNavigationActionCommonElement as unknown as AbstractConstructor<SbbNavigationActionCommonElementMixinType> &
    T;
};
