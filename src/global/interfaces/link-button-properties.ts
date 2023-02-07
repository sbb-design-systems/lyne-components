import { documentLanguage } from '../helpers/language';
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
export interface ButtonProperties extends AccessibilityProperties {
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
   * Indicates the availability and type of interactive popup element that can be triggered
   * by the element
   */
  accessibilityHaspopup?: PopupType | undefined;

  /** The function triggered on button click. */
  emitButtonClick?: ((event: Event) => void) | undefined;
}

/**
 * A component that implements LinkButtonProperties should use this interface to set useful variables for render function.
 */
export interface LinkButtonRenderVariables {
  /**
   * The tag's name rendered by the component.
   */
  tagName: 'a' | 'button' | 'span';

  /**
   * The tag's attributes; can be set using getLinkButtonBaseAttributeList(...),
   * getLinkAttributeList(...) or getButtonAttributeList(...) methods.
   */
  attributes: Record<string, string>;

  /**
   * Indicates whether the screen reader has to announce that the link will open in a new window.
   */
  screenReaderNewWindowInfo?: boolean;
}

/**
 * The interface contains the possible attributes of both the <a> and the <button> tags.
 * It is intended to be used in all cases where a component needs to render a tag that can be an <a> or a <button>,
 * for instance depending on whether the value of the href attribute is present or not.
 * NOTE: a class could not be created because StencilJS does not support inheritance/component extension.
 */
export interface LinkButtonProperties extends LinkProperties, ButtonProperties {}

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
 * @param currentLanguage language for accessibility texts.
 * @param buttonProperties? (optional) In the case of a mixed button and anchor variant, pass in also button properties, which enables the possibility of a disabled link
 */
export function getLinkAttributeList(
  linkProperties: LinkProperties,
  currentLanguage: string = documentLanguage(),
  buttonProperties?: ButtonProperties
): Record<string, string> {
  const baseAttributeList = getLinkButtonBaseAttributeList(linkProperties);

  if (!linkProperties.href) {
    return baseAttributeList;
  }

  let ariaLabel = baseAttributeList['aria-label'];
  if (ariaLabel && linkProperties.target === '_blank') {
    ariaLabel += `. ${i18nTargetOpensInNewWindow[currentLanguage]}`;
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
    'aria-haspopup': buttonProperties?.accessibilityHaspopup ?? undefined,
  });
}

/**
 * Set default render variables for link case.
 * @param linkProperties used to set the 'attributes' property.
 * @param currentLanguage language for accessibility texts.
 * @param buttonProperties? (optional) In the case of a mixed button and anchor variant, pass in also button properties, which enables the possibility of a disabled link
 */
export function getLinkRenderVariables(
  linkProperties: LinkProperties,
  currentLanguage: string = documentLanguage(),
  buttonProperties?: ButtonProperties
): LinkButtonRenderVariables {
  return {
    tagName: 'a',
    attributes: getLinkAttributeList(linkProperties, currentLanguage, buttonProperties),
    screenReaderNewWindowInfo:
      !linkProperties.accessibilityLabel && linkProperties.target === '_blank',
  };
}

/**
 * Set default render variables for button case.
 * @param buttonProperties used to set the 'attributes' property.
 */
export function getButtonRenderVariables(
  buttonProperties: ButtonProperties
): LinkButtonRenderVariables {
  return {
    tagName: 'button',
    attributes: getButtonAttributeList(buttonProperties),
  };
}

/**
 * Set default render variables when the element is static (button/link inside another button/link).
 * @param accessibilityProperties used to set the 'attributes' property.
 */
export function getLinkButtonStaticRenderVariables(
  accessibilityProperties: AccessibilityProperties
): LinkButtonRenderVariables {
  return {
    tagName: 'span',
    attributes: getLinkButtonBaseAttributeList(accessibilityProperties),
  };
}

/**
 * Set default render variables based on the 'default' condition, checking first `isStatic` parameter, then the `href`.
 * @param linkButtonProperties used to set the 'attributes' property and to check for `href` value.
 * @param currentLanguage language for accessibility texts.
 * @param isStatic renders the default static variable whether is true.
 */
export function resolveRenderVariables(
  linkButtonProperties: LinkButtonProperties,
  currentLanguage: string = documentLanguage(),
  isStatic = false
): LinkButtonRenderVariables {
  if (isStatic) {
    return getLinkButtonStaticRenderVariables(linkButtonProperties);
  } else if (linkButtonProperties.href) {
    return getLinkRenderVariables(linkButtonProperties, currentLanguage, linkButtonProperties);
  }
  return getButtonRenderVariables(linkButtonProperties);
}

/**
 * Returns the link render variables or static variables if there is no href property.
 * @param linkProperties used to set variables and to check if href property is set.
 * @param currentLanguage language for accessibility texts.
 */
export function resolveLinkRenderVariables(
  linkProperties: LinkProperties,
  currentLanguage: string = documentLanguage()
): LinkButtonRenderVariables {
  if (linkProperties.href) {
    return getLinkRenderVariables(linkProperties, currentLanguage);
  }
  return getLinkButtonStaticRenderVariables(linkProperties);
}

/**
 * Forwards a click on the host element to the nested action element in order to
 * simplify the API.
 */
export function forwardHostEvent(
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
  let copiedEvent: Event;

  if (event.cancelable) {
    // If the event is cancelable, we immediatly cancel it, copy it and dispatch it on the nested
    // action element. As all of our intended forwardable event types bubble, this ensures
    // that an event which was dispatched on host, is forwarded to the intended nested action
    // element and consumers can still add event listeners and deal with the bubbling event
    // as desired.
    event.preventDefault();
    event.stopImmediatePropagation();
    copiedEvent = new eventConstructor(event.type, event);
  } else {
    // If the event cannot be cancelled, we just copy it and dispatch it non-bubbling on the nested
    // action element. This ensures that an event that was programmatically dispatched on the host
    // is also dispatched on the intended nested action element.
    copiedEvent = new eventConstructor(event.type);
  }

  nestedActionElement.dispatchEvent(copiedEvent);
}

/**
 * Resolves the first anchor or button tag inside the shadow DOM of the given element.
 */
export function actionElement(element: HTMLElement): HTMLElement | null {
  return element.shadowRoot.querySelector('a,button');
}

/**
 * Resolves the first anchor or button tag inside the shadow DOM and calls the focus method if found.
 * Due to the `this` context handling with Safari when overwriting a method,
 * we need to specifically use a primitive function instead of a lexically bound arrow function.
 * The `this` inside the function will be bound to the context of the overwritten method.
 */
export function focusActionElement(options: FocusOptions): void {
  actionElement(this)?.focus(options);
}
