import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { InterfaceButtonAttributes } from './sbb-button.custom';
import {
  ButtonType,
  IsStaticProperty,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { ACTION_ELEMENTS, hostContext } from '../../global/helpers/host-context';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  actionElementHandlerAspect,
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/**
 * @slot unnamed - Button Content
 * @slot icon - Slot used to display the icon, if one is set
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-button.scss',
  tag: 'sbb-button',
})
export class SbbButton implements ComponentInterface, LinkButtonProperties, IsStaticProperty {
  /** Variant of the button, like primary, secondary etc. */
  @Prop({ reflect: true }) public variant: InterfaceButtonAttributes['variant'] = 'primary';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /** Size variant, either l or m. */
  @Prop({ reflect: true }) public size?: InterfaceButtonAttributes['size'] = 'l';

  /**
   * Set this property to true if you want only a visual representation of a
   * button, but no interaction (a span instead of a link/button will be rendered).
   */
  @Prop({ mutable: true, reflect: true }) public isStatic = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Prop() public iconName?: string;

  /** The href value you want to link to (if it is present, button becomes a link). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** The name attribute to use for the button. */
  @Prop({ reflect: true }) public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

  @Element() private _element!: HTMLElement;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _hasText = false;

  @State() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  public connectedCallback(): void {
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this._element);
    this._hasText = Array.from(this._element.childNodes).some(
      (n) => !(n as Element).slot && n.textContent?.trim()
    );
    this._handlerRepository.connect();
    if (this._element.closest('sbb-form-field') || this._element.closest('[data-form-field]')) {
      toggleDatasetEntry(this._element, 'iconSmall', true);
    }
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n) => !!n.textContent?.trim());
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    return (
      <Host {...hostAttributes} data-icon-only={!this._hasText}>
        <TAG_NAME class="sbb-button" {...attributes}>
          {(this.iconName || this._namedSlots.icon) && (
            <span class="sbb-button__icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
          )}

          <span class="sbb-button__label">
            <slot onSlotchange={(event): void => this._onLabelSlotChange(event)} />
            {targetsNewWindow(this) && (
              <span class="sbb-button__opens-in-new-window">
                . {i18nTargetOpensInNewWindow[this._currentLanguage]}
              </span>
            )}
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
