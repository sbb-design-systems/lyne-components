import { getElementPosition } from './position';

/**
 * Places the overlay in the correct position.
 * @param dialog The reference to the dialog element.
 * @param originElement The reference to the element the dialog is attached to.
 * @param optionContainer The reference to the option panel.
 * @param element The reference to the component.
 */
export function setOverlayPosition(
  dialog: HTMLElement,
  originElement: HTMLElement,
  optionContainer: HTMLElement,
  element: HTMLElement
): void {
  if (!dialog || !originElement) {
    return;
  }

  // Set the width to match the trigger element
  element.style.setProperty('--sbb-options-panel-width', `${originElement.offsetWidth}px`);

  // Set the origin height
  element.style.setProperty('--sbb-options-panel-origin-height', `${originElement.offsetHeight}px`);

  // Calculate and set the position
  const panelPosition = getElementPosition(optionContainer, originElement);

  element.style.setProperty('--sbb-options-panel-position-x', `${panelPosition.left}px`);
  element.style.setProperty('--sbb-options-panel-position-y', `${panelPosition.top}px`);
  element.style.setProperty('--sbb-options-panel-max-height', panelPosition.maxHeight);
  element.setAttribute('data-options-panel-position', panelPosition.alignment.vertical);
  originElement.setAttribute('data-options-panel-position', panelPosition.alignment.vertical);
}

export function attachOpenPanelEvents(
  setOverlayPosition: () => void,
  onBackdropClick: (event: PointerEvent) => void,
  onKeydownEvent: (event: KeyboardEvent) => void
): AbortController {
  const openPanelEventsController = new AbortController();
  document.addEventListener('scroll', () => setOverlayPosition(), {
    passive: true,
    signal: openPanelEventsController.signal,
  });
  window.addEventListener('resize', () => setOverlayPosition(), {
    passive: true,
    signal: openPanelEventsController.signal,
  });
  window.addEventListener('click', (event: PointerEvent) => onBackdropClick(event), {
    signal: openPanelEventsController.signal,
  });
  window.addEventListener('keydown', (event: KeyboardEvent) => onKeydownEvent(event), {
    signal: openPanelEventsController.signal,
  });
  return openPanelEventsController;
}
