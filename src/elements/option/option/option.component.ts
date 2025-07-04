import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbOptionBaseElement } from './option-base-element.js';
import style from './option.scss?lit&inline';
import '../../visual-checkbox.js';

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
  public static override styles: CSSResultGroup = style;
  public static override readonly events = {
    optionselectionchange: 'optionselectionchange',
    optionselected: 'optionselected',
  } as const;

  protected optionId = `sbb-option`;

  private set _variant(state: SbbOptionVariant) {
    if (state) {
      this.setAttribute('data-variant', state);
    }
  }
  private get _variant(): SbbOptionVariant {
    return this.getAttribute('data-variant') as SbbOptionVariant;
  }

  private set _isMultiple(isMultiple: boolean) {
    this.toggleAttribute('data-multiple', isMultiple);
  }
  private get _isMultiple(): boolean {
    return !this.hydrationRequired && this.hasAttribute('data-multiple');
  }

  protected setAttributeFromParent(): void {
    const parentGroup = this.closest?.('sbb-optgroup');
    if (parentGroup) {
      this.disabledFromGroup = parentGroup.disabled;
      this.updateAriaDisabled();
    }

    this.negative = !!this.closest?.(
      // :is() selector not possible due to test environment
      `sbb-autocomplete[negative],sbb-form-field[negative]`,
    );
    this.toggleAttribute('data-negative', this.negative);

    this.toggleAttribute('data-multiple', this._isMultiple);
  }

  protected selectByClick(event: MouseEvent): void {
    if (this.disabled || this.disabledFromGroup) {
      event.stopPropagation();
      return;
    }

    if (this._isMultiple) {
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

  protected override init(): void {
    super.init();
    this._setVariantByContext();
    // We need to check highlight state both on slot change, but also when connecting
    // the element to the DOM. The slot change events might be swallowed when using declarative
    // shadow DOM with SSR or if the DOM is changed when disconnected.
    this.handleHighlightState();
  }

  private _setVariantByContext(): void {
    if (this.closest?.('sbb-autocomplete')) {
      this._variant = 'autocomplete';
    } else if (this.closest?.('sbb-select')) {
      this._variant = 'select';
    }
    this._isMultiple = !!this.closest?.('sbb-select[multiple]');
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
      ${!this._isMultiple
        ? html` <span class="sbb-option__icon"> ${this.renderIconSlot()} </span>`
        : nothing}

      <!-- Checkbox -->
      ${this._isMultiple
        ? html`
            <sbb-visual-checkbox
              ?checked=${this.selected}
              ?disabled=${this.disabled || this.disabledFromGroup}
              ?negative=${this.negative}
            ></sbb-visual-checkbox>
          `
        : nothing}
    `;
  }

  protected override renderLabel(): TemplateResult | typeof nothing {
    return this._variant === 'autocomplete' && this.label && !this.disableLabelHighlight
      ? this.getHighlightedLabel()
      : nothing;
  }

  protected override renderTick(): TemplateResult | typeof nothing {
    return this._variant === 'select' && !this._isMultiple && this.selected
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
