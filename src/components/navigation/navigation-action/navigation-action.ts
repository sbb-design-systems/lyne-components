import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController } from '../../core/common-behaviors';
import { hostContext, setAttributes } from '../../core/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  ConnectedAbortController,
} from '../../core/eventing';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import {
  ButtonType,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../core/interfaces';
import type { SbbNavigationMarkerElement } from '../navigation-marker';

import style from './navigation-action.scss?lit&inline';

/**
 * It displays an action element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-action`.
 */
@customElement('sbb-navigation-action')
export class SbbNavigationActionElement extends LitElement {
  public static override styles: CSSResultGroup = style;

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
  public set active(value: boolean) {
    const oldValue = this.active;
    if (value !== oldValue) {
      this._active = value;
      this._handleActiveChange(this.active, oldValue);
    }
  }
  public get active(): boolean {
    return this._active;
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

  private _navigationMarker: SbbNavigationMarkerElement;
  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this);

  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

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
    this._navigationMarker = hostContext(
      'sbb-navigation-marker',
      this,
    ) as SbbNavigationMarkerElement;
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
                . ${i18nTargetOpensInNewWindow[this._language.current]}
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
    'sbb-navigation-action': SbbNavigationActionElement;
  }
}
