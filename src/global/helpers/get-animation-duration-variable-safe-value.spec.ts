import {
  convertToNumber,
  getAnimationDurationVariableSafeValue
} from './get-animation-duration-variable-safe-value';
import spyOn = jest.spyOn;

describe('convertToNumber', () => {
  it('should correct trim value', () => {
    expect(convertToNumber('1000ms'))
      .toEqual(1000);
    expect(convertToNumber('999px'))
      .toEqual(999);
    expect(convertToNumber('0010rem'))
      .toEqual(10);
    expect(convertToNumber('100px123'))
      .toEqual(100);
    expect(convertToNumber('abc123'))
      .toBeNaN();
  });
});

describe('getAnimationDurationVariableSafeValue', () => {

  it('should return the value', () => {
    const style = {
      getPropertyValue: jest.fn()
    } as any as CSSStyleDeclaration;

    spyOn(style, 'getPropertyValue')
      .mockReturnValue('999ms');
    expect(getAnimationDurationVariableSafeValue(style, '--animation-duration-nx'))
      .toEqual(999);
  });

  it('should throw error with wrong prop', () => {
    expect(() => getAnimationDurationVariableSafeValue({} as any as CSSStyleDeclaration, 'wrongProp'))
      .toThrow(Error);
  });

});
