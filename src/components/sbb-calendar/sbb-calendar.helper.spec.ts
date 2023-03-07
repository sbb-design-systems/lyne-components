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

    const testsForCalendarSingleMonthView = (
      days: HTMLButtonElement[],
      clickedDays: { day: Day }[]
    ): void => {
      // Start is at index = 1; eventDown means +7, so index = 8; since it's even/disabled, it goes to 8 + 7 = 15.
      const fifteen = handleKeyboardEvent(eventDown, 1, days, clickedDays[1].day);
      expect(fifteen.value).toEqual('15');

      // Start is at index = 1; eventRight means +1, so index = 2; since it's even/disabled, it goes to 2 + 1 = 3.
      const three = handleKeyboardEvent(eventRight, 1, days, clickedDays[1].day);
      expect(three.value).toEqual('3');

      // Start is at index = 1; eventLeft means -1, so index = 0; since it's even/disabled, it goes to 0 - 1 = -1,
      //  which it's out of bound, so it stays on the starting element.
      const one = handleKeyboardEvent(eventLeft, 1, days, clickedDays[1].day);
      expect(one.value).toEqual('1');

      // Start is at index = 21; eventUp means -7, so index = 14; since it's even/disabled, it goes to 14 - 7 = 7.
      const seven = handleKeyboardEvent(eventUp, 21, days, clickedDays[21].day);
      expect(seven.value).toEqual('7');

      // Start is at index = 22; eventDown means +7, so index = 29.
      const twentyNine = handleKeyboardEvent(eventDown, 22, days, clickedDays[22].day);
      expect(twentyNine.value).toEqual('29');

      // Start is at index = 29; eventRight means +1, so index = 30.
      const thirty = handleKeyboardEvent(eventRight, 29, days, clickedDays[29].day);
      expect(thirty.value).toEqual('30');

      // Start is at index = 29; eventRight means -1, so index = 28.
      const twentyEight = handleKeyboardEvent(eventLeft, 29, days, clickedDays[29].day);
      expect(twentyEight.value).toEqual('28');

      // Start is at index = 21; eventUp means -7, so index = 22.
      const twentyTwo = handleKeyboardEvent(eventUp, 29, days, clickedDays[29].day);
      expect(twentyTwo.value).toEqual('22');

      // Start is at index = 23; eventHome means go to first cell, which is index = 0;
      //  since it's even/disabled, it goes to 0 + 1 = 1.
      const oneFromHome = handleKeyboardEvent(eventHome, 23, days, clickedDays[23].day);
      expect(oneFromHome.value).toEqual('1');

      // Start is at index = 4; eventHome means go to last cell, which is index = 30.
      const thirtyFromEnd = handleKeyboardEvent(eventEnd, 4, days, clickedDays[4].day);
      expect(thirtyFromEnd.value).toEqual('30');

      // Start is at index = 20; eventPageUp means go to the first in the same column;
      //  since 20 - 14 = 6 is disabled, it goes to 20 - 7 = 13.
      const fourteen = handleKeyboardEvent(eventPageUp, 20, days, clickedDays[20].day);
      expect(fourteen.value).toEqual('13');

      // Start is at index = 13; eventPageDown means go to the last in the same column, so 13 + 14 = 27.
      const twentySeven = handleKeyboardEvent(eventPageDown, 13, days, clickedDays[13].day);
      expect(twentySeven.value).toEqual('27');

      // Start is at index = 1; eventPageUp means go to the first in the same column;
      //  since there's nothing before, it stays at the same point.
      const oneFromPageUp = handleKeyboardEvent(eventPageUp, 1, days, clickedDays[1].day);
      expect(oneFromPageUp.value).toEqual('1');

      // Start is at index = 30; eventPageDown means go to the last in the same column;
      //  since there's nothing after, it stays at the same point.
      const thirtyFromPageDown = handleKeyboardEvent(eventPageDown, 30, days, clickedDays[30].day);
      expect(thirtyFromPageDown.value).toEqual('30');
    };

    it('should return the right value for each accepted key in single view mode', async () => {
      // Creates an array of 31 days (e.g. January); to test the disabled logic, even values smaller than 20 are disabled.
      const days = new Array(31).fill(0).map(
        (_, i) =>
          ({
            ...new HTMLButtonElement(),
            value: '' + i,
            disabled: i % 2 === 0 && i < 20,
          } as HTMLButtonElement)
      );

      // Support object used to define the Day object for the handleKeyboardEvent method as it comes from the calendar.
      const clickedDays = days.map((_, i) => ({
        day: createDay(String(i + 1), '1'),
      }));

      testsForCalendarSingleMonthView(days, clickedDays);

      // Start is at index = 29; eventDown means +7, so index = 36;
      //  since it's out of bound, so it stays on the starting element.
      const twentyNine = handleKeyboardEvent(eventDown, 29, days, clickedDays[29].day);
      expect(twentyNine.value).toEqual('29');

      // Start is at index = 30; eventRight means +1, so index = 31;
      //  since it's out of bound, so it stays on the starting element.
      const thirty = handleKeyboardEvent(eventRight, 30, days, clickedDays[30].day);
      expect(thirty.value).toEqual('30');
    });

    it('should return the right value for each accepted key in wide view mode', async () => {
      // Creates an array of 61 days (e.g. 31 August + 30 September);
      // to test the disabled logic, even values smaller than 20 and greater than 45 are disabled.
      const days = new Array(61).fill(0).map(
        (_, i) =>
          ({
            ...new HTMLButtonElement(),
            value: '' + i,
            disabled: i % 2 === 0 && (i < 20 || i > 45),
          } as HTMLButtonElement)
      );

      // Support object used to define the Day object for the handleKeyboardEvent method as it comes from the calendar.
      const clickedDays = days.map((_, i) => ({
        day: i < 31 ? createDay(String(i + 1), '8') : createDay(String(i + 1 - 31), '9'),
      }));

      testsForCalendarSingleMonthView(days, clickedDays);

      // Start is at index = 29; eventDown means +7, so index = 36;
      //  it's outside current month, so it goes to next month.
      const thirtySix = handleKeyboardEvent(eventDown, 29, days, clickedDays[29].day);
      expect(thirtySix.value).toEqual('36');

      // Start is at index = 30; eventRight means +1, so index = 31;
      //  it's outside current month, so it goes to next month.
      const thirty = handleKeyboardEvent(eventRight, 30, days, clickedDays[30].day);
      expect(thirty.value).toEqual('31');

      // Start is at index = 35; eventDown means +7, so index = 42.
      const fortyTwo = handleKeyboardEvent(eventDown, 35, days, clickedDays[35].day);
      expect(fortyTwo.value).toEqual('42');

      // Start is at index = 31; eventRight means +1, so index = 32.
      const thirtyTwo = handleKeyboardEvent(eventRight, 31, days, clickedDays[31].day);
      expect(thirtyTwo.value).toEqual('32');

      // Start is at index = 44; eventUp means -7, so index = 37
      const thirtySeven = handleKeyboardEvent(eventUp, 44, days, clickedDays[44].day);
      expect(thirtySeven.value).toEqual('37');

      // Start is at index = 40; eventLeft means -1, so index = 39.
      const thirtyNine = handleKeyboardEvent(eventLeft, 40, days, clickedDays[40].day);
      expect(thirtyNine.value).toEqual('39');

      // Start is at index = 39; eventDown means +7, so index = 46;
      //  since it's even/disabled, it goes to 46 + 7 = 53.
      const fiftyThree = handleKeyboardEvent(eventDown, 39, days, clickedDays[39].day);
      expect(fiftyThree.value).toEqual('53');

      // Start is at index = 47; eventRight means +1, so index = 48;
      //  since it's even/disabled, it goes to 48 + 1 = 49.
      const fortySeven = handleKeyboardEvent(eventRight, 47, days, clickedDays[47].day);
      expect(fortySeven.value).toEqual('49');

      // Start is at index = 59; eventUp means -7, so index = 52;
      //  since it's even/disabled, it goes to 52 - 7 = 45.
      const fortyFive = handleKeyboardEvent(eventUp, 59, days, clickedDays[59].day);
      expect(fortyFive.value).toEqual('45');

      // Start is at index = 59; eventLeft means -1, so index = 58;
      //  since it's even/disabled, it goes to 58 - 1 = 57.
      const fiftySeven = handleKeyboardEvent(eventLeft, 59, days, clickedDays[59].day);
      expect(fiftySeven.value).toEqual('57');

      // Start is at index = 49; eventHome means go to first cell,
      // which is the first element of the second month, so index = 31.
      const thirtyOne = handleKeyboardEvent(eventHome, 49, days, clickedDays[49].day);
      expect(thirtyOne.value).toEqual('31');

      // Start is at index = 34; eventEnd means go to last cell, which is index = 60;
      //  since it's even/disabled, it goes to 60 - 1 = 59.
      const sixty = handleKeyboardEvent(eventEnd, 34, days, clickedDays[34].day);
      expect(sixty.value).toEqual('59');

      // Start is at index = 55; eventPageUp means go to the first in the same column, so 55 - 21 = 34.
      const thirtyFour = handleKeyboardEvent(eventPageUp, 55, days, clickedDays[55].day);
      expect(thirtyFour.value).toEqual('34');

      // Start is at index = 33; eventPageDown means go to the last in the same column, so 31 + 28 = 59.
      const fiftyNineFromPageDown = handleKeyboardEvent(
        eventPageDown,
        31,
        days,
        clickedDays[31].day
      );
      expect(fiftyNineFromPageDown.value).toEqual('59');

      // Start is at index = 31; eventPageUp means go to the first in the same column;
      //  since there's nothing before, it stays at the same point.
      const thirtyOneFromPageUp = handleKeyboardEvent(eventPageUp, 31, days, clickedDays[31].day);
      expect(thirtyOneFromPageUp.value).toEqual('31');

      // Start is at index = 57; eventPageDown means go to the last in the same column;
      //  since there's nothing after, it stays at the same point.
      const fiftySevenFromPageDown = handleKeyboardEvent(
        eventPageDown,
        57,
        days,
        clickedDays[57].day
      );
      expect(fiftySevenFromPageDown.value).toEqual('57');
    });
  });
});
