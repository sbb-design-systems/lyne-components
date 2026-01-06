import { customElement } from 'lit/decorators.js';

import { SbbAutocompleteBaseElement } from '../../autocomplete.js';
import { getNextElementIndex } from '../../core/a11y.js';
import { isSafari } from '../../core/dom.js';
import { setAriaComboBoxAttributes } from '../../core/overlay.js';
import type { SbbDividerElement } from '../../divider.js';
import type { SbbOptGroupElement, SbbOptionHintElement } from '../../option.js';
import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button.js';
import { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';

let nextId = 0;

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

/**
 * Combined with a native input, it displays a panel with a list of available options with connected buttons.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-row` or `sbb-autocomplete-grid-optgroup` elements to the `sbb-autocomplete-grid`.
 * @cssprop [--sbb-autocomplete-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 * @cssprop [--sbb-options-panel-max-height] - Maximum height of the options panel.
 * If the calculated remaining space is smaller, the value gets ignored.
 */
export
@customElement('sbb-autocomplete-grid')
class SbbAutocompleteGridElement<T = string> extends SbbAutocompleteBaseElement<T> {
  public static override readonly role = ariaRoleOnHost ? 'grid' : null;
  protected overlayId = `sbb-autocomplete-grid-${++nextId}`;
  protected panelRole = 'grid';
  private _activeColumnIndex = 0;

  protected get options(): SbbAutocompleteGridOptionElement<T>[] {
    return Array.from(
      this.querySelectorAll?.<SbbAutocompleteGridOptionElement<T>>(
        'sbb-autocomplete-grid-option',
      ) ?? [],
    );
  }

  public constructor() {
    super();
    this.addEventListener?.('optionselected', (e: Event) => this.onOptionSelected(e));
  }

  protected syncNegative(): void {
    this.querySelectorAll?.<
      SbbDividerElement | SbbAutocompleteGridButtonElement | SbbOptionHintElement
    >('sbb-divider, sbb-autocomplete-grid-button, sbb-option-hint').forEach(
      (e) => (e.negative = this.negative),
    );

    this.querySelectorAll?.<SbbAutocompleteGridOptionElement<T> | SbbOptGroupElement>(
      'sbb-autocomplete-grid-row, sbb-autocomplete-grid-option, sbb-autocomplete-grid-optgroup',
    ).forEach((element) => element.toggleAttribute('data-negative', this.negative));
  }

  protected openedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (!this.isOpen) {
      return;
    }
    switch (event.key) {
      case 'Enter':
        this.selectByKeyboard(event);
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        this.setNextActiveOption(event);
        break;

      case 'ArrowRight':
      case 'ArrowLeft':
        this._setNextHorizontalActiveElement(event);
        break;
    }
  }

  /**
   * Select an element on 'Enter' keypress.
   *
   * Due to keyboard navigation code, the `_activeColumnIndex` is zero when an option is 'focused'
   * and greater than zero when a button is 'focused', so asking for `querySelectorAll(...)[this._activeColumnIndex]`
   * would always return a `SbbAutocompleteGridButtonElement`.
   */
  protected selectByKeyboard(event: KeyboardEvent): void {
    if (this.activeOption) {
      // We are currently selecting an option and therefore the Enter press shouldn't trigger a form submit
      event.preventDefault();

      if (this._activeColumnIndex !== 0) {
        this.activeOption
          .closest('sbb-autocomplete-grid-row')
          ?.querySelectorAll('sbb-autocomplete-grid-button')
          [
            // We ignore the option in the selector. Therefore, we have to shift the activeColumnIndex by one.
            this._activeColumnIndex - 1
          ]?.click();
      } else {
        this.activeOption['selectViaUserInteraction'](true);
      }
    }
  }

  protected setNextActiveOption(event?: KeyboardEvent): void {
    const enabledOptions = this.options.filter(
      (opt) => !opt.disabled && !opt.hasAttribute('data-group-disabled'),
    );

    // Reset potentially active option
    this.activeOption?.setActive(false);
    this.triggerElement?.removeAttribute('aria-activedescendant');
    Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-row [data-focus-visible]') ?? [],
    ).forEach((row) => row.removeAttribute('data-focus-visible'));
    this._activeColumnIndex = 0;

    if (!enabledOptions.length) {
      this.activeOption = null;
      return;
    }

    const activeItemIndex = this.activeOption
      ? enabledOptions.indexOf(this.activeOption as SbbAutocompleteGridOptionElement<T>)
      : -1;

    // Get and activate the next active option
    const next = getNextElementIndex(event, activeItemIndex, enabledOptions.length);
    this.activeOption = enabledOptions[next];
    this.activeOption.setActive(true);
    this.triggerElement?.setAttribute('aria-activedescendant', this.activeOption.id);
    this.activeOption.scrollIntoView({ block: 'nearest' });
    if (this.autoSelectActiveOption) {
      this.onOptionArrowsSelected(this.activeOption);
    }
  }

  private _setNextHorizontalActiveElement(event: KeyboardEvent): void {
    if (!this.activeOption) {
      return;
    }

    const elementsInRow = Array.from(
      this.activeOption
        ?.closest('sbb-autocomplete-grid-row')
        ?.querySelectorAll<
          SbbAutocompleteGridOptionElement<T> | SbbAutocompleteGridButtonElement
        >('sbb-autocomplete-grid-option, sbb-autocomplete-grid-button') ?? [],
    )?.filter((el) => !el.disabled && !el.hasAttribute('data-group-disabled'));

    if (!elementsInRow.length) {
      return;
    }

    const next: number = getNextElementIndex(event, this._activeColumnIndex, elementsInRow.length);
    const nextElement: SbbAutocompleteGridOptionElement<T> | SbbAutocompleteGridButtonElement =
      elementsInRow[next];
    if (nextElement instanceof SbbAutocompleteGridOptionElement) {
      nextElement.setActive(true);
    } else {
      nextElement.toggleAttribute('data-focus-visible', true);
    }

    const lastActiveElement = elementsInRow[this._activeColumnIndex];
    if (lastActiveElement instanceof SbbAutocompleteGridOptionElement) {
      lastActiveElement.setActive(false);
    } else {
      lastActiveElement.toggleAttribute('data-focus-visible', false);
    }
    this.triggerElement?.setAttribute('aria-activedescendant', nextElement.id);
    nextElement.scrollIntoView({ block: 'nearest' });
    this._activeColumnIndex = next;
  }

  protected resetActiveElement(): void {
    if (this._activeColumnIndex !== 0) {
      this.activeOption
        ?.closest('sbb-autocomplete-grid-row')
        ?.querySelectorAll('sbb-autocomplete-grid-button')
        .forEach((e) => e.toggleAttribute('data-focus-visible', false));
    }
    this.activeOption?.setActive(false);
    this.activeOption = null;
    this._activeColumnIndex = 0;
    this.triggerElement?.removeAttribute('aria-activedescendant');
  }

  protected setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, ariaRoleOnHost ? this.id : this.overlayId, false, 'grid');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid': SbbAutocompleteGridElement;
  }
}
