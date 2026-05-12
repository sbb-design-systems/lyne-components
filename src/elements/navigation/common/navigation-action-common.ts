import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { html } from 'lit/static-html.js';

import type {
  AbstractConstructor,
  SbbActionBaseElement,
  SbbElementConstructor,
  SbbElementType,
} from '../../core.ts';
import { SbbPropertyWatcherController } from '../../core.ts';
import { SbbIconElement } from '../../icon.pure.ts';
import type { SbbNavigationButtonElement } from '../navigation-button/navigation-button.component.ts';
import type { SbbNavigationLinkElement } from '../navigation-link/navigation-link.component.ts';
import type { SbbNavigationMarkerElement } from '../navigation-marker/navigation-marker.component.ts';
import type { SbbNavigationSectionElement } from '../navigation-section/navigation-section.component.ts';

import style from './navigation-action.scss?inline';

export declare class SbbNavigationActionCommonElementMixinType {
  public get marker(): SbbNavigationMarkerElement | null;
  public get section(): SbbNavigationSectionElement | null;
  public connectedSection: SbbNavigationSectionElement | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNavigationActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement> & SbbElementConstructor,
>(
  superClass: T,
): AbstractConstructor<SbbNavigationActionCommonElementMixinType> & T => {
  abstract class SbbNavigationActionCommonElement
    extends superClass
    implements Partial<SbbNavigationActionCommonElementMixinType>
  {
    public static override elementDependencies: SbbElementType[] = [SbbIconElement];
    public static styles: CSSResultGroup = [unsafeCSS(style)];

    /** The section that is being controlled by the action, if any. */
    public connectedSection?: SbbNavigationSectionElement;

    private _navigationMarker: SbbNavigationMarkerElement | null = null;
    private _navigationSection: SbbNavigationSectionElement | null = null;
    private _size: 's' | 'm' | 'l' = 'l';

    /** The navigation marker in which the action is nested. */
    public get marker(): SbbNavigationMarkerElement | null {
      return this._navigationMarker;
    }

    /** The section in which the action is nested. */
    public get section(): SbbNavigationSectionElement | null {
      return this._navigationSection;
    }

    protected constructor(...args: any[]) {
      super(...args);
      this.addEventListener?.('click', () => {
        if (
          !this.matches(':state(action-active)') &&
          this._navigationMarker &&
          !this.connectedSection
        ) {
          this.marker?.select(
            this as unknown as SbbNavigationButtonElement | SbbNavigationLinkElement,
          );
        }
      });
      this.addController(
        new SbbPropertyWatcherController(this, () => this.closest('sbb-navigation-marker'), {
          size: (marker) => this._applySize(marker.size),
        }),
      );
    }

    public override connectedCallback(): void {
      super.connectedCallback();

      // Check if the current element is nested inside a navigation marker.
      this._navigationMarker = this.closest('sbb-navigation-marker');

      // Check if the current element is nested inside a navigation section.
      this._navigationSection = this.closest('sbb-navigation-section');
      this.toggleState('section-action', !!this._navigationSection);
      if (this.closest('sbb-navigation-list')) {
        this._applySize('m');
      }
    }

    private _applySize(size: SbbNavigationActionCommonElement['_size']): void {
      if (this._size) {
        this.internals.states.delete(`size-${this._size}`);
      }
      this._size = size;
      if (this._size) {
        this.internals.states.add(`size-${this._size}`);
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`<sbb-icon name="dash-small"></sbb-icon> <slot></slot>`;
    }
  }
  return SbbNavigationActionCommonElement as unknown as AbstractConstructor<SbbNavigationActionCommonElementMixinType> &
    T;
};
