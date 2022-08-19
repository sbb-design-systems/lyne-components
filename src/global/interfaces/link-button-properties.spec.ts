import { AccessibilityProperties } from './accessibility-properties';
import {
  getLinkButtonAttributeList,
  getLinkButtonBaseAttributeList,
  LinkButtonProperties,
} from './link-button-properties';

describe('getLinkButtonBaseAttributeList', () => {
  it('should return the parameter object', () => {
    const accessibilityProps: AccessibilityProperties = {
      accessibilityLabel: 'Test',
      accessibilityDescribedby: undefined,
      accessibilityLabelledby: undefined,
    };
    const expectedObj = {
      dir: 'ltr',
      id: 'a',
      class: 'b',
      'aria-label': 'Test',
    };
    expect(getLinkButtonBaseAttributeList('a', 'b', accessibilityProps)).toEqual(expectedObj);
  });

  it('should return the param object without undefined or null values', () => {
    const expectedObj = {
      dir: 'ltr',
    };
    expect(getLinkButtonBaseAttributeList(null, null)).toEqual(expectedObj);
  });
});

describe('getLinkButtonAttributeList', () => {
  it('should return attributes for link', () => {
    const linkButtonProperties: LinkButtonProperties = {
      href: 'link',
      target: '_self',
      click: undefined,
      emitButtonClick: undefined,
      name: undefined,
      type: undefined,
      accessibilityLabel: 'Test',
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const expectedObj: object = {
      dir: 'ltr',
      id: 'x',
      class: 'y',
      href: 'link',
      rel: 'external noopener nofollow',
      target: '_self',
      'aria-label': 'Test. Link target opens in new window.',
    };
    expect(getLinkButtonAttributeList('x', 'y', linkButtonProperties)).toEqual(expectedObj);
  });

  it('should return attributes for button', () => {
    const linkButtonProperties: LinkButtonProperties = {
      href: undefined,
      click: undefined,
      emitButtonClick: () => {
        return null;
      },
      name: 'Button',
      type: 'submit',
      accessibilityLabel: 'Test',
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const expectedObj: object = {
      dir: 'ltr',
      id: 'alfa',
      class: 'beta',
      name: 'Button',
      type: 'submit',
      'aria-label': 'Test',
    };
    // jest can't compare functions as emitButtonClick, so objectContaining(...) API is used
    expect(getLinkButtonAttributeList('alfa', 'beta', linkButtonProperties)).toEqual(
      expect.objectContaining(expectedObj)
    );
  });
});
