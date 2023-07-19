import { getDocumentWritingMode } from '../dom';

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
  /** The tag's name rendered by the component. */
  tagName: 'a' | 'button' | 'span';

  /** The tag's attributes. */
  attributes: Record<string, string>;

  /** The host's attributes. */
  hostAttributes?: Record<string, string>;
}

/**
 * The interface contains the possible attributes of both the <a> and the <button> tags.
 * It is intended to be used in all cases where a component needs to render a tag that can be an <a> or a <button>,
 * for instance depending on whether the value of the href attribute is present or not.
 * NOTE: a class could not be created because StencilJS does not support inheritance/component extension.
 */
export interface LinkButtonProperties extends LinkProperties, ButtonProperties {}

/** Indicates that a class or object can be static/non-interactive. */
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

/**
 * Lists all attributes for a link; undefined/null properties are not set.
 * @param linkProperties link properties
 */
function getLinkAttributeList(linkProperties: LinkProperties): Record<string, string> {
  const baseAttributeList = {
    role: 'presentation',
    tabIndex: '-1',
  };

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

function hostProperties(role: string, disabled: boolean): Record<string, string> {
  return Object.assign(
    { role, dir: getDocumentWritingMode() },
    disabled ? { 'aria-disabled': 'true' } : { tabIndex: '0' },
  );
}

/** Set default render variables for link case. */
function resolveLinkRenderVariables(
  properties: LinkProperties & Pick<ButtonProperties, 'disabled'>,
): LinkButtonRenderVariables {
  return {
    tagName: 'a',
    attributes: getLinkAttributeList(properties),
    hostAttributes: hostProperties('link', properties.disabled),
  };
}

/** Set default render variables when the element is static (button/link inside another button/link). */
function resolveStaticRenderVariables(): LinkButtonRenderVariables {
  return {
    tagName: 'span',
    attributes: {},
    hostAttributes: { dir: getDocumentWritingMode() },
  };
}

/** Set default render variables for button case. */
export function resolveButtonRenderVariables(
  properties: ButtonProperties,
): LinkButtonRenderVariables {
  return {
    tagName: 'span',
    attributes: {},
    hostAttributes: hostProperties('button', properties.disabled),
  };
}

/**
 * Set default render variables based on the 'default' condition, checking first `isStatic` property, then the `href`.
 * @param properties used to set the 'attributes' property and to check for `href` value.
 */
export function resolveRenderVariables(
  properties: LinkButtonProperties & Partial<IsStaticProperty>,
): LinkButtonRenderVariables {
  if (properties.isStatic) {
    return resolveStaticRenderVariables();
  } else if (properties.href) {
    return resolveLinkRenderVariables(properties);
  }
  return resolveButtonRenderVariables(properties);
}

/**
 * Returns the link render variables or static variables if there is no href property.
 * @param linkProperties used to set variables and to check if href property is set.
 */
export function resolveLinkOrStaticRenderVariables(
  linkProperties: LinkProperties,
): LinkButtonRenderVariables {
  return linkProperties.href
    ? resolveLinkRenderVariables(linkProperties)
    : resolveStaticRenderVariables();
}

/** Returns true, if href is set and target is _blank. */
export function targetsNewWindow(properties: LinkProperties): boolean {
  return properties.href && properties.target === '_blank';
}
