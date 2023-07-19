/* eslint-disable @typescript-eslint/no-empty-function */
import { getElementPosition } from './position';

describe('getElementPosition', () => {
  let trigger: HTMLElement, element: HTMLElement;

  beforeEach(() => {
    trigger = new HTMLElement();
    element = new HTMLElement();

    // Mock element size
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 80 });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 80 });

    // Set window dimension
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1080 });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 720 });
  });

  it('returns the correct element coordinates', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 48,
      y: 48,
      width: 80,
      height: 48,
      top: 48,
      right: 952,
      bottom: 624,
      left: 48,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger);

    expect(elementPosition).toEqual({
      top: 96,
      left: 48,
      maxHeight: '624px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });

  it('changes the horizontal alignment to end', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 952,
      y: 48,
      width: 80,
      height: 48,
      top: 48,
      right: 48,
      bottom: 624,
      left: 952,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger);

    expect(elementPosition).toEqual({
      top: 96,
      left: 872,
      maxHeight: '624px',
      alignment: { horizontal: 'end', vertical: 'below' },
    });
  });

  it('changes the vertical alignment to above', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 48,
      y: 624,
      width: 80,
      height: 48,
      top: 624,
      right: 952,
      bottom: 48,
      left: 48,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger);

    expect(elementPosition).toEqual({
      top: 544,
      left: 48,
      maxHeight: '624px',
      alignment: { horizontal: 'start', vertical: 'above' },
    });
  });

  it('changes the vertical alignment if there is more space above and the element overflows', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 48,
      y: 600,
      width: 80,
      height: 48,
      top: 600,
      right: 952,
      bottom: 72,
      left: 48,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger);

    expect(elementPosition).toEqual({
      top: 520,
      left: 48,
      maxHeight: '600px',
      alignment: { horizontal: 'start', vertical: 'above' },
    });
  });

  it('does not changes the vertical alignment if there is more space above and the element does not overlflow', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 48,
      y: 592,
      width: 80,
      height: 48,
      top: 592,
      right: 952,
      bottom: 80,
      left: 48,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger);

    expect(elementPosition).toEqual({
      top: 640,
      left: 48,
      maxHeight: '80px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });

  it('changes the alignment to end/above', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 952,
      y: 624,
      width: 80,
      height: 48,
      top: 624,
      right: 48,
      bottom: 48,
      left: 952,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger);

    expect(elementPosition).toEqual({
      top: 544,
      left: 872,
      maxHeight: '624px',
      alignment: { horizontal: 'end', vertical: 'above' },
    });
  });

  it('changes horizontal alignment to center', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 64,
      y: 48,
      width: 80,
      height: 48,
      top: 48,
      right: 952,
      bottom: 624,
      left: 64,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger, { centered: true });

    expect(elementPosition).toEqual({
      top: 96,
      left: 24,
      maxHeight: '624px',
      alignment: { horizontal: 'center', vertical: 'below' },
    });
  });

  it('applies vertical offset', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 48,
      y: 48,
      width: 80,
      height: 48,
      top: 48,
      right: 952,
      bottom: 624,
      left: 48,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger, { verticalOffset: 8 });

    expect(elementPosition).toEqual({
      top: 104,
      left: 48,
      maxHeight: '608px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });

  it('applies horizontal offset', () => {
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      x: 48,
      y: 48,
      width: 24,
      height: 48,
      top: 48,
      right: 952,
      bottom: 624,
      left: 48,
      toJSON: () => {},
    });

    const elementPosition = getElementPosition(element, trigger, { horizontalOffset: 32 });

    expect(elementPosition).toEqual({
      top: 96,
      left: 16,
      maxHeight: '624px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });
});
