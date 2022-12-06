import getDocumentWritingMode from './get-document-writing-mode';

/**
 * Check if the key pressed is among those allowed for navigation.
 * @param event The keyboard event to check.
 */
export function isArrowKeyPressed(event: KeyboardEvent): boolean {
  return ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
}

/**
 * Checks the direction of the navigation event in the current writing mode.
 * Returns the right function for calculate the next element's index,
 * based on the of the current element's index and the size of the list to navigate.
 * @param event The event to check.
 * @returns if is a 'previous' event, go to the previous element, or to the last one if the current is the first in the list;
 * if it's a 'next' event, go to the next element, or to the first if the current one is the last in the list.
 */
export function getNextElementIndexFunction(
  event: KeyboardEvent
): (currentElementIndex, size) => number {
  let prevKey, nextKey;
  if (getDocumentWritingMode() === 'rtl') {
    prevKey = 'ArrowRight';
    nextKey = 'ArrowLeft';
  } else {
    prevKey = 'ArrowLeft';
    nextKey = 'ArrowRight';
  }

  if (event.key === prevKey || event.key === 'ArrowUp') {
    return (currentElementIndex, size) =>
      currentElementIndex === 0 ? size - 1 : currentElementIndex - 1;
  } else if (event.key === nextKey || event.key === 'ArrowDown') {
    return (currentElementIndex, size) =>
      currentElementIndex === size - 1 ? 0 : currentElementIndex + 1;
  }
}
