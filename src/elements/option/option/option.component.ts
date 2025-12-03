import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteElement } from '../../autocomplete.ts';
import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbSelectElement } from '../../select.ts';

import { SbbOptionBaseElement } from './option-base-element.ts';
import style from './option.scss?lit&inline';

import '../../visual-checkbox.ts';

export type SbbOptionVariant = 'autocomplete' | 'select' | null;

/**
 * It displays on option item which can be used in `sbb-select` or `sbb-autocomplete`.
 *
 * @slot - Use the unnamed slot to add content to the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @cssprop [--sbb-option-icon-container-display=none] - Can be used to reserve space even
 * when preserve-icon-space on autocomplete is not set or iconName is not set.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-option')
class SbbOptionElement<T = string> extends SbbOptionBaseElement<T> {
  public static override readonly role = 'option';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static override readonly events = {
    optionselectionchange: 'optionselectionchange',
    optionselected: 'optionselected',
  } as const;

  protected optionId = `sbb-option`;

  private set _variant(variant: SbbOptionVariant) {
    if (this._variantInternal) {
      this.internals.states.delete(`variant-${this._variantInternal}`);
    }
    this._variantInternal = variant;
    if (this._variantInternal) {
      this.internals.states.add(`variant-${this._variantInternal}`);
    }
  }
  private get _variant(): SbbOptionVariant {
    return this._variantInternal ?? null;
  }
  private _variantInternal?: SbbOptionVariant;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-optgroup'), {
        disabled: (p) => (this.disabledFromGroup = p.disabled),
        label: (p) => (this.groupLabel = p.label),
      }),
    );

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete'), {
        negative: (e) => this._handleNegativeChange(e),
      }),
    );

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-select'), {
        multiple: (ancestor) => {
          this.toggleState('multiple', ancestor.multiple);

          // Multiple has to be propagated to sbb-visual-checkbox inside the option.
          this.requestUpdate();
        },
        negative: (e) => this._handleNegativeChange(e),
      }),
    );
  }

  private _isMultiple(): boolean {
    return !this.hydrationRequired && this.internals.states.has('multiple');
  }

  private _handleNegativeChange(ancestor: SbbAutocompleteElement | SbbSelectElement): void {
    this.toggleState('negative', ancestor.negative);

    // Negative has to be propagated to sbb-visual-checkbox inside the option.
    this.requestUpdate();
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // We need to check highlight state both on slot change, but also when connecting
    // the element to the DOM. The slot change events might be swallowed when using declarative
    // shadow DOM with SSR or if the DOM is changed when disconnected.
    if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this._init());
    } else {
      this._init();
    }
  }

  private _init(): void {
    this._setVariantByContext();
    this.handleHighlightState();
  }

  protected selectByClick(event: MouseEvent): void {
    if (this.disabled || this.disabledFromGroup) {
      event.stopPropagation();
      return;
    }

    if (this._isMultiple()) {
      event.stopPropagation();
      this.selectViaUserInteraction(!this.selected);
    } else {
      this.selectViaUserInteraction(true);
    }
  }

  protected override selectViaUserInteraction(selected: boolean): void {
    super.selectViaUserInteraction(selected);
    /** The optionselectionchange event is dispatched when the option selection status changes. */
    this.dispatchEvent(new Event('optionselectionchange', { bubbles: true, composed: true }));
  }

  private _setVariantByContext(): void {
    if (this.closest?.('sbb-autocomplete')) {
      this._variant = 'autocomplete';
    } else if (this.closest?.('sbb-select')) {
      this._variant = 'select';
    }
  }

  protected override handleHighlightState(): void {
    if (this._variant !== 'autocomplete') {
      this.updateDisableHighlight(true);
      return;
    }

    super.handleHighlightState();
  }

  protected override renderIcon(): TemplateResult {
    return html`
      <!-- Icon -->
      ${!this._isMultiple()
        ? html` <span class="sbb-option__icon"> ${this.renderIconSlot()} </span>`
        : nothing}

      <!-- Checkbox -->
      ${this._isMultiple()
        ? html`
            <sbb-visual-checkbox
              ?checked=${this.selected}
              ?disabled=${this.disabled || this.disabledFromGroup}
              ?negative=${this.matches?.(':state(negative)')}
            ></sbb-visual-checkbox>
          `
        : nothing}
    `;
  }

  protected override renderLabel(): TemplateResult | typeof nothing {
    if (this._variant !== 'autocomplete') {
      return nothing;
    }
    return super.renderLabel();
  }

  protected override renderTick(): TemplateResult | typeof nothing {
    return this._variant === 'select' && !this._isMultiple() && this.selected
      ? html`<sbb-icon name="tick-small"></sbb-icon>`
      : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-option': SbbOptionElement;
  }

  interface GlobalEventHandlersEventMap {
    optionselectionchange: Event;
  }
}
