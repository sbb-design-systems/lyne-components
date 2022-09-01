import { EventEmitter } from '@stencil/core';
import getDocumentLang from '../helpers/get-document-lang';
import getDocumentWritingMode from '../helpers/get-document-writing-mode';
import { i18nTargetOpensInNewWindow } from '../i18n';
import { AccessibilityProperties } from './accessibility-properties';

/**
 * Enumeration for type attribute in <button> HTML tag.
 */
export type ButtonType = 'button' | 'reset' | 'submit';

/**
 * Enumeration for 'target' attribute in <a> HTML tag.
 */
export type LinkTargetType = '_blank' | '_self' | '_parent' | '_top';

/**
 * The interface contains attributes that can be set on an <a> tag.
 */
export interface LinkProperties extends AccessibilityProperties {
  /**
   *  The href value you want to link to.
   */
  href: string | undefined;

  /**
   * Whether the browser will show the download dialog on click.
   */
  download?: boolean | undefined;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  rel?: string | undefined;

  /**
   * Where to display the linked URL.
   */
  target?: LinkTargetType | string | undefined;
}

/**
 * The interface contains attributes that can be set on an <button> tag.
 */
export interface ButtonProperties extends AccessibilityProperties {
  /**
   * Default behaviour of the button.
   */
  type: ButtonType | undefined;

  /**
   * The name of the button.
   */
  name: string | undefined;

  /**
   * Emits the eventId to parent on button click.
   * TODO check if it's possible to use a better type than 'any'.
   */
  click: EventEmitter<any> | undefined;

  /**
   * The function triggered on button click.
   */
  emitButtonClick: (() => void) | undefined;

  /**
   * Id sent in the click event payload.
   * TODO verify if needed and if string is the correct type
   */
  eventId?: string | undefined;

  /**
   * The <form> element to associate the button with.
   */
  form?: string | undefined;

  /**
   * The value associated with button `name` when it's submitted with the form data.
   */
  value?: string | undefined;

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean | undefined;
}

/**
 * The interface contains the possible attributes of both the <a> and the <button> tags.
 * It is intended to be used in all cases where a component needs to render a tag that can be an <a> or a <button>,
 * for instance depending on whether the value of the href attribute is present or not.
 * NOTE: a class could not be created because StencilJS does not support inheritance/component extension.
 */
export interface LinkButtonProperties extends LinkProperties, ButtonProperties {}

/**
 * Lists all attributes for the AccessibilityProperties interface
 * @param accessibilityProps accessibility props
 */
export function getAccessibilityAttributeList(
  accessibilityProps: AccessibilityProperties
): Record<string, string> {
  return {
    ...(accessibilityProps?.accessibilityLabel && {
      'aria-label': accessibilityProps.accessibilityLabel,
    }),
    ...(accessibilityProps?.accessibilityLabelledby && {
      'aria-labelledby': accessibilityProps.accessibilityLabelledby,
    }),
    ...(accessibilityProps?.accessibilityDescribedby && {
      'aria-describedby': accessibilityProps.accessibilityDescribedby,
    }),
  };
}

/**
 * Creates the basic attribute list for the link/button tag; undefined/null properties are not set.
 * @param accessibilityProps accessibility props
 */
export function getLinkButtonBaseAttributeList(
  accessibilityProps: AccessibilityProperties
): Record<string, string> {
  return Object.assign(
    { dir: getDocumentWritingMode() },
    getAccessibilityAttributeList(accessibilityProps)
  );
}

/**
 * Lists all attributes for a link; undefined/null properties are not set.
 * @param linkProperties link properties
 * @param buttonProperties (optional) In the case of a mixed button and anchor variant, pass in also button properties, which enables the possibility of a disabled link
 */
export function getLinkAttributeList(
  linkProperties: LinkProperties,
  buttonProperties?: ButtonProperties
): Record<string, string> {
  const baseAttributeList = getLinkButtonBaseAttributeList(linkProperties);

  if (!linkProperties.href) {
    return baseAttributeList;
  }

  const linkAttributeList = Object.assign(baseAttributeList, {
    href: linkProperties.href,
    ...(linkProperties.download && { download: '' }),
    ...(buttonProperties.disabled && { tabIndex: '-1' }),
  });

  if (window.location.href.includes(linkProperties.href)) {
    return linkAttributeList;
  }

  return Object.assign(linkAttributeList, {
    rel: linkProperties.rel || 'external noopener nofollow',
    target: linkProperties.target || '_blank',
    ...(linkProperties.accessibilityLabel && {
      'aria-label': `${linkProperties.accessibilityLabel}. ${
        i18nTargetOpensInNewWindow[getDocumentLang()]
      }`,
    }),
  });
}

/**
 * Lists all attributes for a button; undefined/null properties are not set.
 * @param buttonProperties button properties
 */
export function getButtonAttributeList(buttonProperties: ButtonProperties): Record<string, string> {
  const baseAttributeList = getLinkButtonBaseAttributeList(buttonProperties);

  return Object.assign(baseAttributeList, {
    name: buttonProperties.name,
    type: buttonProperties.type || 'button',
    onClick: buttonProperties.emitButtonClick.bind(buttonProperties),
    ...(buttonProperties.form && { form: buttonProperties.form }),
    ...(buttonProperties.disabled && { disabled: 'true' }),
  });
}

/**
 * Creates a list of attributes for the <a> or <button> tags,
 * depending on whether the href attribute value is present.
 * Undefined/null properties are not set.
 * @param linkButtonProps properties from the link/button component implementation
 */
export function getLinkButtonAttributeList(
  linkButtonProps: LinkButtonProperties
): Record<string, string> {
  if (!linkButtonProps) {
    return;
  }

  // Anchor case
  if (linkButtonProps.href) {
    return getLinkAttributeList(linkButtonProps, linkButtonProps);
  }

  // Button case
  return getButtonAttributeList(linkButtonProps);
}
