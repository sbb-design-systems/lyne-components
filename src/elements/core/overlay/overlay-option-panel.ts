import { type SbbElementInternalsMixinType, ɵstateController } from '../mixins.ts';

import { getElementPosition } from './position.ts';

/**
 * Places the overlay in the correct position.
 * @param dialog The reference to the dialog element.
 * @param originElement The reference to the element the dialog is attached to.
 * @param optionContainer The reference to the option panel.
 * @param container The element which has the position:fixed applied.
 * @param element The reference to the component.
 * @param position The allowed position of the overlay relative to the origin.
 */
export function setOverlayPosition(
  dialog: HTMLElement,
  originElement: HTMLElement,
  optionContainer: HTMLElement,
  container: HTMLElement,
  element: HTMLElement & SbbElementInternalsMixinType,
  position: 'auto' | 'above' | 'below' = 'auto',
): void {
  if (!dialog || !originElement) {
    return;
  }

  // Set the width to match the trigger element
  element.style.setProperty('--sbb-options-panel-width', `${originElement.offsetWidth}px`);

  // Set the origin height
  element.style.setProperty('--sbb-options-panel-origin-height', `${originElement.offsetHeight}px`);

  // Calculate and set the position
  const panelPosition = getElementPosition(optionContainer, originElement, container, {
    forceBelow: position === 'below',
    forceAbove: position === 'above',
  });

  element.style.setProperty('--sbb-options-panel-position-x', `${panelPosition.left}px`);
  element.style.setProperty('--sbb-options-panel-position-y', `${panelPosition.top}px`);
  element.style.setProperty('--sbb-options-panel-max-height-calculated', panelPosition.maxHeight);
  const controller = ɵstateController(element);
  if (panelPosition.alignment.vertical === 'above') {
    controller.add('options-panel-position-above');
    controller.delete('options-panel-position-below');
  } else {
    controller.add('options-panel-position-below');
    controller.delete('options-panel-position-above');
  }
  originElement.setAttribute('data-options-panel-position', panelPosition.alignment.vertical);
}
