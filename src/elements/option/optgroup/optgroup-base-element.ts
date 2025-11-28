import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.ts';
import { forceType } from '../../core/decorators.ts';
import { isSafari } from '../../core/dom.ts';
import {
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbHydrationMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbOptionBaseElement } from '../option.ts';

import style from './optgroup-base-element.scss?lit&inline';

import '../../divider.ts';

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add a hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari;

export abstract class SbbOptgroupBaseElement extends SbbDisabledMixin(
  SbbElementInternalsMixin(SbbHydrationMixin(LitElement)),
) {
  public static override readonly role = !inertAriaGroups ? 'group' : null;
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Option group label. */
  @forceType()
  @property()
  public accessor label: string = '';

  @state() private accessor _inertAriaGroups = false;

  protected abstract get options(): SbbOptionBaseElement[];

  public constructor() {
    super();

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
    // TODO: replace divider with CSS
    return html`
      <div class="sbb-optgroup__divider">
        <sbb-divider ?negative=${this.matches?.(':state(negative)')}></sbb-divider>
      </div>
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
