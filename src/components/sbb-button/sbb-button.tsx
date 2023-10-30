import {
  ButtonType,
  IsStaticProperty,
  LinkButtonProperties,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  actionElementHandlerAspect,
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import {
  ACTION_ELEMENTS,
  hostContext,
  isValidAttribute,
  toggleDatasetEntry,
} from '../../global/dom';
import { LitElement, nothing, TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { setAttribute, setAttributes } from '../../global/dom';
import style from './sbb-button.scss?lit&inline';
import '../sbb-icon';

export type SbbButtonSize = 'l' | 'm';

/**
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button')
export class SbbButton extends LitElement implements LinkButtonProperties, IsStaticProperty {
  public static override styles = style;

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
  @property({ attribute: 'icon-name' }) public iconName?: string;

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

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('icon');

  @state() private _hasText = false;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this);
    this._hasText = Array.from(this.childNodes).some(
      (n) => !(n as Element).slot && n.textContent?.trim(),
    );
    this._handlerRepository.connect();

    const formField = this.closest('sbb-form-field') ?? this.closest('[data-form-field]');
    if (formField) {
      toggleDatasetEntry(this, 'iconSmall', true);
      this.negative = isValidAttribute(formField, 'negative');
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n) => !!n.textContent?.trim());
  }

  protected override render(): TemplateResult {
    const { tagName: TAG_NAME, attributes, hostAttributes } = resolveRenderVariables(this);

    setAttributes(this, hostAttributes);
    setAttribute(this, 'data-icon-only', !this._hasText);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-button" ${spread(attributes)}>
        ${
          this.iconName || this._namedSlots.icon
            ? html`<span class="sbb-button__icon">
                <slot name="icon">
                  ${this.iconName ? html`<sbb-icon name="${this.iconName}" />` : nothing}
                </slot>
              </span>`
            : nothing
        }

        <span class="sbb-button__label">
          <slot @slotchange=${this._onLabelSlotChange}></slot>
          ${
            targetsNewWindow(this)
              ? html`<span class="sbb-button__opens-in-new-window">
                  . ${i18nTargetOpensInNewWindow[this._currentLanguage]}
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
    'sbb-button': SbbButton;
  }
}
