import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { setAttributes } from '../core/dom';
import {
  documentLanguage,
  HandlerRepository,
  linkHandlerAspect,
  languageChangeHandlerAspect,
} from '../core/eventing';
import { i18nTargetOpensInNewWindow } from '../core/i18n';
import {
  LinkProperties,
  LinkTargetType,
  resolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../core/interfaces';

import style from './teaser-hero.scss?lit&inline';
import '../link';
import '../image';

/**
 * It displays an image and an action call within a panel.
 *
 * @slot - Use the unnamed slot to add text content to the panel
 * @slot link-content - Link content of the panel
 * @slot image - The background image that can be a `sbb-image`
 */
@customElement('sbb-teaser-hero')
export class SbbTeaserHero extends LitElement implements LinkProperties {
  public static override styles: CSSResultGroup = style;

  /** The href value you want to link to. */
  @property() public href: string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** Panel link text. */
  @property({ attribute: 'link-content' }) public linkContent?: string;

  /** Image src will be passed to `sbb-image`. */
  @property({ attribute: 'image-src' }) public imageSrc?: string;

  /** Image alt text will be passed to `sbb-image`. */
  @property({ attribute: 'image-alt' }) public imageAlt?: string;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    linkHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    } = resolveLinkOrStaticRenderVariables(this);

    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
        <${unsafeStatic(TAG_NAME)} class="sbb-teaser-hero" ${spread(attributes)}>
          <span class="sbb-teaser-hero__panel">
            <p class="sbb-teaser-hero__panel-text">
              <slot></slot>
            </p>
            ${
              this.href
                ? html`<sbb-link
                    class="sbb-teaser-hero__panel-link"
                    icon-name="chevron-small-right-small"
                    icon-placement="end"
                    size="m"
                    negative
                  >
                    <slot name="link-content">${this.linkContent}</slot>
                  </sbb-link>`
                : nothing
            }
          </span>
          <slot name="image">
            ${
              this.imageSrc
                ? html`<sbb-image
                    image-src=${this.imageSrc}
                    alt=${this.imageAlt ?? nothing}
                  ></sbb-image>`
                : nothing
            }
          </slot>
          ${
            targetsNewWindow(this)
              ? html`<span class="sbb-teaser-hero__opens-in-new-window">
                  . ${i18nTargetOpensInNewWindow[this._currentLanguage]}
                </span>`
              : nothing
          }
        </${unsafeStatic(TAG_NAME)}>
      `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-hero': SbbTeaserHero;
  }
}
