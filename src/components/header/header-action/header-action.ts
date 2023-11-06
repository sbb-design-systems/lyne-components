import { i18nTargetOpensInNewWindow } from '../core/i18n';
import {
  ButtonType,
  LinkButtonProperties,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../core/interfaces';
import { toggleDatasetEntry, isBreakpoint } from '../core/dom';
import {
  documentLanguage,
  HandlerRepository,
  actionElementHandlerAspect,
  languageChangeHandlerAspect,
} from '../core/eventing';
import { AgnosticResizeObserver } from '../core/observers';
import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { setAttributes } from '../core/dom';
import style from './sbb-header-action.scss?lit&inline';
import { html, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import '../sbb-icon';
import { SbbHorizontalFrom } from '../core/interfaces';

/**
 * @slot icon - Slot used to render the action icon.
 * @slot - Use the unnamed slot to add content to the header action.
 */
@customElement('sbb-header-action')
export class SbbHeaderAction extends LitElement implements LinkButtonProperties {
  public static override styles: CSSResult = style;

  /**
   * Used to set the minimum breakpoint from which the text is displayed.
   * E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra,
   * and hidden for all the others.
   */
  @property({ attribute: 'expand-from', reflect: true })
  public set expandFrom(value: SbbHorizontalFrom) {
    this._expandFrom = value;
    this._updateExpanded();
  }
  public get expandFrom(): SbbHorizontalFrom {
    return this._expandFrom;
  }
  private _expandFrom: SbbHorizontalFrom = 'medium';

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string;

  /** The href value you want to link to (if it is not present sbb-header-action becomes a button). */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean;

  /** Type attribute if component is displayed as a button. */
  @property() public type: ButtonType | undefined;

  /** Name attribute if component is displayed as a button. */
  @property({ reflect: true }) public name: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @property() public value?: string;

  /** Form attribute if component is displayed as a button. */
  @property() public form?: string;

  @state() private _currentLanguage = documentLanguage();

  private _documentResizeObserver = new AgnosticResizeObserver(() => this._updateExpanded());

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._documentResizeObserver.observe(document.documentElement);
    this._updateExpanded();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._documentResizeObserver.disconnect();
    this._handlerRepository.disconnect();
  }

  private _updateExpanded(): void {
    toggleDatasetEntry(this, 'expanded', !isBreakpoint('zero', this.expandFrom));
  }

  protected override render(): TemplateResult {
    const { tagName: TAG_NAME, attributes, hostAttributes } = resolveRenderVariables(this);
    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-header-action" ${spread(attributes)}>
        <span class="sbb-header-action__wrapper">
          <span class="sbb-header-action__icon">
            <slot name="icon"
              >${
                this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing
              }</slot
            >
          </span>
          <span class="sbb-header-action__text">
            <slot></slot>
            ${
              targetsNewWindow(this)
                ? html`<span class="sbb-header-action__opens-in-new-window">
                    . ${i18nTargetOpensInNewWindow[this._currentLanguage]}
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
    'sbb-header-action': SbbHeaderAction;
  }
}
