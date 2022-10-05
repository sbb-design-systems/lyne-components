import { EventEmitter } from '@stencil/core';
import getDocumentLang from '../helpers/get-document-lang';
import getDocumentWritingMode from '../helpers/get-document-writing-mode';
import { i18nTargetOpensInNewWindow } from '../i18n';
import { AccessibilityProperties, getAccessibilityAttributeList } from './accessibility-properties';

/**
 * Enumeration for type attribute in <button> HTML tag.
 */
export type ButtonType = 'button' | 'reset' | 'submit';

/**
 * Enumeration for the 'aria-haspopup' values on the <button> HTML tag.
 */
export type PopupType = 'true' | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';

/**
 * Enumeration for 'target' attribute in <a> HTML tag.
 */
export type LinkTargetType = '_blank' | '_self' | '_parent' | '_top';

/**
 * The interface contains attributes that can be set on an <a> tag.
 */
export interface LinkProperties extends AccessibilityProperties {
  /** The href value you want to link to. */
  href: string | undefined;

  /** Where to display the linked URL. */
  target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  download?: boolean | undefined;
}

/**
 * The interface contains attributes that can be set on an <button> tag.
 */
export interface ButtonProperties<T = any> extends AccessibilityProperties {
  /** The type attribute to use for the button. */
  type: ButtonType | undefined;

  /** Whether the button is disabled. */
  disabled?: boolean | undefined;

  /** The name attribute to use for the button. */
  name: string | undefined;

  /** The value attribute to use for the button. */
  value?: string | undefined;

  /** The <form> element to associate the button with. */
  form?: string | undefined;

  /**
   * The aria-controls property identifies the element (or elements)
   * whose contents or presence are controlled by the element on which
   * this attribute is set.
   * The value is forwarded to the native button element.
   */
  accessibilityControls?: string | undefined;

  /**
   * Indicates the availability and type of interactive popup element that can be triggered
   * by the element
   */
  accessibilityHaspopup?: PopupType | undefined;

  /** Emits the event on button click. */
  click: EventEmitter<T> | undefined;

  /** The function triggered on button click. */
  emitButtonClick: (() => void) | undefined;
}

/**
 * The interface contains the possible attributes of both the <a> and the <button> tags.
 * It is intended to be used in all cases where a component needs to render a tag that can be an <a> or a <button>,
 * for instance depending on whether the value of the href attribute is present or not.
 * NOTE: a class could not be created because StencilJS does not support inheritance/component extension.
 */
export interface LinkButtonProperties<ParameterType = any>
  extends LinkProperties,
    ButtonProperties<ParameterType> {}

/**
 * Creates the basic attribute list for the link/button tag; undefined/null properties are not set.
 * @param accessibilityProps accessibility props
 */
export function getLinkButtonBaseAttributeList(
  accessibilityProps?: AccessibilityProperties | null
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

  let ariaLabel = baseAttributeList['aria-label'];
  if (ariaLabel && linkProperties.target === '_blank') {
    ariaLabel += `. ${i18nTargetOpensInNewWindow[getDocumentLang()]}`;
  }

  return Object.assign(baseAttributeList, {
    href: linkProperties.href,
    download: linkProperties.download ? '' : undefined,
    tabIndex: buttonProperties?.disabled ? '-1' : undefined,
    target: linkProperties.target,
    rel: linkProperties.rel
      ? linkProperties.rel
      : linkProperties.target === '_blank'
      ? 'external noopener nofollow'
      : undefined,
    'aria-label': ariaLabel,
  });
}

/**
 * Lists all attributes for a button; undefined/null properties are not set.
 * @param buttonProperties button properties
 */
export function getButtonAttributeList(buttonProperties: ButtonProperties): Record<string, string> {
  const baseAttributeList = getLinkButtonBaseAttributeList(buttonProperties);

  return Object.assign(baseAttributeList, {
    name: buttonProperties.name || undefined,
    type: buttonProperties.type || 'button',
    onClick: buttonProperties.emitButtonClick?.bind(buttonProperties),
    form: buttonProperties.form || undefined,
    disabled: buttonProperties.disabled ? 'true' : undefined,
    value: buttonProperties.value ?? undefined,
    'aria-controls': buttonProperties?.accessibilityControls ?? undefined,
    'aria-haspopup': buttonProperties?.accessibilityHaspopup ?? undefined,
  });
}

/**
 * Forwards a click on the host element to the nested action element in order to
 * simplify the API.
 */
export function forwardHostClick(
  event: Event,
  host: HTMLElement,
  nestedActionElement: HTMLElement
): void {
  // Check if the click was triggered on the host element and not from inside the shadow DOM.
  // The composed path includes the full path to the clicked element including shadow DOM.
  if (event.composedPath()[0] !== host) {
    return;
  }
  const eventConstructor = Object.getPrototypeOf(event).constructor;
  const copiedEvent = new eventConstructor(event.type, { bubbles: false });
  nestedActionElement.dispatchEvent(copiedEvent);
}
