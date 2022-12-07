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
 * @returns A function to calculate the index of the element to move to:
 * if it is a 'previous' event, returns a function to get the index of the previous element,
 * or, if the current is the first in the list, the index of the last one;
 * if it is a 'next' event, returns a function to get the index of the next element,
 * or, if the current is the last in the list, the index of the first one.
 */
function getNextElementIndexFunction(
  event: KeyboardEvent
): (currentElementIndex: number, size: number) => number {
  let prevKey: string, nextKey: string;
  if (getDocumentWritingMode() === 'rtl') {
    prevKey = 'ArrowRight';
    nextKey = 'ArrowLeft';
  } else {
    prevKey = 'ArrowLeft';
    nextKey = 'ArrowRight';
  }

  if (event.key === prevKey || event.key === 'ArrowUp') {
    return (currentElementIndex: number, size: number) =>
      currentElementIndex === 0 ? size - 1 : currentElementIndex - 1;
  } else if (event.key === nextKey || event.key === 'ArrowDown') {
    return (currentElementIndex: number, size: number) =>
      currentElementIndex === size - 1 ? 0 : currentElementIndex + 1;
  }
}

/**
 * Gets the index of the element to move to based on the keyboard input, the current element in the list and the list size.
 * Uses the `getNextElementIndexFunction` method to get the right function for the calculation.
 * @param event The keyboard event to check.
 * @param current The index of the current element in the list.
 * @param size The size of the list.
 */
export function getNextElementIndex(event: KeyboardEvent, current: number, size: number): number {
  const getNextElementIndexFn: (currentElementIndex: number, size: number) => number =
    getNextElementIndexFunction(event);
  return getNextElementIndexFn(current, size);
}
