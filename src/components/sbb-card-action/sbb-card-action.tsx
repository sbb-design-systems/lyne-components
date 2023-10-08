import {
  ButtonType,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces';
import { IS_FOCUSABLE_QUERY } from '../../global/a11y';
import { toggleDatasetEntry } from '../../global/dom';
import {
  documentLanguage,
  HandlerRepository,
  actionElementHandlerAspect,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { AgnosticMutationObserver } from '../../global/observers';
import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbCard } from '../sbb-card/index';
import { setAttribute, setAttributes } from '../../global/dom';
import Style from './sbb-card-action.scss?lit&inline';
import { html, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';

/**
 * @slot unnamed - Slot to render a descriptive label / title of the action (important!). This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-action')
export class SbbCardAction extends LitElement {
  public static override styles: CSSResult = Style;

  /** Whether the card is active. */
  @property({ reflect: true, type: Boolean })
  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    const oldValue = this._active;
    this._active = value;
    this._onActiveChange();
    this.requestUpdate('active', oldValue);
  }
  private _active: boolean = false;

  /** The href value you want to link to. */
  @property({ reflect: true }) public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @property() public download?: boolean | undefined;

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
