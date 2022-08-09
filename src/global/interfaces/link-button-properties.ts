import { EventEmitter } from '@stencil/core';
import getDocumentLang from '../helpers/get-document-lang';
import getDocumentWritingMode from '../helpers/get-document-writing-mode';
import { i18nTargetOpensInNewWindow } from '../i18n';
import { AccessibilityProperties } from './accessibility-properties';

export type ButtonType = 'button' | 'reset' | 'submit';

export interface LinkButtonProperties extends AccessibilityProperties {
  /**
   * Link: whether the browser will show the download dialog on click.
   */
  download: boolean | undefined;

  /**
   *  Link: the href value you want to link to.
   */
  href: string | undefined;

  /**
   * Button: whether the button is disabled.
   */
  disabled: boolean | undefined;

  /**
   * Button: name attribute.
   */
  name: string | undefined;

  /**
   * Button: form attribute.
   */
  form: string | undefined;

  /**
   * Button: type attribute.
   */
  type: ButtonType | undefined;

  /**
   * Button: click function.
   */
  click: EventEmitter<any>;

  /**
   * Button: id sent in the click event payload.
   */
  eventId: string;

  emitButtonClick: () => void;
}

/**
 * Creates the basic attribute list for the link/button tag.
 * @param idValue HTML element's id
 * @param className HTML element's CSS class
 * @param accessibilityProps HTML element's accessibility properties
 * @returns an object with the all the properties set
 */
export function getLinkButtonBaseAttributeList(
  idValue: string,
  className: string,
  accessibilityProps: AccessibilityProperties
): object {
  return {
    dir: getDocumentWritingMode(),
    class: className,
    'aria-label': accessibilityProps.accessibilityLabel || undefined,
    'aria-labelledby': accessibilityProps.accessibilityLabelledby || undefined,
    'aria-describedby': accessibilityProps.accessibilityDescribedby || undefined,
    id: idValue || undefined,
  };
}

/**
 * Creates a different attribute list for link or button tags.
 * @param idValue HTML element's id
 * @param className HTML element's CSS class
 * @param linkButtonProps properties from the link/button component impl
 * @returns an object with the right properties for each case
 */
export function getLinkButtonAttributeList(
  idValue: string,
  className: string,
  linkButtonProps: LinkButtonProperties
): object {
  const attributeList: object = getLinkButtonBaseAttributeList(idValue, className, linkButtonProps);

  // Anchor case
  if (linkButtonProps.href) {
    if (!window.location.href.includes(linkButtonProps.href)) {
      Object.assign(attributeList, {
        rel: 'external noopener nofollow',
        target: '_blank',
        'aria-label':
          `${attributeList['aria-label']}. ${i18nTargetOpensInNewWindow[getDocumentLang()]}` ||
          undefined,
      });
    }
    return Object.assign(attributeList, {
      href: linkButtonProps.href,
      download: linkButtonProps.download ? '' : undefined,
      tabIndex: linkButtonProps.disabled ? '-1' : undefined,
    });
  }

  // Button case
  return Object.assign(attributeList, {
    name: linkButtonProps.name || undefined,
    type: linkButtonProps.type || undefined,
    form: linkButtonProps.form || undefined,
    disabled: linkButtonProps.disabled ? 'true' : undefined,
    onClick: linkButtonProps.emitButtonClick.bind(linkButtonProps),
  });
}
