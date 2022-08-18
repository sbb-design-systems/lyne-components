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
export interface LinkProperties {
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
export interface ButtonProperties {
  /**
   * Default behaviour of the button.
   */
  type: ButtonType | undefined;

  /**
   * The name of the button.
   */
  name: string | undefined;

  /**
   * Emits the eventId to its parent on button click.
   * TODO check if it's possible to use a better type than 'any'.
   */
  click: EventEmitter<any> | undefined;

  /**
   * The function triggered on button click.
   */
  emitButtonClick: () => void | undefined;

  /**
   * Id sent as click event payload.
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
export interface LinkButtonProperties
  extends LinkProperties,
    ButtonProperties,
    AccessibilityProperties {}

/**
 * Creates the basic attribute list for the link/button tag; undefined/null properties are not set.
 * @param elementId HTML element's id
 * @param elementClassName HTML element's CSS class
 * @param accessibilityProps HTML element's accessibility properties
 * @returns an object with the all the properties set
 */
export function getLinkButtonBaseAttributeList(
  elementId: string,
  elementClassName: string,
  accessibilityProps: AccessibilityProperties
): object {
  return {
    dir: getDocumentWritingMode(),
    ...(elementId && { id: elementId }),
    ...(elementClassName && { class: elementClassName }),
    ...(accessibilityProps.accessibilityLabel && {
      'aria-label': accessibilityProps.accessibilityLabel,
    }),
    ...(accessibilityProps.accessibilityLabelledby && {
      'aria-labelledby': accessibilityProps.accessibilityLabelledby,
    }),
    ...(accessibilityProps.accessibilityDescribedby && {
      'aria-describedby': accessibilityProps.accessibilityDescribedby,
    }),
  };
}

/**
 * Creates a list of attributes for the <a> or <button> tags, depending on whether the href attribute value is present.
 * @param elementId HTML element's id
 * @param elementClassName HTML element's CSS class
 * @param linkButtonProps properties from the link/button component implementation
 * @returns an object with the right properties for each case
 */
export function getLinkButtonAttributeList(
  elementId: string,
  elementClassName: string,
  linkButtonProps: LinkButtonProperties
): object {
  let attributeList: object = getLinkButtonBaseAttributeList(
    elementId,
    elementClassName,
    linkButtonProps
  );

  // Anchor case
  if (linkButtonProps.href) {
    if (!window.location.href.includes(linkButtonProps.href)) {
      attributeList = {
        ...attributeList,
        rel: linkButtonProps.rel || 'external noopener nofollow',
        target: linkButtonProps.target || '_blank',
        ...(attributeList['aria-label'] && {
          'aria-label': `${attributeList['aria-label']}. ${
            i18nTargetOpensInNewWindow[getDocumentLang()]
          }`,
        }),
      };
    }
    return {
      ...attributeList,
      href: linkButtonProps.href,
      ...(linkButtonProps.download && { download: '' }),
      ...(linkButtonProps.disabled && { tabIndex: '-1' }),
    };
  }

  // Button case
  return {
    ...attributeList,
    name: linkButtonProps.name,
    type: linkButtonProps.type || 'button',
    onClick: linkButtonProps.emitButtonClick.bind(linkButtonProps),
    ...(linkButtonProps.form && { form: linkButtonProps.form }),
    ...(linkButtonProps.disabled && { disabled: 'true' }),
  };
}
