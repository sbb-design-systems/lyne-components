export interface Day {
  value: string;
  dayValue: string;
  monthValue: string;
  yearValue: string;
}

export interface Weekday {
  long: string;
  narrow: string;
}

/**
 * Gets the next element of the provided array starting from `index` by adding `delta`.
 * If the found element is disabled, it continues adding `delta` until it finds an enabled one in the array bounds.
 * @param days The array to search.
 * @param index The starting index.
 * @param delta The value to add or subtract.
 */
function findNext<T extends { disabled: boolean }>(days: T[], index: number, delta: number): T {
  let nextIndex = index + delta;
  while (nextIndex < days.length && days[nextIndex]?.disabled) {
    nextIndex += delta;
  }
  return days[nextIndex] ?? days[index];
}

/**
 * Find the first enabled element in the provided array.
 * @param days The array to search.
 */
function findFirst<T extends { disabled: boolean }>(days: T[]): T {
  return !days[0].disabled ? days[0] : findNext(days, 0, 1);
}

/**
 * Find the first enabled element in the same column the provided array.
 * @param days The array to search.
 * @param index The starting index.
 */
function findFirstOnColumn<T extends { disabled: boolean }>(days: T[], index: number): T {
  const nextIndex = index % 7;
  return !days[nextIndex].disabled ? days[nextIndex] : findNext(days, nextIndex, 7);
}

/**
 * Find the last enabled element in the same column the provided array.
 * @param days The array to search.
 * @param index The starting index.
 */
function findLastOnColumn<T extends { disabled: boolean }>(days: T[], index: number): T {
  const nextIndex = index + Math.trunc((days.length - index - 1) / 7) * 7;
  return !days[nextIndex].disabled ? days[nextIndex] : findNext(days, nextIndex, -7);
}

/**
 * Find the last enabled element in the provided array.
 * @param days The array to search.
 */
function findLast<T extends { disabled: boolean }>(days: T[]): T {
  return !days[days.length - 1].disabled
    ? days[days.length - 1]
    : findNext(days, days.length - 1, 1);
}

/**
 * Gets the index of the element to move to, based on a list of elements, which can be potentially disabled,
 * the keyboard input and the position of the current element in the list.
 * @param evt The keyboard event to check.
 * @param index The index of the current element in the list.
 * @param days An array of objects that have the `disabled` property.
 */
export function handleKeyboardEvent<T extends { disabled: boolean }>(
  evt: KeyboardEvent,
  index: number,
  days: T[]
): T {
  switch (evt.key) {
    case 'ArrowUp':
      return findNext(days, index, -7);
    case 'ArrowDown':
      return findNext(days, index, 7);
    case 'ArrowLeft':
      return findNext(days, index, -1);
    case 'ArrowRight':
      return findNext(days, index, 1);
    case 'Home':
      return findFirst(days);
    case 'PageUp':
      return findFirstOnColumn(days, index);
    case 'PageDown':
      return findLastOnColumn(days, index);
    case 'End':
      return findLast(days);
  }
}
