import getDocumentWritingMode from '../helpers/get-document-writing-mode';

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
export interface LinkProperties {
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
export interface ButtonProperties {
  /** The type attribute to use for the button. */
  type?: ButtonType | undefined;

  /** Whether the button is disabled. */
  disabled?: boolean | undefined;

  /** The name attribute to use for the button. */
  name: string | undefined;

  /** The value attribute to use for the button. */
  value?: string | undefined;

  /** The <form> element to associate the button with. */
  form?: string | undefined;
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
   * The host's attributes.
   */
  hostAttributes?: Record<string, string>;
}

/**
 * The interface contains the possible attributes of both the <a> and the <button> tags.
 * It is intended to be used in all cases where a component needs to render a tag that can be an <a> or a <button>,
 * for instance depending on whether the value of the href attribute is present or not.
 * NOTE: a class could not be created because StencilJS does not support inheritance/component extension.
 */
export interface LinkButtonProperties extends LinkProperties, ButtonProperties {}

export interface IsStaticProperty {
  isStatic: boolean;
}

function filterUndefined(...objects: Record<string, string>[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const object of objects) {
    for (const [key, value] of Object.entries(object)) {
      if (value !== undefined) {
        result[key] = value as string;
      }
    }
  }
  return result;
}

/** Creates the basic attribute list for the link/button tag; undefined/null properties are not set. */
function getLinkButtonBaseAttributeList(): Record<string, string> {
  return {
    dir: getDocumentWritingMode(),
    role: 'presentation',
    tabIndex: '-1',
  };
}

/**
 * Lists all attributes for a link; undefined/null properties are not set.
 * @param linkProperties link properties
 */
function getLinkAttributeList(linkProperties: LinkProperties): Record<string, string> {
  const baseAttributeList = getLinkButtonBaseAttributeList();

  return !linkProperties.href
    ? baseAttributeList
    : filterUndefined(baseAttributeList, {
        href: linkProperties.href,
        download: linkProperties.download ? '' : undefined,
        target: linkProperties.target,
        rel: linkProperties.rel
          ? linkProperties.rel
          : linkProperties.target === '_blank'
          ? 'external noopener nofollow'
          : undefined,
      });
}

/**
 * Lists all attributes for a button; undefined/null properties are not set.
 * @param buttonProperties button properties
 */
function getButtonAttributeList(buttonProperties: ButtonProperties): Record<string, string> {
  return filterUndefined(getLinkButtonBaseAttributeList(), {
    name: buttonProperties.name || undefined,
    type: buttonProperties.type || 'button',
    disabled: buttonProperties.disabled ? 'true' : undefined,
    value: buttonProperties.value ?? undefined,
  });
}

function hostProperties(role: string, disabled: boolean): Record<string, string> {
  return Object.assign({ role }, disabled ? { 'aria-disabled': 'true' } : { tabIndex: '0' });
}

/** Set default render variables for link case. */
function resolveLinkRenderVariables(
  properties: LinkProperties & Pick<ButtonProperties, 'disabled'>
): LinkButtonRenderVariables {
  return {
    tagName: 'a',
    attributes: getLinkAttributeList(properties),
    hostAttributes: hostProperties('link', properties.disabled),
  };
}

/** Set default render variables when the element is static (button/link inside another button/link). */
function resolveLinkButtonStaticRenderVariables(): LinkButtonRenderVariables {
  return {
    tagName: 'span',
    attributes: getLinkButtonBaseAttributeList(),
  };
}

/** Set default render variables for button case. */
export function resolveButtonRenderVariables(
  properties: ButtonProperties
): LinkButtonRenderVariables {
  return {
    tagName: 'button',
    attributes: getButtonAttributeList(properties),
    hostAttributes: hostProperties('button', properties.disabled),
  };
}

/**
 * Set default render variables based on the 'default' condition, checking first `isStatic` property, then the `href`.
 * @param properties used to set the 'attributes' property and to check for `href` value.
 */
export function resolveRenderVariables(
  properties: LinkButtonProperties & Partial<IsStaticProperty>
): LinkButtonRenderVariables {
  if (properties.isStatic) {
    return resolveLinkButtonStaticRenderVariables();
  } else if (properties.href) {
    return resolveLinkRenderVariables(properties);
  }
  return resolveButtonRenderVariables(properties);
}

/**
 * Returns the link render variables or static variables if there is no href property.
 * @param linkProperties used to set variables and to check if href property is set.
 * @param currentLanguage language for accessibility texts.
 */
export function resolveLinkOrStaticRenderVariables(
  linkProperties: LinkProperties
): LinkButtonRenderVariables {
  return linkProperties.href
    ? resolveLinkRenderVariables(linkProperties)
    : resolveLinkButtonStaticRenderVariables();
}

/** Returns true, if href is set and target is _blank. */
export function targetsNewWindow(properties: LinkProperties): boolean {
  return properties.href && properties.target === '_blank';
}

/**
 * Dispatches a 'click' PointerEvent, if the original keyboard event is a 'Enter' press.
 * As verified with the native button, when 'Enter' is pressed, a 'click' event is dispatched
 * after the 'keypress' event.
 * @param event The origin event.
 */
export function dispatchClickEventWhenEnterKeypress(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    (event.target as Element).dispatchEvent(
      new PointerEvent('click', { bubbles: true, cancelable: true, composed: true })
    );
  }
}

/**
 * Dispatches a 'click' PointerEvent, if the original keyboard event is a 'Space' press.
 * As verified with the native button, when 'Space' is pressed, a 'click' event is dispatched
 * after the 'keyup' event.
 * @param event The origin event.
 */
export function dispatchClickEventWhenButtonAndSpaceKeyup(event: KeyboardEvent): void {
  if (event.key === ' ' && !(event.target as Element & { href?: string }).href) {
    (event.target as Element).dispatchEvent(
      new PointerEvent('click', { bubbles: true, cancelable: true, composed: true })
    );
  }
}

/**
 * Trigger an anchor element click after the event has finished the bubbling phase and
 * preventDefault() has not been called for the event.
 */
async function triggerAnchorWhenNecessary(event: Event): Promise<void> {
  const target = event.target as Element;
  const composedTarget = event.composedPath()[0] as Element;
  // We only want to trigger a click event on the inner anchor element, if the host element is the
  // event origin, which means the inner anchor element has not actually been activated/clicked.
  if (!target.tagName.startsWith('SBB-') || target !== composedTarget) {
    return;
  }
  // We need for the event phase to finish, which is the
  // case after a micro task (e.g. await Promise).
  await Promise.resolve();
  if (event.defaultPrevented) {
    return;
  }

  // We are using dispatchEvent here, instead of just .click() in order to
  // prevent another click event from bubbling up the DOM tree.
  target.shadowRoot.querySelector('a').dispatchEvent(new PointerEvent('click'));
}

/** Handle the click logic for an action element. */
export function handleLinkButtonClick(event: Event): void {
  const element = event.target as HTMLElement & Partial<LinkButtonProperties & IsStaticProperty>;
  if (element.isStatic) {
    return;
  } else if (element.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  } else if (element.href) {
    triggerAnchorWhenNecessary(event);
    return;
  } else if (!element.type || element.type === 'button') {
    return;
  }

  // Use querySelector with form and id selector, as the form property must
  // reference a valid <form> element
  const form = element.form
    ? (element.ownerDocument.querySelector(`form#${element.form}`) as HTMLFormElement)
    : element.closest('form');
  if (!form) {
    return;
  } else if (element.type === 'submit') {
    if (form.requestSubmit) {
      form.requestSubmit(element);
    } else {
      form.submit();
    }
  } else if (element.type === 'reset') {
    form.reset();
  }
}
