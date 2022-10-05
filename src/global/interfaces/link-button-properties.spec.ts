import { AccessibilityProperties } from './accessibility-properties';
import {
  ButtonProperties,
  forwardHostClick,
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
      accessibilityHaspopup: undefined,
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
      click: undefined,
      emitButtonClick: () => true,
      type: 'submit',
      disabled: false,
      name: 'name',
      value: 'value',
      form: 'formid',
      accessibilityHaspopup: 'true',
      accessibilityControls: 'id',
      accessibilityLabel: 'Test',
      accessibilityDescribedby: '',
      accessibilityLabelledby: '',
    };
    const expectedObj: Record<string, string> = {
      dir: 'ltr',
      'aria-label': 'Test',
      form: 'formid',
      name: 'name',
      type: 'submit',
      value: 'value',
      'aria-haspopup': 'true',
      'aria-controls': 'id',
    };

    // jest can't compare functions as emitButtonClick, so objectContaining(...) API is used
    expect(getButtonAttributeList(buttonProperties)).toEqual(expect.objectContaining(expectedObj));
  });
});

describe('forwardHostClick', () => {
  it('should forward host click', () => {
    const event = new Event('click');
    const host = new HTMLElement();
    const actionElement = new HTMLElement();

    // Simulate shadow DOM context
    jest.spyOn(event, 'composedPath').mockReturnValue([host]);
    const eventSpy = jest.spyOn(actionElement, 'dispatchEvent');

    forwardHostClick(event, host, actionElement);

    const copiedEvent = eventSpy.mock.lastCall[0];
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(copiedEvent.type).toEqual('click');
    expect(copiedEvent.bubbles).toEqual(false);
  });

  it('should not forward because click is not on host', () => {
    const event = new Event('click');
    const host = new HTMLElement();
    const actionElement = new HTMLElement();
    const eventSpy = jest.spyOn(actionElement, 'dispatchEvent');

    forwardHostClick(event, host, actionElement);

    expect(eventSpy).toHaveBeenCalledTimes(0);
  });
});
