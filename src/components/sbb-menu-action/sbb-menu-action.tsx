import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  actionElementHandlerAspect,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { setAttributes } from '../../global/dom';
import style from './sbb-menu-action.scss?lit&inline';
import '../sbb-icon';

/**
 * @slot - Use the unnamed slot to add content to the menu action.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 */
@customElement('sbb-menu-action')
export class SbbMenuAction extends LitElement implements LinkButtonProperties {
  public static override styles: CSSResult = style;

  /**
   * The name of the icon, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string | undefined;

  /** Value shown as badge at component end. */
  @property() public amount?: string | undefined;

  /** The href value you want to link to (if it is not present menu action becomes a button). */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean;

  /** The type attribute to use for the button. */
  @property() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled = false;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** The value attribute to use for the button. */
  @property() public value?: string;

  /** The <form> element to associate the button with. */
  @property() public form?: string;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
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
      hostAttributes,
      attributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-menu-action" ${spread(attributes)}>
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon"
              >${this.iconName ? html`<sbb-icon name=${this.iconName} />` : nothing}</slot
            >
          </span>
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          ${
            this.amount && !this.disabled
              ? html`<span class="sbb-menu-action__amount">${this.amount}</span>`
              : nothing
          }
        </span>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-menu-action__opens-in-new-window">
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
    'sbb-menu-action': SbbMenuAction;
  }
}
