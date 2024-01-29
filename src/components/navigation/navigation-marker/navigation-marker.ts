import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { NamedSlotListElement, type WithListChildren } from '../../core/common-behaviors';
import { AgnosticResizeObserver } from '../../core/observers';
import type { SbbNavigationButtonElement, SbbNavigationLinkElement } from '../index';

import style from './navigation-marker.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the `sbb-navigation-marker`.
 */
@customElement('sbb-navigation-marker')
export class SbbNavigationMarkerElement extends NamedSlotListElement<
  SbbNavigationButtonElement | SbbNavigationLinkElement
> {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildTagNames = ['SBB-NAVIGATION-BUTTON', 'SBB-NAVIGATION-LINK'];

  /**
   * Marker size variant.
   */
  @property({ reflect: true }) public size?: 'l' | 's' = 'l';

  @state() private _currentActiveAction?: SbbNavigationButtonElement | SbbNavigationLinkElement;

  private _navigationMarkerResizeObserver = new AgnosticResizeObserver(() =>
    this._setMarkerPosition(),
  );

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('size') || changedProperties.has('listChildren')) {
      this._updateMarkerActions();
    }
    this.toggleAttribute('data-has-active-action', !!this._currentActiveAction);
  }

  private _updateMarkerActions(): void {
    for (const action of this.listChildren) {
      action.size = this.size;
    }

    this._currentActiveAction = this.listChildren.find(
      (action) => action.active ?? action.getAttribute('active'),
    );
    this._setMarkerPosition();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._navigationMarkerResizeObserver.observe(this);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._navigationMarkerResizeObserver.disconnect();
  }

  public select(action: SbbNavigationButtonElement | SbbNavigationLinkElement): void {
    this.reset();
    action.active = true;
    this._currentActiveAction = action;
    setTimeout(() => this._setMarkerPosition());
  }

  protected override firstUpdated(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.firstUpdated(changedProperties);
    setTimeout(() => this._setMarkerPosition());
  }

  public reset(): void {
    if (this._currentActiveAction) {
      this._currentActiveAction.active = false;
      this._currentActiveAction = undefined;
    }
  }

  private _setMarkerPosition(): void {
    if (!this._currentActiveAction) {
      return;
    }

    const index = this.listChildren.indexOf(this._currentActiveAction)!;
    const value = this.shadowRoot!.querySelector<HTMLLIElement>(
      `li:nth-child(${index + 1})`,
    )?.offsetTop;
    if (value != null) {
      this.style?.setProperty('--sbb-navigation-marker-position-y', `${value}px`);
    }
  }

  protected override render(): TemplateResult {
    return this.renderList();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-marker': SbbNavigationMarkerElement;
  }
}
