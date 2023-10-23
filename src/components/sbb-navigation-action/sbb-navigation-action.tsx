import {
  ButtonType,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { hostContext } from '../../global/dom';
import {
  documentLanguage,
  HandlerRepository,
  actionElementHandlerAspect,
  languageChangeHandlerAspect,
  ConnectedAbortController,
} from '../../global/eventing';
import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { SbbNavigationMarker } from '../sbb-navigation-marker/index';
import { setAttributes } from '../../global/dom';
import Style from './sbb-navigation-action.scss?lit&inline';

/**
 * @slot unnamed - Use this slot to provide the navigation action label.
 */
@customElement('sbb-navigation-action')
export class SbbNavigationAction extends LitElement {
  public static override styles: CSSResult = Style;

  /**
   * Action size variant.
   */
  @property({ reflect: true }) public size?: 'l' | 'm' | 's' = 'l';

  /**
   * The href value you want to link to (if it is not present, navigation action becomes a button).
   */
  @property() public href: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @property() public target?: LinkTargetType | string | undefined;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @property() public rel?: string | undefined;

  /**
   * Whether the browser will show the download dialog on click.
   */
  @property({ type: Boolean }) public download?: boolean;

  /**
   * The type attribute to use for the button.
   */
  @property() public type: ButtonType | undefined;

  /**
   * Whether the action is active.
   */
  @property({ reflect: true, type: Boolean })
  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    const oldValue = this.active;
    if (value !== oldValue) {
      this._active = value;
      this._handleActiveChange(this.active, oldValue);
    }
    this.requestUpdate('active', oldValue);
  }

  private _active = false;

  /**
   * The name attribute to use for the button.
   */
  @property({ reflect: true }) public name: string | undefined;

  /**
   * The value attribute to use for the button.
   */
  @property() public value?: string;

  @state() private _currentLanguage = documentLanguage();

  private _navigationMarker: SbbNavigationMarker;
  private _abort = new ConnectedAbortController(this);

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener(
      'click',
      () => {
        if (!this.active && this._navigationMarker) {
          this.active = true;
        }
      },
      { signal },
    );
    this._handlerRepository.connect();

    // Check if the current element is nested inside a navigation marker.
    this._navigationMarker = hostContext('sbb-navigation-marker', this) as SbbNavigationMarker;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  // Check whether the `active` attribute has been added or removed from the DOM
  // and call the `select()` or `reset()` method accordingly.
  private _handleActiveChange(newValue: boolean, oldValue: boolean): void {
    if (newValue && !oldValue) {
      this._navigationMarker?.select(this);
    } else if (!newValue && oldValue) {
      this._navigationMarker?.reset();
    }
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-navigation-action" ${spread(attributes)}>
        <slot></slot>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-navigation-action__opens-in-new-window">
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
    'sbb-navigation-action': SbbNavigationAction;
  }
}
