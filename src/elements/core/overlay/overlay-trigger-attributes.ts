/**
 * Set meaningful aria properties to trigger elements that are connected to
 * overlay elements such as menus and dialogs.
 */
export function setAriaOverlayTriggerProperties(
  overlay: HTMLElement,
  trigger: HTMLElement,
  popupType: 'menu' | 'dialog',
  state: string,
): void {
  if (!trigger) {
    return;
  }

  trigger.ariaHasPopup = popupType;
  trigger.ariaControlsElements = [overlay];
  trigger.ariaExpanded = `${state === 'opening' || state === 'opened'}`;
}

/**
 * Reset trigger element aria properties.
 */
export function removeAriaOverlayTriggerProperties(trigger: HTMLElement | null | undefined): void {
  if (!trigger) {
    return;
  }

  trigger.ariaHasPopup = null;
  trigger.ariaControlsElements = null;
  trigger.ariaExpanded = null;
}

/**
 * Add meaningful aria attributes to trigger element of role='combobox'
 */
export function setAriaComboBoxAttributes(
  trigger: HTMLElement,
  overlayId: string,
  expanded: boolean,
  hasPopup: 'listbox' | 'grid' = 'listbox',
): void {
  if (!trigger) {
    return;
  }

  trigger.setAttribute('autocomplete', 'off');
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-autocomplete', 'list');
  trigger.setAttribute('aria-haspopup', hasPopup);
  trigger.setAttribute('aria-controls', overlayId);
  trigger.setAttribute('aria-owns', overlayId); // From Aria 1.2 this should not be necessary, but safari still needs it
  trigger.setAttribute('aria-expanded', `${expanded}`);
}

/**
 * Remove aria attributes from trigger elements.
 */
export function removeAriaComboBoxAttributes(trigger?: HTMLElement | null): void {
  if (!trigger) {
    return;
  }

  trigger.removeAttribute('autocomplete');
  trigger.removeAttribute('role');
  trigger.removeAttribute('aria-autocomplete');
  trigger.removeAttribute('aria-haspopup');
  trigger.removeAttribute('aria-controls');
  trigger.removeAttribute('aria-owns');
  trigger.removeAttribute('aria-expanded');
}
