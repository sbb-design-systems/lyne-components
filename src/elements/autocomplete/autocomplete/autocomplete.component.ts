import { getNextElementIndex, isSafari, setAriaComboBoxAttributes } from '../../core.ts';
import type { SbbDividerElement } from '../../divider/divider.component.ts';
import type { SbbOptionElement, SbbOptionHintElement } from '../../option.pure.ts';
import type { SbbAutocompleteButtonElement } from '../autocomplete-button/autocomplete-button.component.ts';

import { SbbAutocompleteBaseElement } from './autocomplete-base-element.ts';

let nextId = 0;

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

/**
 * Combined with a native input, it displays a panel with a list of available options.
 *
 * @slot - Use the unnamed slot to add `sbb-option` or `sbb-optgroup` elements to the `sbb-autocomplete`.
 * @cssprop [--sbb-autocomplete-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 * @cssprop [--sbb-options-panel-max-height] - Maximum height of the options panel.
 * If the calculated remaining space is smaller, the value gets ignored.
 */
export class SbbAutocompleteElement<T = string> extends SbbAutocompleteBaseElement<T> {
  public static override readonly elementName: string = 'sbb-autocomplete';
  public static override readonly role = ariaRoleOnHost ? 'listbox' : null;
  protected overlayId = `sbb-autocomplete-${++nextId}`;
  protected panelRole = 'listbox';

  /** Index of the active element within the active option's row (0 = option, >0 = a button). */
  private _activeColumnIndex = 0;

  protected get options(): SbbOptionElement<T>[] {
    return Array.from(this.querySelectorAll?.<SbbOptionElement<T>>('sbb-option') ?? []);
  }

  protected syncNegative(): void {
    this.querySelectorAll?.<SbbDividerElement | SbbOptionHintElement>(
      'sbb-divider, sbb-option-hint',
    ).forEach((el) => (el.negative = this.negative));
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
   * Select or activate an element on 'Enter' keypress.
   * If a button is currently focused, it is clicked instead.
   */
  protected selectByKeyboard(event: KeyboardEvent): void {
    if (this.activeOption) {
      // We are currently selecting an option and therefore the Enter press shouldn't trigger a form submit
      event.preventDefault();

      if (this._activeColumnIndex === 0) {
        this.activeOption['selectViaUserInteraction'](true);
      } else {
        this._elementsInRow()[this._activeColumnIndex]?.click();
      }
    }
  }

  protected setNextActiveOption(event?: KeyboardEvent): void {
    const enabledOptions = this.options.filter((opt) => !opt.matches(':state(disabled)'));

    // Reset potentially active element
    this.activeOption?.setActive(false);
    this._resetActiveButton();
    this.triggerElement!.ariaActiveDescendantElement = null;

    if (!enabledOptions.length) {
      this.activeOption = null;
      return;
    }

    const activeItemIndex = this.activeOption
      ? enabledOptions.indexOf(this.activeOption as SbbOptionElement<T>)
      : -1;

    // Get and activate the next active option
    const next = getNextElementIndex(event, activeItemIndex, enabledOptions.length);
    this.activeOption = enabledOptions[next];
    this.activeOption.setActive(true);
    this.triggerElement!.ariaActiveDescendantElement = this.activeOption;
    this.activeOption.scrollIntoView({ block: 'nearest' });

    // Moving the active option should not move the input cursor (caret)
    if (event) {
      event.preventDefault();
    }

    // If 'autoSelectActiveOption' and is triggered from a keyboard event
    if (this.autoSelectActiveOption && event) {
      this.setPendingSelection(this.activeOption);
    }
  }

  /**
   * Moves the active element horizontally within the active option's `sbb-autocomplete-row`,
   * between the option itself and its `sbb-autocomplete-button`s.
   * Does nothing if the active option is not wrapped in a row, or the row has no buttons.
   */
  private _setNextHorizontalActiveElement(event: KeyboardEvent): void {
    if (!this.activeOption) {
      return;
    }

    const elementsInRow = this._elementsInRow();

    if (elementsInRow.length < 2) {
      return;
    }
    event.preventDefault();

    const nextIndex = getNextElementIndex(event, this._activeColumnIndex, elementsInRow.length);
    const current = elementsInRow[this._activeColumnIndex];
    const next = elementsInRow[nextIndex];

    current.setActive(false);
    next.setActive(true);

    this.triggerElement!.ariaActiveDescendantElement = next;
    next.scrollIntoView({ block: 'nearest' });
    this._activeColumnIndex = nextIndex;
  }

  private _resetActiveButton(): void {
    if (this._activeColumnIndex === 0) {
      return;
    }
    this._activeColumnIndex = 0;
    this.activeOption
      ?.closest('sbb-autocomplete-row')
      ?.querySelectorAll('sbb-autocomplete-button')
      .forEach((button) => button.setActive(false));
  }

  private _elementsInRow(
    option = this.activeOption,
  ): (SbbOptionElement<T> | SbbAutocompleteButtonElement)[] {
    return Array.from(
      option
        ?.closest('sbb-autocomplete-row')
        ?.querySelectorAll<SbbOptionElement<T> | SbbAutocompleteButtonElement>(
          'sbb-option, sbb-autocomplete-button',
        ) ?? [],
    ).filter((el) => !el.matches(':state(disabled)'));
  }

  protected resetActiveElement(): void {
    this._resetActiveButton();
    this.activeOption?.setActive(false);
    this.activeOption = null;

    if (this.triggerElement) {
      this.triggerElement.ariaActiveDescendantElement = null;
    }
  }

  protected setTriggerAttributes(element: HTMLInputElement): void {
    // autocomplete cannot use aria properties because they do not pierce shadow DOM
    setAriaComboBoxAttributes(element, ariaRoleOnHost ? this.id : this.overlayId, false);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete': SbbAutocompleteElement;
  }
}
