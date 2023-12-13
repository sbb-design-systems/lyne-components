import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController, NamedSlotStateController } from '../core/common-behaviors';
import {
  ACTION_ELEMENTS,
  hostContext,
  isValidAttribute,
  toggleDatasetEntry,
  setAttribute,
  setAttributes,
} from '../core/dom';
import { actionElementHandlerAspect, HandlerRepository } from '../core/eventing';
import { i18nTargetOpensInNewWindow } from '../core/i18n';
import {
  ButtonType,
  IsStaticProperty,
  LinkButtonProperties,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../core/interfaces';

import style from './button.scss?lit&inline';
import '../icon';

export type SbbButtonSize = 'l' | 'm';

/**
 * It displays a button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button')
export class SbbButtonElement extends LitElement implements LinkButtonProperties, IsStaticProperty {
  public static override styles: CSSResultGroup = style;

  /** Variant of the button, like primary, secondary etc. */
  @property({ reflect: true }) public variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'transparent' = 'primary';

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /** Size variant, either l or m. */
  @property({ reflect: true }) public size?: SbbButtonSize = 'l';

  /**
   * Set this property to true if you want only a visual representation of a
   * button, but no interaction (a span instead of a link/button will be rendered).
   */
  @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;

  /** The href value you want to link to (if it is present, button becomes a link). */
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

  @state() private _hasText = false;

  private _language = new LanguageController(this);
  private _namedSlots = new NamedSlotStateController(this, () => this._onLabelSlotChange());
  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this);
    this._hasText = Array.from(this.childNodes ?? []).some(
      (n) => !(n as Element).slot && n.textContent?.trim(),
    );
    this._handlerRepository.connect();

    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      toggleDatasetEntry(this, 'iconSmall', true);
      this.negative = isValidAttribute(formField, 'negative');
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _onLabelSlotChange(): void {
    this._hasText = this._namedSlots.slots.has('unnamed');
  }

  protected override render(): TemplateResult {
    const { tagName: TAG_NAME, attributes, hostAttributes } = resolveRenderVariables(this);

    setAttributes(this, hostAttributes);
    setAttribute(this, 'data-icon-only', !this._hasText);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-button" ${spread(attributes)}>
        <span class="sbb-button__icon">
          <slot name="icon">
            ${this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
          </slot>
        </span>

        <span class="sbb-button__label">
          <slot></slot>
          ${
            targetsNewWindow(this)
              ? html`<span class="sbb-button__opens-in-new-window">
                  . ${i18nTargetOpensInNewWindow[this._language.current]}
                </span>`
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
    'sbb-button': SbbButtonElement;
  }
}
