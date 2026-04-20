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
  if (!overlay || !trigger) {
    return;
  }

  trigger.ariaHasPopup = popupType;
  trigger.ariaControlsElements = [overlay];
  trigger.ariaExpanded = `${state === 'opening' || state === 'opened'}`;
}

/**
 * Resets aria properties from trigger elements.
 */
export function removeAriaOverlayTriggerProperties(trigger: HTMLElement | null | undefined): void {
  if (!trigger) {
    return;
  }

  trigger.ariaHasPopup = null;
  trigger.ariaControlsElements = null;
  trigger.ariaExpanded = null;
}
