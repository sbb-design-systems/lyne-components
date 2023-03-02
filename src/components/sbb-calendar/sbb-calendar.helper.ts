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
 * @param firstOfCurrentMonth The index of the first day of the month.
 */
function findFirst<T extends { disabled: boolean }>(days: T[], firstOfCurrentMonth: number): T {
  return !days[firstOfCurrentMonth].disabled
    ? days[firstOfCurrentMonth]
    : findNext(days, firstOfCurrentMonth, 1);
}

/**
 * Find the last enabled element in the provided array.
 * @param days The array to search.
 * @param lastOfCurrentMonth The index of the last day of the month.
 */
function findLast<T extends { disabled: boolean }>(days: T[], lastOfCurrentMonth: number): T {
  return !days[lastOfCurrentMonth].disabled
    ? days[lastOfCurrentMonth]
    : findNext(days, lastOfCurrentMonth, -1);
}

/**
 * Find the first enabled element in the same column the provided array.
 * @param days The array to search.
 * @param index The starting index.
 * @param offset The day's offset from the first month.
 */
function findFirstOnColumn<T extends { disabled: boolean }>(
  days: T[],
  index: number,
  offset: number
): T {
  const nextIndex = (index % 7) + offset;
  return !days[nextIndex].disabled ? days[nextIndex] : findNext(days, nextIndex, 7);
}

/**
 * Find the last enabled element in the same column the provided array.
 * @param days The array to search.
 * @param index The starting index.
 * @param offset The day's offset from the first month.
 */
function findLastOnColumn<T extends { disabled: boolean }>(
  days: T[],
  index: number,
  offset: number
): T {
  const nextIndex = index + Math.trunc((offset - index - 1) / 7) * 7;
  return !days[nextIndex].disabled ? days[nextIndex] : findNext(days, nextIndex, -7);
}

/**
 * Gets the index of the element to move to, based on a list of elements, which can be potentially disabled,
 * the keyboard input and the position of the current element in the list.
 *
 * It handles the two months view in `wide` mode this way:
 *  - `Home`/`End` keys return the index of the first/last day of the current month;
 *  - `PageUp` / `PageDown` keys return the index of the first/last weekday of the current month.
 *
 * @param evt The keyboard event to check.
 * @param index The index of the current element in the list.
 * @param days An array of objects that have the `disabled` property (HTMLButtonElements in sbb-calendar).
 * @param day The day object you move from.
 */
export function handleKeyboardEvent<T extends { disabled: boolean }>(
  evt: KeyboardEvent,
  index: number,
  days: T[],
  day: Day
): T {
  // Calculate the index of the starting day in the month.
  const indexInMonth = +day.dayValue - 1;

  // Calculates the day's offset from the first month
  // (in single view, it's zero, in wide view it's the number of days of the first month).
  const firstMonthOffset = index - indexInMonth;

  // Calculates the index of the last day in the starting month.
  // When one month is displayed, it is exactly the length of the `days` array, and same when two months are displayed,
  // but the starting position is in the second one; if the starting position is in the first one, it calculates
  // the last day using the year and month value and setting the day to zero.
  const indexOfLastDayOfCurrentMonth =
    index === indexInMonth ? new Date(+day.yearValue, +day.monthValue, 0).getDate() : days.length;

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
      return findFirst(days, firstMonthOffset);
    case 'PageUp':
      return findFirstOnColumn(days, indexInMonth, firstMonthOffset);
    case 'PageDown':
      return findLastOnColumn(days, index, indexOfLastDayOfCurrentMonth);
    case 'End':
      return findLast(days, indexOfLastDayOfCurrentMonth - 1);
  }
}
