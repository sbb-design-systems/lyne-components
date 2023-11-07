import { expect } from '@open-wc/testing';
import { stub } from 'sinon';

import { getElementPosition } from './position';

describe('getElementPosition', () => {
  let trigger: HTMLElement, element: HTMLElement;

  beforeEach(() => {
    trigger = document.createElement('span');
    element = document.createElement('span');

    // Mock element size
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 80 });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 80 });

    // Set window dimension
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1080 });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 720 });
  });

  it('returns the correct element coordinates', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 96,
      left: 48,
      maxHeight: '624px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });

  it('changes the horizontal alignment to end', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 96,
      left: 872,
      maxHeight: '624px',
      alignment: { horizontal: 'end', vertical: 'below' },
    });
  });

  it('changes the vertical alignment to above', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 544,
      left: 48,
      maxHeight: '624px',
      alignment: { horizontal: 'start', vertical: 'above' },
    });
  });

  it('changes the vertical alignment if there is more space above and the element overflows', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 520,
      left: 48,
      maxHeight: '600px',
      alignment: { horizontal: 'start', vertical: 'above' },
    });
  });

  it('does not changes the vertical alignment if there is more space above and the element does not overflow', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 640,
      left: 48,
      maxHeight: '80px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });

  it('changes the alignment to end/above', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 544,
      left: 872,
      maxHeight: '624px',
      alignment: { horizontal: 'end', vertical: 'above' },
    });
  });

  it('changes horizontal alignment to center', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 96,
      left: 24,
      maxHeight: '624px',
      alignment: { horizontal: 'center', vertical: 'below' },
    });
  });

  it('applies vertical offset', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 104,
      left: 48,
      maxHeight: '608px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });

  it('applies horizontal offset', () => {
    stub(trigger, 'getBoundingClientRect').returns({
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

    expect(elementPosition).to.be.deep.equal({
      top: 96,
      left: 16,
      maxHeight: '624px',
      alignment: { horizontal: 'start', vertical: 'below' },
    });
  });
});
