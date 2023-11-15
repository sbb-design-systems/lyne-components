import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y';
import { toggleDatasetEntry, setAttribute, setAttributes } from '../../core/dom';
import {
  documentLanguage,
  HandlerRepository,
  actionElementHandlerAspect,
  languageChangeHandlerAspect,
} from '../../core/eventing';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../core/interfaces';
import { AgnosticMutationObserver } from '../../core/observers';
import type { SbbCard } from '../card';

import style from './card-action.scss?lit&inline';

/**
 * It turns the `sbb-card` into an action element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the action (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-action')
export class SbbCardAction extends LitElement implements LinkButtonProperties {
  public static override styles: CSSResultGroup = style;

  /** Whether the card is active. */
  @property({ reflect: true, type: Boolean })
  public set active(value: boolean) {
    this._active = value;
    this._onActiveChange();
  }
  public get active(): boolean {
    return this._active;
  }
  private _active: boolean = false;

  /** The href value you want to link to. */
  @property({ reflect: true }) public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean | undefined;

  /** Default behaviour of the button. */
  @property() public type: ButtonType | undefined;

  /** The name of the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** The <form> element to associate the button to it. */
  @property() public form?: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @property() public value?: string | undefined;

  @state() private _currentLanguage = documentLanguage();

  private _onActiveChange(): void {
    if (this._card) {
      toggleDatasetEntry(this._card, 'hasActiveAction', this.active);
    }
  }

  private _abortController = new AbortController();
  private _card: SbbCard | null = null;
  private _cardMutationObserver = new AgnosticMutationObserver(() =>
    this._checkForSlottedActions(),
  );

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._abortController = new AbortController();

    this._card = this.closest('sbb-card');
    if (this._card) {
      toggleDatasetEntry(this._card, 'hasAction', true);
      toggleDatasetEntry(this._card, 'hasActiveAction', this.active);

      this._checkForSlottedActions();
      this._cardMutationObserver.observe(this._card, {
        childList: true,
        subtree: true,
      });
    }

    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._card) {
      toggleDatasetEntry(this._card, 'hasAction', false);
      toggleDatasetEntry(this._card, 'hasActiveAction', false);
      toggleDatasetEntry(this._card, 'actionRole', false);
      this._card
        .querySelectorAll(`[data-card-focusable]`)
        .forEach((el) => el.removeAttribute('data-card-focusable'));
      this._card = null;
    }
    this._handlerRepository.disconnect();
    this._cardMutationObserver.disconnect();
    this._abortController.abort();
  }

  private _checkForSlottedActions(): void {
    const cardFocusableAttributeName = 'data-card-focusable';

    this._card
      .querySelectorAll(`[${cardFocusableAttributeName}]:not(${IS_FOCUSABLE_QUERY})`)
      .forEach((el) => el.removeAttribute(cardFocusableAttributeName));

    this._card
      .querySelectorAll(
        `${IS_FOCUSABLE_QUERY}:not([${cardFocusableAttributeName}], sbb-card-action)`,
      )
      .forEach((el) => el.setAttribute(cardFocusableAttributeName, ''));
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    if (this._card) {
      this._card.dataset.actionRole = hostAttributes.role;
    }

    setAttribute(this, 'slot', 'action');
    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} ${spread(attributes)} class="sbb-card-action">
        <span class="sbb-card-action__label">
          <slot></slot>
          ${
            targetsNewWindow(this)
              ? html`. ${i18nTargetOpensInNewWindow[this._currentLanguage]}`
              : nothing
          }
        </span>
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-action': SbbCardAction;
  }
}
