import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { NamedSlotListElement, type WithListChildren } from '../../core/common-behaviors';
import { setAttribute } from '../../core/dom';
import { AgnosticResizeObserver } from '../../core/observers';
import type { SbbNavigationActionElement } from '../navigation-action';

import style from './navigation-marker.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-action` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-action` elements into the `sbb-navigation-marker`.
 */
@customElement('sbb-navigation-marker')
export class SbbNavigationMarkerElement extends NamedSlotListElement<SbbNavigationActionElement> {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildTagNames = ['SBB-NAVIGATION-ACTION'];

  /**
   * Marker size variant.
   */
  @property({ reflect: true }) public size?: 'l' | 's' = 'l';

  @state() private _currentActiveAction?: SbbNavigationActionElement;

  private _navigationMarkerResizeObserver = new AgnosticResizeObserver(() =>
    this._setMarkerPosition(),
  );

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);
    setAttribute(this, 'data-has-active-action', !!this._currentActiveAction);
    if (changedProperties.has('size') || changedProperties.has('listChildren')) {
      this._updateMarkerActions();
    }
  }

  private _updateMarkerActions(): void {
    for (const action of this.listChildren) {
      action.size = this.size;
    }

    this._currentActiveAction = this.listChildren.find((action) => action.active);
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

  public select(action: SbbNavigationActionElement): void {
    this.reset();
    action.active = true;
    this._currentActiveAction = action;
    setTimeout(() => this._setMarkerPosition());
  }

  public reset(): void {
    if (this._currentActiveAction) {
      this._currentActiveAction.active = false;
      this._currentActiveAction = undefined;
    }
  }

  private _setMarkerPosition(): void {
    if (this._currentActiveAction) {
      const index = this.listChildren.indexOf(this._currentActiveAction)!;
      this.style?.setProperty(
        '--sbb-navigation-marker-position-y',
        `${
          this.shadowRoot!.querySelector<HTMLLIElement>(`li:nth-child(${index + 1})`)!.offsetTop
        }px`,
      );
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
