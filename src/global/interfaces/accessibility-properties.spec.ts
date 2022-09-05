import { AccessibilityProperties, getAccessibilityAttributeList } from './accessibility-properties';

describe('AccessibilityProperties', () => {
  it('should return all parameters', () => {
    const accessibilityProps: AccessibilityProperties = {
      accessibilityLabel: 'label',
      accessibilityDescribedby: 'describedby',
      accessibilityLabelledby: 'labelledby',
    };
    const expectedObj = {
      'aria-label': 'label',
      'aria-describedby': 'describedby',
      'aria-labelledby': 'labelledby',
    };
    expect(getAccessibilityAttributeList(accessibilityProps)).toEqual(expectedObj);
  });

  it('should filter undefined parameters', () => {
    const accessibilityProps: AccessibilityProperties = {
      accessibilityLabel: 'Test',
      accessibilityDescribedby: undefined,
      accessibilityLabelledby: undefined,
    };
    const expectedObj = {
      'aria-label': 'Test',
    };
    expect(getAccessibilityAttributeList(accessibilityProps)).toEqual(expectedObj);
  });

  it('should return empty object', () => {
    const expectedObj = {};
    expect(getAccessibilityAttributeList(null)).toEqual(expectedObj);
  });
});
