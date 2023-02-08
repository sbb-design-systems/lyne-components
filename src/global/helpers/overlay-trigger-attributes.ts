/**
 * Add meaningful aria attributes to trigger elements that are connected to
 * popup elements such as menus and dialogs.
 */
export function setAriaOverlayTriggerAttributes(
  trigger: HTMLElement,
  popupType: 'menu' | 'dialog',
  popupId: string,
  state: string
): void {
  if (!trigger) {
    return;
  }

  trigger.setAttribute('aria-haspopup', popupType);
  trigger.setAttribute('aria-controls', popupId);
  trigger.setAttribute('aria-expanded', `${state === 'opening' || state === 'opened'}`);
}

/**
 * Remove aria attributes from trigger elements.
 */
export function removeAriaOverlayTriggerAttributes(trigger: HTMLElement): void {
  if (!trigger) {
    return;
  }

  trigger.removeAttribute('aria-haspopup');
  trigger.removeAttribute('aria-controls');
  trigger.removeAttribute('aria-expanded');
}
