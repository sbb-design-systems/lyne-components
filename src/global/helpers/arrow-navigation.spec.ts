import { getNextElementIndexFunction, isArrowKeyPressed } from './arrow-navigation';

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

describe('getNextElementIndexFunction', () => {
  describe('ltr', () => {
    it('should return the next element', function () {
      const size = 10;
      const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      expect(getNextElementIndexFunction(eventDown)(0, size)).toEqual(1);
      expect(getNextElementIndexFunction(eventRight)(1, size)).toEqual(2);
      expect(getNextElementIndexFunction(eventDown)(size - 2, size)).toEqual(9);
      expect(getNextElementIndexFunction(eventRight)(size - 1, size)).toEqual(0);
    });

    it('should return the previous element', function () {
      const size = 10;
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      expect(getNextElementIndexFunction(eventUp)(size - 1, size)).toEqual(8);
      expect(getNextElementIndexFunction(eventLeft)(size - 2, size)).toEqual(7);
      expect(getNextElementIndexFunction(eventUp)(1, size)).toEqual(0);
      expect(getNextElementIndexFunction(eventLeft)(0, size)).toEqual(9);
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
      expect(getNextElementIndexFunction(eventDown)(0, size)).toEqual(1);
      expect(getNextElementIndexFunction(eventLeft)(1, size)).toEqual(2);
      expect(getNextElementIndexFunction(eventDown)(size - 2, size)).toEqual(9);
      expect(getNextElementIndexFunction(eventLeft)(size - 1, size)).toEqual(0);
    });

    it('should return the previous element', function () {
      const size = 10;
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      expect(getNextElementIndexFunction(eventUp)(size - 1, size)).toEqual(8);
      expect(getNextElementIndexFunction(eventRight)(size - 2, size)).toEqual(7);
      expect(getNextElementIndexFunction(eventUp)(1, size)).toEqual(0);
      expect(getNextElementIndexFunction(eventRight)(0, size)).toEqual(9);
    });
  });
});
