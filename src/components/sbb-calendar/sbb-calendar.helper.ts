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
  const findNext = (increment: number): T => {
    let nextIndex = index + increment;
    while (nextIndex < days.length && days[nextIndex]?.disabled) {
      nextIndex += increment;
    }
    return days[nextIndex] ?? days[index];
  };

  const findLastOnColumn = (): T => {
    let nextIndex = index + Math.trunc((days.length - index - 1) / 7) * 7;
    while (nextIndex > index && days[nextIndex]?.disabled) {
      nextIndex -= 7;
    }
    return days[nextIndex] ?? days[index];
  };

  const findFirstOnColumn = (): T => {
    let nextIndex = index % 7;
    while (nextIndex < index && days[nextIndex]?.disabled) {
      nextIndex += 7;
    }
    return days[nextIndex] ?? days[index];
  };

  const findFirst = (): T => {
    let nextIndex = 0;
    while (nextIndex < index && days[nextIndex]?.disabled) {
      nextIndex += 1;
    }
    return days[nextIndex] ?? days[index];
  };

  const findLast = (): T => {
    let nextIndex = days.length - 1;
    while (nextIndex > index && days[nextIndex]?.disabled) {
      nextIndex -= 1;
    }
    return days[nextIndex] ?? days[index];
  };

  switch (evt.key) {
    case 'ArrowUp':
      return findNext(-7);
    case 'ArrowDown':
      return findNext(7);
    case 'ArrowLeft':
      return findNext(-1);
    case 'ArrowRight':
      return findNext(1);
    case 'PageDown':
      return findLastOnColumn();
    case 'PageUp':
      return findFirstOnColumn();
    case 'Home':
      return findFirst();
    case 'End':
      return findLast();
  }
}
