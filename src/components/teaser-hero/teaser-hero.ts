import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  LanguageController,
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
  targetsNewWindow,
} from '../core/common-behaviors';
import type { LinkRenderVariables } from '../core/common-behaviors';
import { setAttributes } from '../core/dom';
import { HandlerRepository, linkHandlerAspect } from '../core/eventing';
import { i18nTargetOpensInNewWindow } from '../core/i18n';
import '../link';
import '../image';

import style from './teaser-hero.scss?lit&inline';

/**
 * It displays an image and an action call within a panel.
 *
 * @slot - Use the unnamed slot to add text content to the panel
 * @slot link-content - Link content of the panel
 * @slot image - The background image that can be a `sbb-image`
 */
@customElement('sbb-teaser-hero')
export class SbbTeaserHeroElement extends SbbLinkBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Panel link text. */
  @property({ attribute: 'link-content' }) public linkContent?: string;

  /** Image src will be passed to `sbb-image`. */
  @property({ attribute: 'image-src' }) public imageSrc?: string;

  /** Image alt text will be passed to `sbb-image`. */
  @property({ attribute: 'image-alt' }) public imageAlt?: string;

  private _language = new LanguageController(this);
  private _handlerRepository = new HandlerRepository(this, linkHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);

    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-teaser-hero" ${spread(attributes)}>
        <span class="sbb-teaser-hero__panel">
          <p class="sbb-teaser-hero__panel-text">
            <slot></slot>
          </p>
          ${this.href
            ? html`<sbb-link-static
                class="sbb-teaser-hero__panel-link"
                icon-name="chevron-small-right-small"
                icon-placement="end"
                size="m"
                negative
              >
                <slot name="link-content">${this.linkContent}</slot>
              </sbb-link-static>`
            : nothing}
        </span>
        <slot name="image">
          ${this.imageSrc
            ? html`<sbb-image
                image-src=${this.imageSrc}
                alt=${this.imageAlt ?? nothing}
              ></sbb-image>`
            : nothing}
        </slot>
        ${targetsNewWindow(this)
          ? html`<span class="sbb-teaser-hero__opens-in-new-window">
              . ${i18nTargetOpensInNewWindow[this._language.current]}
            </span>`
          : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-hero': SbbTeaserHeroElement;
  }
}
