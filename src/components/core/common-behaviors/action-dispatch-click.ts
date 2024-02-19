/**
 * Dispatch a `click` event.
 * @param event The origin event.
 */
export const dispatchClickEvent = (event: KeyboardEvent): void => {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  (event.target as Element).dispatchEvent(
    new PointerEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: -1,
      pointerType: '',
      altKey,
      ctrlKey,
      metaKey,
      shiftKey,
    }),
  );
};

/**
 * Dispatches a 'click' PointerEvent if the original keyboard event is a 'Enter' press.
 * As verified with the native button, when 'Enter' is pressed, a 'click' event is dispatched
 * after the 'keypress' event.
 * @param event The origin event.
 */
export const dispatchClickEventWhenEnterKeypress = (event: KeyboardEvent): void => {
  if (event.key === 'Enter' || event.key === '\n') {
    dispatchClickEvent(event);
  }
};
