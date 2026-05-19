import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.pure.ts';
import {
  forceType,
  isSafari,
  SbbDisabledMixin,
  SbbElement,
  SbbPropertyWatcherController,
} from '../../core.ts';
import type { SbbSelectElement } from '../../select.pure.ts';
import type { SbbOptionBaseElement } from '../option/option-base-element.ts';

import style from './optgroup-base-element.scss?inline';

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add a hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari;

export abstract class SbbOptgroupBaseElement extends SbbDisabledMixin(SbbElement) {
  public static override readonly role = !inertAriaGroups ? 'group' : null;
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** Option group label. */
  @forceType()
  @property()
  public accessor label: string = '';

  @state() private accessor _inertAriaGroups = false;

  protected abstract get options(): SbbOptionBaseElement[];

  private _previousSize: 's' | 'm' | null = null;

  protected constructor() {
    super();

    this.addController(
      new SbbPropertyWatcherController<SbbAutocompleteBaseElement | SbbSelectElement>(
        this,
        () => this.closest('sbb-autocomplete, sbb-autocomplete-grid, sbb-select'),
        {
          size: (e) => {
            if (this._previousSize) {
              this.internals.states.delete(`size-${this._previousSize}`);
            }
            this._previousSize = e.size;
            if (this._previousSize) {
              this.internals.states.add(`size-${this._previousSize}`);
            }
          },
        },
      ),
    );

    if (inertAriaGroups) {
      if (this.hydrationRequired) {
        this.hydrationComplete.then(() => (this._inertAriaGroups = inertAriaGroups));
      } else {
        this._inertAriaGroups = inertAriaGroups;
      }
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._updateAriaLabel();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      if (!this._inertAriaGroups) {
        this.internals.ariaDisabled = this.disabled ? 'true' : null;
      }
    }
    if (changedProperties.has('label')) {
      this._updateAriaLabel();
    }
  }

  protected abstract getAutocompleteParent(): SbbAutocompleteBaseElement | null;

  private _handleSlotchange(): void {
    this._updateAriaLabel();
    this._highlightOptions();
    // Used to notify associated components like the sbb-select to update state
    /** @internal */
    this.dispatchEvent(new Event('ɵoptgroupslotchange'));
  }

  private _updateAriaLabel(): void {
    this.internals.ariaLabel = !this._inertAriaGroups ? this.label : null;
  }

  private _highlightOptions(): void {
    const autocomplete = this.getAutocompleteParent();
    if (!autocomplete) {
      return;
    }
    const value = autocomplete.triggerElement?.value;
    if (!value) {
      return;
    }
    this.options.forEach((opt) => opt.highlight(value));
  }

  protected override render(): TemplateResult {
    return html`
      ${this.label
        ? html`
            <div class="sbb-optgroup__label" aria-hidden="true">
              <div class="sbb-optgroup__icon-space"></div>
              <span>${this.label}</span>
            </div>
          `
        : nothing}
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}
