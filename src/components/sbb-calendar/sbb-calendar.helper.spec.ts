import { Day, handleKeyboardEvent } from './sbb-calendar.helper';

describe('SbbCalendarHelper', () => {
  describe('handleKeyboardEvent', () => {
    const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    const eventPageUp = new KeyboardEvent('keydown', { key: 'PageUp' });
    const eventPageDown = new KeyboardEvent('keydown', { key: 'PageDown' });
    const eventHome = new KeyboardEvent('keydown', { key: 'Home' });
    const eventEnd = new KeyboardEvent('keydown', { key: 'End' });

    const createDay: (dayValue: string, monthValue: string) => Day = (
      dayValue: string,
      monthValue: string
    ) => {
      return { value: '', dayValue, monthValue, yearValue: '2023' };
    };

    it('should return the right value for each accepted key in single view mode', async () => {
      // Creates an array of 31 days (e.g. January); to test the disabled logic, even values smaller than 20 are disabled.
      const days = new Array(31)
        .fill(0)
        .map((_, i) => ({ value: i, disabled: i % 2 === 0 && i < 20 }));

      // Support object used to define the Day object for the handleKeyboardEvent method as it comes from the calendar.
      const clickedDays = days.map((_, i) => ({
        day: createDay(String(i + 1), '1'),
      }));

      // Start is at index = 1; eventDown means +7, so index = 8; since it's even/disabled, it goes to 8 + 7 = 15.
      const fifteen = handleKeyboardEvent(eventDown, 1, days, clickedDays[1].day);
      expect(fifteen.value).toEqual(15);

      // Start is at index = 1; eventRight means +1, so index = 2; since it's even/disabled, it goes to 2 + 1 = 3.
      const three = handleKeyboardEvent(eventRight, 1, days, clickedDays[1].day);
      expect(three.value).toEqual(3);

      // Start is at index = 1; eventLeft means -1, so index = 0; since it's even/disabled, it goes to 0 - 1 = -1,
      //  which it's out of bound, so it stays on the starting element.
      const one = handleKeyboardEvent(eventLeft, 1, days, clickedDays[1].day);
      expect(one.value).toEqual(1);

      // Start is at index = 21; eventUp means -7, so index = 14; since it's even/disabled, it goes to 14 - 7 = 7.
      const seven = handleKeyboardEvent(eventUp, 21, days, clickedDays[21].day);
      expect(seven.value).toEqual(7);

      // Start is at index = 29; eventDown means +7, so index = 36;
      //  since it's out of bound, so it stays on the starting element.
      const twentyNine = handleKeyboardEvent(eventDown, 29, days, clickedDays[29].day);
      expect(twentyNine.value).toEqual(29);

      // Start is at index = 29; eventRight means +1, so index = 30.
      const thirty = handleKeyboardEvent(eventRight, 29, days, clickedDays[29].day);
      expect(thirty.value).toEqual(30);

      // Start is at index = 29; eventRight means -1, so index = 28.
      const twentyEight = handleKeyboardEvent(eventLeft, 29, days, clickedDays[29].day);
      expect(twentyEight.value).toEqual(28);

      // Start is at index = 21; eventUp means -7, so index = 22.
      const twentyTwo = handleKeyboardEvent(eventUp, 29, days, clickedDays[29].day);
      expect(twentyTwo.value).toEqual(22);

      // Start is at index = 23; eventHome means go to first cell, which is index = 0;
      //  since it's even/disabled, it goes to 0 + 1 = 1.
      const oneFromHome = handleKeyboardEvent(eventHome, 23, days, clickedDays[23].day);
      expect(oneFromHome.value).toEqual(1);

      // Start is at index = 4; eventHome means go to last cell, which is index = 30.
      const thirtyFromEnd = handleKeyboardEvent(eventEnd, 4, days, clickedDays[4].day);
      expect(thirtyFromEnd.value).toEqual(30);

      // Start is at index = 20; eventPageUp means go to the first in the same column;
      //  since 20 - 14 = 6 is disabled, it goes to 20 - 7 = 13.
      const fourteen = handleKeyboardEvent(eventPageUp, 20, days, clickedDays[20].day);
      expect(fourteen.value).toEqual(13);

      // Start is at index = 13; eventPageDown means go to the last in the same column, so 13 + 14 = 27.
      const twentySeven = handleKeyboardEvent(eventPageDown, 13, days, clickedDays[13].day);
      expect(twentySeven.value).toEqual(27);

      // Start is at index = 1; eventPageUp means go to the first in the same column;
      //  since there's nothing before, it stays at the same point.
      const oneFromPageUp = handleKeyboardEvent(eventPageUp, 1, days, clickedDays[1].day);
      expect(oneFromPageUp.value).toEqual(1);

      // Start is at index = 30; eventPageDown means go to the last in the same column;
      //  since there's nothing after, it stays at the same point.
      const thirtyFromPageDown = handleKeyboardEvent(eventPageDown, 30, days, clickedDays[30].day);
      expect(thirtyFromPageDown.value).toEqual(30);
    });
  });
});
