import { expect } from '@open-wc/testing';

import {
  getNextElementIndex,
  isArrowKeyPressed,
  isNextArrowKeyPressed,
  isPreviousArrowKeyPressed,
} from './arrow-navigation.js';

describe('isArrowKeyPressed', () => {
  it('should return false', () => {
    const event = new KeyboardEvent('keydown', { key: 'Test' });
    expect(isArrowKeyPressed(event)).to.be.equal(false);
  });

  it('should return true', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    expect(isArrowKeyPressed(event)).to.be.equal(true);
  });
});

describe('isPreviousArrowKeyPressed', () => {
  describe('ltr', () => {
    it('should check the correct arrow key', () => {
      const targetElement = document.createElement('div');

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'Test' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          expect(isPreviousArrowKeyPressed(event)).to.be.equal(false);
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          expect(isPreviousArrowKeyPressed(event)).to.be.equal(true);
        }
      });

      // Create the keyboard events
      const testEvent = new KeyboardEvent('keydown', { key: 'Test' });
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Dispatch the event
      targetElement.dispatchEvent(testEvent);
      targetElement.dispatchEvent(downEvent);
      targetElement.dispatchEvent(rightEvent);
      targetElement.dispatchEvent(upEvent);
      targetElement.dispatchEvent(leftEvent);
    });
  });

  describe('rtl', () => {
    it('should check the correct arrow key', () => {
      const targetElement = document.createElement('div');
      targetElement.setAttribute('dir', 'rtl');

      expect(targetElement.matches(':dir(rtl)')).to.be.equal(true);

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          expect(isPreviousArrowKeyPressed(event)).to.be.equal(true);
        } else if (event.key === 'ArrowLeft') {
          expect(isPreviousArrowKeyPressed(event)).to.be.equal(false);
        }
      });

      // Create the keyboard events
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Dispatch the event
      targetElement.dispatchEvent(rightEvent);
      targetElement.dispatchEvent(leftEvent);
    });
  });
});

describe('isNextArrowKeyPressed', () => {
  describe('ltr', () => {
    it('should check the correct arrow key', () => {
      const targetElement = document.createElement('div');

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'Test' || event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          expect(isNextArrowKeyPressed(event)).to.be.equal(false);
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          expect(isNextArrowKeyPressed(event)).to.be.equal(true);
        }
      });

      // Create the keyboard events
      const testEvent = new KeyboardEvent('keydown', { key: 'Test' });
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Dispatch the event
      targetElement.dispatchEvent(testEvent);
      targetElement.dispatchEvent(downEvent);
      targetElement.dispatchEvent(rightEvent);
      targetElement.dispatchEvent(upEvent);
      targetElement.dispatchEvent(leftEvent);
    });
  });

  describe('rtl', () => {
    it('should check the correct arrow key', () => {
      const targetElement = document.createElement('div');
      targetElement.setAttribute('dir', 'rtl');

      expect(targetElement.matches(':dir(rtl)')).to.be.equal(true);

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          expect(isNextArrowKeyPressed(event)).to.be.equal(true);
        } else if (event.key === 'ArrowRight') {
          expect(isNextArrowKeyPressed(event)).to.be.equal(false);
        }
      });

      // Create the keyboard events
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Dispatch the event
      targetElement.dispatchEvent(rightEvent);
      targetElement.dispatchEvent(leftEvent);
    });
  });
});

describe('getNextElementIndex', () => {
  describe('ltr', () => {
    it('should return the next element', function () {
      const targetElement = document.createElement('div');
      const size = 10;
      const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          expect(getNextElementIndex(event, 0, size)).to.be.equal(1);
          expect(getNextElementIndex(event, size - 2, size)).to.be.equal(9);
          // current out of bound tests
          expect(getNextElementIndex(event, -1, size)).to.be.equal(0);
        } else if (event.key === 'ArrowRight') {
          expect(getNextElementIndex(event, 1, size)).to.be.equal(2);
          expect(getNextElementIndex(event, size - 1, size)).to.be.equal(0);
          // current out of bound tests
          expect(getNextElementIndex(event, size, size)).to.be.equal(0);
        }
      });

      targetElement.dispatchEvent(eventDown);
      targetElement.dispatchEvent(eventRight);
    });

    it('should return the previous element', function () {
      const targetElement = document.createElement('div');
      const size = 10;
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
          expect(getNextElementIndex(event, size - 1, size)).to.be.equal(8);
          expect(getNextElementIndex(event, 1, size)).to.be.equal(0);
          // current out of bound tests
          expect(getNextElementIndex(event, -1, size)).to.be.equal(size - 1);
        } else if (event.key === 'ArrowLeft') {
          expect(getNextElementIndex(event, size - 2, size)).to.be.equal(7);
          expect(getNextElementIndex(event, 0, size)).to.be.equal(9);
          // current out of bound tests
          expect(getNextElementIndex(event, size, size)).to.be.equal(size - 1);
        }
      });

      targetElement.dispatchEvent(eventUp);
      targetElement.dispatchEvent(eventLeft);
    });
  });

  describe('rtl', () => {
    it('should return the next element', function () {
      const targetElement = document.createElement('div');
      targetElement.setAttribute('dir', 'rtl');
      const size = 10;
      const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          expect(getNextElementIndex(event, 0, size)).to.be.equal(1);
          expect(getNextElementIndex(event, size - 2, size)).to.be.equal(9);
        } else if (event.key === 'ArrowLeft') {
          expect(getNextElementIndex(event, 1, size)).to.be.equal(2);
          expect(getNextElementIndex(event, size - 1, size)).to.be.equal(0);
        }
      });

      targetElement.dispatchEvent(eventDown);
      targetElement.dispatchEvent(eventLeft);
    });

    it('should return the previous element', function () {
      const targetElement = document.createElement('div');
      targetElement.setAttribute('dir', 'rtl');
      const size = 10;
      const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      // Add an event listener to capture the event
      targetElement.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
          expect(getNextElementIndex(event, size - 1, size)).to.be.equal(8);
          expect(getNextElementIndex(event, 1, size)).to.be.equal(0);
        } else if (event.key === 'ArrowRight') {
          expect(getNextElementIndex(event, size - 2, size)).to.be.equal(7);
          expect(getNextElementIndex(event, 0, size)).to.be.equal(9);
        }
      });

      targetElement.dispatchEvent(eventUp);
      targetElement.dispatchEvent(eventRight);
    });
  });
});
