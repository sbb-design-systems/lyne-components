import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController } from '../core/common-behaviors';
import { setAttributes } from '../core/dom';
import {
  HandlerRepository,
  linkHandlerAspect,
  createNamedSlotState,
  namedSlotChangeHandlerAspect,
} from '../core/eventing';
import { i18nTargetOpensInNewWindow } from '../core/i18n';
import type { LinkProperties, LinkTargetType } from '../core/interfaces';
import { resolveLinkOrStaticRenderVariables, targetsNewWindow } from '../core/interfaces';
import type { TitleLevel } from '../title';
import '../title';
import '../chip';

import style from './teaser.scss?lit&inline';

/**
 * It displays an interactive image with caption.
 *
 * @slot image - Slot used to render the image.
 * @slot chip - Slot used to render the sbb-chip label.
 * @slot title - Slot used to render the title.
 * @slot description - Slot used to render the description.
 */
@customElement('sbb-teaser')
export class SbbTeaserElement extends LitElement implements LinkProperties {
  public static override styles: CSSResultGroup = style;

  /** Teaser variant - define the position and the alignment of the text block. */
  @property({ reflect: true }) public alignment: 'after-centered' | 'after' | 'below';

  /** Heading level of the sbb-title element (e.g. h1-h6). */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '5';

  /** The href value you want to link to. */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  private _language = new LanguageController(this);

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('chip');

  private _handlerRepository = new HandlerRepository(
    this,
    linkHandlerAspect,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
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
      <${unsafeStatic(TAG_NAME)} class="sbb-teaser" ${spread(attributes)}>
        <span class="sbb-teaser__container">
          <span class="sbb-teaser__image-wrapper">
            <slot name="image"></slot>
          </span>
          <span class="sbb-teaser__text">
            ${
              this._namedSlots.chip
                ? html`<span class="sbb-teaser__chip-container">
                    <sbb-chip size="xxs" color="charcoal" class="sbb-teaser__chip">
                      <slot name="chip"></slot>
                    </sbb-chip>
                  </span>`
                : nothing
            }
            <sbb-title level=${this.titleLevel} visual-level="5" class="sbb-teaser__lead">
              <slot name="title"></slot>
            </sbb-title>
            <p class="sbb-teaser__description">
              <slot name="description"></slot>
            </p>
            ${
              targetsNewWindow(this)
                ? html`<span class="sbb-teaser__opens-in-new-window">
                    . ${i18nTargetOpensInNewWindow[this._language.current]}
                  </span>`
                : nothing
            }
          </span>
        </span>
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser': SbbTeaserElement;
  }
}
