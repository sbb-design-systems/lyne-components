import { customElement } from 'lit/decorators.js';

import { getNextElementIndex } from '../core/a11y.js';
import { isSafari } from '../core/dom.js';
import { setAriaComboBoxAttributes } from '../core/overlay.js';
import type { SbbDividerElement } from '../divider/divider.component.js';
import type { SbbOptGroupElement, SbbOptionElement, SbbOptionHintElement } from '../option.js';

import { SbbAutocompleteBaseElement } from './autocomplete-base-element.js';

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
 */
export
@customElement('sbb-autocomplete')
class SbbAutocompleteElement<T = string> extends SbbAutocompleteBaseElement<T> {
  public static override readonly role = ariaRoleOnHost ? 'listbox' : null;
  protected overlayId = `sbb-autocomplete-${++nextId}`;
  protected panelRole = 'listbox';

  protected get options(): SbbOptionElement<T>[] {
    return Array.from(this.querySelectorAll?.<SbbOptionElement<T>>('sbb-option') ?? []);
  }

  public constructor() {
    super();
    this.addEventListener?.('optionselected', (e: Event) => this.onOptionSelected(e));
  }

  protected syncNegative(): void {
    this.querySelectorAll?.<SbbDividerElement | SbbOptionHintElement>(
      'sbb-divider, sbb-option-hint',
    ).forEach((el) => (el.negative = this.negative));

    this.querySelectorAll?.<SbbOptionElement<T> | SbbOptGroupElement>(
      'sbb-option, sbb-optgroup',
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
    }
  }

  protected selectByKeyboard(event: KeyboardEvent): void {
    if (this.activeOption) {
      // We are currently selecting an option and therefore the Enter press shouldn't trigger a form submit
      event.preventDefault();

      this.activeOption['selectViaUserInteraction'](true);
    }
  }

  protected setNextActiveOption(event?: KeyboardEvent): void {
    const enabledOptions = this.options.filter(
      (opt) => !opt.disabled && !opt.hasAttribute('data-group-disabled'),
    );

    // Reset potentially active option
    this.activeOption?.setActive(false);
    this.triggerElement?.removeAttribute('aria-activedescendant');

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
    this.triggerElement?.setAttribute('aria-activedescendant', this.activeOption.id);
    this.activeOption.scrollIntoView({ block: 'nearest' });
    if (this.autoSelectActiveOption) {
      this.onOptionArrowsSelected(this.activeOption);
    }
  }

  protected resetActiveElement(): void {
    this.activeOption?.setActive(false);
    this.triggerElement?.removeAttribute('aria-activedescendant');
    this.activeOption = null;
  }

  protected setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, ariaRoleOnHost ? this.id : this.overlayId, false);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete': SbbAutocompleteElement;
  }
}
