import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { setAttributes } from '../dom';
import { linkHandlerAspect, HandlerRepository } from '../eventing';
import { i18nTargetOpensInNewWindow } from '../i18n';

import { hostProperties } from './host-properties';
import { LanguageController } from './language-controller';

import '../../screenreader-only';

/** Enumeration for 'target' attribute in <a> HTML tag. */
export type LinkTargetType = '_blank' | '_self' | '_parent' | '_top';

/** The interface contains attributes that can be set on an <a> tag. */
export interface LinkProperties {
  href?: string;
  target?: LinkTargetType | string;
  rel?: string;
  download?: boolean;
  disabled?: boolean;
}

function filterUndefined(...objects: Record<string, string | undefined>[]): Record<string, string> {
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

/** A component that implements LinkProperties should use this interface to set useful variables for render function. */
export interface LinkRenderVariables {
  /** The tag's attributes. */
  attributes: Record<string, string>;

  /** The host's attributes. */
  hostAttributes: Record<string, string | undefined>;
}

/** Set default render variables for anchor-like elements. */
export function resolveLinkRenderVariables(properties: LinkProperties): LinkRenderVariables {
  return {
    attributes: getLinkAttributeList(properties),
    hostAttributes: hostProperties('link', properties.disabled),
  };
}

/** Returns true, if href is set and target is _blank. */
export function targetsNewWindow(properties: LinkProperties): boolean {
  return !!properties.href && properties.target === '_blank';
}

/** Link base class. */
export abstract class SbbLinkBaseElement extends LitElement implements LinkProperties {
  /** The href value you want to link to. */
  @property() public href?: string;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean;

  protected language = new LanguageController(this);
  private _handlerRepository = new HandlerRepository(this, linkHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected renderTargetNewWindow(): TemplateResult | typeof nothing {
    return targetsNewWindow(this)
      ? html`
          <sbb-screenreader-only
            >. ${i18nTargetOpensInNewWindow[this.language.current]}</sbb-screenreader-only
          >
        `
      : nothing;
  }

  /** Implement this method to render the link-like component template. */
  protected abstract renderTemplate(attributes: Record<string, string>): TemplateResult;

  /** Default render method for link-like components. Can be overridden if the LinkRenderVariables are not needed. */
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);
    return this.renderTemplate(attributes);
  }
}
