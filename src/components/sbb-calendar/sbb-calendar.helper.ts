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

export function handleKeyboardEvent(evt: KeyboardEvent, days: HTMLButtonElement[]): void {
  const arrowsKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
  if (arrowsKeys.includes(evt.key)) {
    evt.preventDefault();
  }
  const index = days.findIndex((e) => e === evt.target);
  const findNext = (increment: number): HTMLButtonElement => {
    let newIndex = index + increment;
    while (newIndex < days.length && days[newIndex]?.disabled) {
      newIndex += increment;
    }
    return days[newIndex] ?? days[index];
  };

  switch (evt.key) {
    case 'ArrowUp':
      findNext(-7).focus();
      break;
    case 'ArrowDown':
      findNext(7).focus();
      break;
    case 'ArrowLeft':
      findNext(-1).focus();
      break;
    case 'ArrowRight':
      findNext(1).focus();
      break;
  }
}
