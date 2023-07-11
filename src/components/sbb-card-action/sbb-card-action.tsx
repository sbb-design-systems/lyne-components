import {
  Component,
  ComponentInterface,
  Element,
  Fragment,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import {
  actionElementHandlerAspect,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { IS_FOCUSABLE_QUERY } from '../../global/helpers/focus';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';

/**
 * @slot unnamed - Slot to render a descriptive label / title of the action (important!). This is relevant for SEO and screen readers.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-card-action.scss',
  tag: 'sbb-card-action',
})
export class SbbCardAction implements ComponentInterface, LinkButtonProperties {
  /** Whether the card is active. */
  @Prop({ reflect: true }) public active = false;

  /** The href value you want to link to. */
  @Prop({ reflect: true }) public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean | undefined;

  /** Default behaviour of the button. */
  @Prop() public type: ButtonType | undefined;

  /** The name of the button. */
  @Prop({ reflect: true }) public name: string | undefined;

  /** The <form> element to associate the button to it. */
  @Prop() public form?: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @Prop() public value?: string | undefined;

  @State() private _currentLanguage = documentLanguage();

  @Watch('active')
  public onActiveChange(): void {
    if (this._card) {
      toggleDatasetEntry(this._card, 'hasActiveAction', this.active);
    }
  }

  @Element() private _element!: HTMLElement;

  private _abortController = new AbortController();
  private _card: HTMLSbbCardElement | null = null;
  private _cardMutationObserver = new MutationObserver(() => this._checkForSlottedActions());

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public constructor() {
    // Set slot name as early as possible
    this._element.setAttribute('slot', 'action');
  }

  public connectedCallback(): void {
    this._abortController = new AbortController();

    this._card = this._element.closest('sbb-card');
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

  public disconnectedCallback(): void {
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

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    if (this._card) {
      this._card.dataset.actionRole = hostAttributes.role;
    }

    return (
      <Host {...hostAttributes}>
        <TAG_NAME {...attributes} class="sbb-card-action">
          <span class="sbb-card-action__label">
            <slot></slot>
            {targetsNewWindow(this) && (
              <Fragment>. {i18nTargetOpensInNewWindow[this._currentLanguage]}</Fragment>
            )}
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
