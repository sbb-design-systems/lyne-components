import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import {
  InterfaceSbbRadioButtonAttributes,
  RadioButtonStateChange,
} from './sbb-radio-button.custom';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import {
  createNamedSlotState,
  documentLanguage,
  formElementHandlerAspect,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { i18nCollapsed, i18nExpanded } from '../../global/i18n';

/** Configuration for the attribute to look at if component is nested in a sbb-radio-button-group */
const radioButtonObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-required', 'data-group-disabled'],
};

/**
 * @slot unnamed - Use this slot to provide the radio label.
 * @slot subtext - Slot used to render a subtext under the label (only visible within a selection panel).
 * @slot suffix - Slot used to render additional content after the label (only visible within a selection panel).
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-radio-button.scss',
  tag: 'sbb-radio-button',
})
export class SbbRadioButton implements ComponentInterface {
  /**
   * Whether the radio can be deselected.
   */
  @Prop() public allowEmptySelection = false;

  /**
   * Value of radio button.
   */
  @Prop() public value: string;

  /**
   * Whether the radio button is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the radio button is required.
   */
  @Prop() public required = false;

  /**
   * Whether the radio button is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Label size variant, either m or s.
   */
  @Prop({ reflect: true, mutable: true }) public size: InterfaceSbbRadioButtonAttributes['size'] =
    'm';

  /**
   * Whether the component must be set disabled due disabled attribute on sbb-radio-button-group.
   */
  @State() private _disabledFromGroup = false;

  /**
   * Whether the component must be set required due required attribute on sbb-radio-button-group.
   */
  @State() private _requiredFromGroup = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('subtext', 'suffix');

  /**
   * Whether the input is the main input of a selection panel.
   */
  @State() private _isSelectionPanelInput = false;

  /**
   * The label describing whether the selection panel is expanded (for screen readers only).
   */
  @State() private _selectionPanelExpandedLabel: string;

  @State() private _currentLanguage = documentLanguage();

  private _selectionPanelElement: HTMLElement;
  private _radioButtonAttributeObserver = new MutationObserver(
    this._onRadioButtonAttributesChange.bind(this)
  );

  @Element() private _element!: HTMLElement;

  /**
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  @Event({
    bubbles: true,
    eventName: 'state-change',
  })
  public stateChange: EventEmitter<RadioButtonStateChange>;

  @Watch('checked')
  public handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.stateChange.emit({ type: 'checked', checked: currentValue });
      !!this._selectionPanelElement && this._updateExpandedLabel();
    }
  }

  @Watch('disabled')
  public handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  @Listen('click')
  public async handleClick(event: Event): Promise<void> {
    event.preventDefault();
    await this.select();
  }

  @Method()
  public async select(): Promise<void> {
    if (this.disabled || this._disabledFromGroup) {
      return;
    }

    if (this.allowEmptySelection) {
      this.checked = !this.checked;
    } else if (!this.checked) {
      this.checked = true;
    }
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
    formElementHandlerAspect
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    // We can use closest here, as we expect the parent sbb-selection-panel to be in light DOM.
    this._selectionPanelElement = this._element.closest('sbb-selection-panel');
    this._isSelectionPanelInput =
      !!this._selectionPanelElement &&
      !this._element.closest('sbb-selection-panel [slot="content"]');
    this._setupInitialStateAndAttributeObserver();
  }

  public componentDidLoad(): void {
    !!this._selectionPanelElement && this._updateExpandedLabel();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._radioButtonAttributeObserver.disconnect();
  }

  @Listen('keydown')
  public async handleKeyDown(evt: KeyboardEvent): Promise<void> {
    if (evt.code === 'Space') {
      await this.select();
    }
  }

  // Set up the initial disabled/required values and start observe attributes changes.
  private _setupInitialStateAndAttributeObserver(): void {
    const parentGroup = this._element.closest('sbb-radio-button-group');
    if (parentGroup) {
      this._requiredFromGroup = isValidAttribute(parentGroup, 'required');
      this._disabledFromGroup = isValidAttribute(parentGroup, 'disabled');
      this.size = parentGroup.size;
    }
    this._radioButtonAttributeObserver.observe(this._element, radioButtonObserverConfig);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onRadioButtonAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = !!isValidAttribute(this._element, 'data-group-disabled');
      }
      if (mutation.attributeName === 'data-group-required') {
        this._requiredFromGroup = !!isValidAttribute(this._element, 'data-group-required');
      }
    }
  }

  private _updateExpandedLabel(): void {
    if (!this._selectionPanelElement.hasAttribute('data-has-content')) {
      return;
    }

    this._selectionPanelExpandedLabel = this.checked
      ? ', ' + i18nExpanded[this._currentLanguage]
      : ', ' + i18nCollapsed[this._currentLanguage];
  }

  public render(): JSX.Element {
    const attributes = {
      role: 'radio',
      'aria-checked': this.checked?.toString() ?? 'false',
      'aria-required': (this.required || this._requiredFromGroup).toString(),
      'aria-disabled': (this.disabled || this._disabledFromGroup).toString(),
      'data-is-selection-panel-input': this._isSelectionPanelInput,
    };
    return (
      <Host {...attributes}>
        <label class="sbb-radio-button">
          <input
            type="radio"
            aria-hidden="true"
            tabindex="-1"
            disabled={this.disabled || this._disabledFromGroup}
            required={this.required || this._requiredFromGroup}
            checked={this.checked}
            value={this.value}
            class="sbb-radio-button__input"
          />
          <span class="sbb-radio-button__label-slot">
            <slot />
            {!!this._selectionPanelElement && this._namedSlots['suffix'] && <slot name="suffix" />}
          </span>
          {!!this._selectionPanelElement && this._namedSlots['subtext'] && <slot name="subtext" />}
          {!!this._selectionPanelElement && this._selectionPanelExpandedLabel && (
            /* For screen readers only */
            <span class="sbb-radio-button__expanded-label">
              {this._selectionPanelExpandedLabel}
            </span>
          )}
        </label>
      </Host>
    );
  }
}
