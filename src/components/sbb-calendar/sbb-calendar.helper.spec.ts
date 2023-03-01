import { handleKeyboardEvent } from './sbb-calendar.helper';

describe('SbbCalendarHelper', () => {
  describe('handleKeyboardEvent', () => {
    it('should return the right value for each accepted key', async () => {
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Even values smaller than 20 are disabled.
      const days = new Array(31)
        .fill(0)
        .map((_, i) => ({ value: i, disabled: i % 2 === 0 && i < 20 }));

      // Start is at index = 1; eventDown means +7, so index = 8; since it's even/disabled, it goes to 8 + 7 = 15.
      const fifteen = handleKeyboardEvent(eventDown, 1, days);
      expect(fifteen.value).toEqual(15);

      // Start is at index = 1; eventRight means +1, so index = 2; since it's even/disabled, it goes to 2 + 1 = 3.
      const three = handleKeyboardEvent(eventRight, 1, days);
      expect(three.value).toEqual(3);

      // Start is at index = 1; eventLeft means -1, so index = 0; since it's even/disabled, it goes to 0 - 1 = -1,
      //  which it's out of bound, so it stays on the starting element.
      const one = handleKeyboardEvent(eventLeft, 1, days);
      expect(one.value).toEqual(1);

      // Start is at index = 21; eventUp means -7, so index = 14; since it's even/disabled, it goes to 14 - 7 = 7.
      const seven = handleKeyboardEvent(eventUp, 21, days);
      expect(seven.value).toEqual(7);

      // Start is at index = 29; eventDown means +7, so index = 36;
      //  since it's out of bound, so it stays on the starting element.
      const twentyNine = handleKeyboardEvent(eventDown, 29, days);
      expect(twentyNine.value).toEqual(29);

      // Start is at index = 29; eventRight means +1, so index = 30.
      const thirty = handleKeyboardEvent(eventRight, 29, days);
      expect(thirty.value).toEqual(30);

      // Start is at index = 29; eventRight means -1, so index = 28.
      const twentyEight = handleKeyboardEvent(eventLeft, 29, days);
      expect(twentyEight.value).toEqual(28);

      // Start is at index = 21; eventUp means -7, so index = 22.
      const twentyTwo = handleKeyboardEvent(eventUp, 29, days);
      expect(twentyTwo.value).toEqual(22);
    });
  });
});
