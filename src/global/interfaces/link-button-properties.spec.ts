import { AccessibilityProperties } from './accessibility-properties';
import {
  ButtonProperties,
  getButtonAttributeList,
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkProperties,
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
      'aria-label': 'Test',
    };
    expect(getLinkButtonBaseAttributeList(accessibilityProps)).toEqual(expectedObj);
  });

  it('should return empty object without undefined or null values', () => {
    const expectedObj = {
      dir: 'ltr',
    };
    expect(getLinkButtonBaseAttributeList(null)).toEqual(expectedObj);
  });
});

describe('getLinkAttributeList', () => {
  it('should return attributes for link', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      accessibilityLabel: 'Test',
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      href: 'link',
      'aria-label': 'Test',
    };
    expect(getLinkAttributeList(linkProperties)).toEqual(expectedObj);
  });

  it('should return attributes for link without aria-label and target _blank', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      target: '_blank',
      accessibilityLabel: null,
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      href: 'link',
      target: '_blank',
      rel: 'external noopener nofollow',
    };
    expect(getLinkAttributeList(linkProperties)).toEqual(expectedObj);
  });

  it('should return attributes for link with label, target _blank and custom rel', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      target: '_blank',
      rel: 'custom',
      accessibilityLabel: 'Test',
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      href: 'link',
      target: '_blank',
      rel: 'custom',
      'aria-label': 'Test. Link target opens in new window.',
    };
    expect(getLinkAttributeList(linkProperties)).toEqual(expectedObj);
  });

  it('should return attributes for link with a custom target', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      target: 'custom',
      accessibilityLabel: null,
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      href: 'link',
      target: 'custom',
    };

    expect(getLinkAttributeList(linkProperties)).toEqual(expectedObj);
  });

  it('should return attributes for disabled link', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      accessibilityLabel: null,
      accessibilityDescribedby: null,
      accessibilityLabelledby: null,
    };
    const buttonProperties: ButtonProperties = {
      accessibilityDescribedby: undefined,
      accessibilityLabel: undefined,
      accessibilityLabelledby: undefined,
      accessibilityHasPopup: undefined,
      accessibilityControls: undefined,
      click: undefined,
      emitButtonClick: () => true,
      name: undefined,
      type: undefined,
      disabled: true,
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      href: 'link',
      tabIndex: '-1',
    };

    expect(getLinkAttributeList(linkProperties, buttonProperties)).toEqual(expectedObj);
  });
});

describe('getButtonAttributeList', () => {
  it('should return attributes for button', () => {
    const buttonProperties: ButtonProperties = {
      accessibilityDescribedby: '',
      accessibilityLabel: 'Test',
      accessibilityLabelledby: '',
      accessibilityHasPopup: undefined,
      accessibilityControls: '',
      click: undefined,
      disabled: false,
      emitButtonClick: () => true,
      eventId: 'eventId',
      form: 'formid',
      name: 'name',
      type: 'submit',
      value: 'value',
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      'aria-label': 'Test',
      form: 'formid',
      name: 'name',
      type: 'submit',
      value: 'value',
    };

    // jest can't compare functions as emitButtonClick, so objectContaining(...) API is used
    expect(getButtonAttributeList(buttonProperties)).toEqual(expect.objectContaining(expectedObj));
  });
});
