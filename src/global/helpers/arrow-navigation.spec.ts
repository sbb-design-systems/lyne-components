import { getNextElementIndex, isArrowKeyPressed } from './arrow-navigation';

describe('isArrowKeyPressed', () => {
  it('should return false', () => {
    const event = new KeyboardEvent('keydown', { key: 'Test' });
    expect(isArrowKeyPressed(event)).toEqual(false);
  });

  it('should return true', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    expect(isArrowKeyPressed(event)).toEqual(true);
  });
});

describe('getNextElementIndex', () => {
  describe('ltr', () => {
    it('should return the next element', function () {
      const size = 10;
      const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      expect(getNextElementIndex(eventDown, 0, size)).toEqual(1);
      expect(getNextElementIndex(eventRight, 1, size)).toEqual(2);
      expect(getNextElementIndex(eventDown, size - 2, size)).toEqual(9);
      expect(getNextElementIndex(eventRight, size - 1, size)).toEqual(0);

      // current out of bound tests
      expect(getNextElementIndex(eventDown, -1, size)).toEqual(0);
      expect(getNextElementIndex(eventRight, size, size)).toEqual(0);
    });

    it('should return the previous element', function () {
      const size = 10;
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      expect(getNextElementIndex(eventUp, size - 1, size)).toEqual(8);
      expect(getNextElementIndex(eventLeft, size - 2, size)).toEqual(7);
      expect(getNextElementIndex(eventUp, 1, size)).toEqual(0);
      expect(getNextElementIndex(eventLeft, 0, size)).toEqual(9);

      // current out of bound tests
      expect(getNextElementIndex(eventUp, -1, size)).toEqual(size - 1);
      expect(getNextElementIndex(eventLeft, size, size)).toEqual(size - 1);
    });
  });

  describe('rtl', () => {
    beforeEach(() => {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    });

    it('should return the next element', function () {
      const size = 10;
      const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      expect(getNextElementIndex(eventDown, 0, size)).toEqual(1);
      expect(getNextElementIndex(eventLeft, 1, size)).toEqual(2);
      expect(getNextElementIndex(eventDown, size - 2, size)).toEqual(9);
      expect(getNextElementIndex(eventLeft, size - 1, size)).toEqual(0);
    });

    it('should return the previous element', function () {
      const size = 10;
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      expect(getNextElementIndex(eventUp, size - 1, size)).toEqual(8);
      expect(getNextElementIndex(eventRight, size - 2, size)).toEqual(7);
      expect(getNextElementIndex(eventUp, 1, size)).toEqual(0);
      expect(getNextElementIndex(eventRight, 0, size)).toEqual(9);
    });
  });
});
