import { getAnimationDurationVariableSafeValue } from './get-animation-duration-variable-safe-value';
import spyOn = jest.spyOn;

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
