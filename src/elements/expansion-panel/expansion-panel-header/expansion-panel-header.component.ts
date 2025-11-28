import { type CSSResultGroup, html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import {
  SbbMediaQueryHover,
  SbbMediaMatcherController,
  SbbPropertyWatcherController,
} from '../../core/controllers.ts';
import { SbbDisabledTabIndexActionMixin, ɵstateController } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import type { SbbExpansionPanelElement } from '../expansion-panel.ts';

import style from './expansion-panel-header.scss?lit&inline';

/**
 * It acts as a native `summary` tag for the `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-expansion-panel-header`.
 * @slot icon - Slot used to render the `sbb-expansion-panel-header` icon.
 */
export
@customElement('sbb-expansion-panel-header')
class SbbExpansionPanelHeaderElement extends SbbDisabledTabIndexActionMixin(
  SbbIconNameMixin(SbbButtonBaseElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    toggleexpanded: 'toggleexpanded',
  } as const;

  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryHover]: (m) => (this._isHover = m),
  });

  private _isHover: boolean = this._mediaMatcher.matches(SbbMediaQueryHover) ?? false;
  private _previousSize?: string;

  public constructor() {
    super();
    this.addEventListener?.('click', () => this._emitExpandedEvent());
    this.addEventListener?.('mouseenter', () => this._onMouseMovement(true));
    this.addEventListener?.('mouseleave', () => this._onMouseMovement(false));
    this.addEventListener?.('slottedchange', () => this._setIconState());
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-expansion-panel'), {
        size: (s) => {
          if (this._previousSize) {
            this.internals.states.delete(`size-${this._previousSize}`);
          }
          this._previousSize = s.size;
          if (this._previousSize) {
            this.internals.states.add(`size-${this._previousSize}`);
          }
        },
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'header';
  }

  private _emitExpandedEvent(): void {
    if (!this.disabled) {
      /** Notifies that the `sbb-expansion-panel` is about to expand/shrink. */
      this.dispatchEvent(new Event('toggleexpanded', { bubbles: true, composed: true }));
    }
  }

  private _onMouseMovement(toggleDataAttribute: boolean): void {
    const parent: SbbExpansionPanelElement = this.closest('sbb-expansion-panel')!;
    // The `sbb.hover-mq` logic has been removed from scss, but it must be replicated to have the correct behavior on mobile.
    if (!toggleDataAttribute || (parent && this._isHover)) {
      ɵstateController(parent).toggle('toggle-hover', toggleDataAttribute);
    }
  }

  /**
   * The :state(icon) is used by the 'sbb-expansion-panel'.
   * It needs to be set before the @slotchange event bubbles to the 'expansion-panel'
   * but after the 'SbbSlotStateController' has run.
   */
  private _setIconState(): void {
    this.toggleState('icon', !!(this.iconName || this.internals.states.has('icon')));
  }

  protected override renderTemplate(): TemplateResult {
    // TODO: Still necessary?
    this._setIconState();
    return html`
      <span class="sbb-expansion-panel-header__title">
        <span class="sbb-expansion-panel-header__icon"> ${this.renderIconSlot()} </span>
        <slot></slot>
      </span>
      ${!this.disabled
        ? html`<span class="sbb-expansion-panel-header__toggle">
            <sbb-icon
              name="chevron-small-down-medium"
              class="sbb-expansion-panel-header__toggle-icon"
            >
            </sbb-icon>
          </span>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel-header': SbbExpansionPanelHeaderElement;
  }
}
