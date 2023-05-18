import {
  Component,
  Prop,
  h,
  JSX,
  Element,
  State,
  ComponentInterface,
  Listen,
  EventEmitter,
  Event,
  Watch,
  Host,
} from '@stencil/core';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { CheckboxStateChange, InterfaceSbbCheckboxAttributes } from './sbb-checkbox.custom';
import {
  createNamedSlotState,
  documentLanguage,
  forwardEventToHost,
  getEventTarget,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { i18nCollapsed, i18nExpanded } from '../../global/i18n';

/** Configuration for the attribute to look at if component is nested in a sbb-checkbox-group */
const checkboxObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-required', 'data-group-disabled'],
};

/**
 * @slot unnamed - Slot used to render the checkbox label's text.
 * @slot icon - Slot used to render the checkbox icon (disabled inside a selection panel).
 * @slot subtext - Slot used to render a subtext under the label (only visible within a selection panel).
 * @slot suffix - Slot used to render additional content after the label (only visible within a selection panel).
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox.scss',
  tag: 'sbb-checkbox',
})
export class SbbCheckbox implements ComponentInterface {
  /** Value of checkbox. */
  @Prop() public value?: string;

  /** Whether the checkbox is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** Whether the checkbox is required. */
  @Prop() public required = false;

  /** Whether the checkbox is indeterminate. */
  @Prop({ reflect: true, mutable: true }) public indeterminate = false;

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from here https://lyne.sbb.ch/tokens/icons (optional).
   */
  @Prop() public iconName?: string;

  /** The label position relative to the labelIcon. Defaults to end */
  @Prop({ reflect: true }) public iconPlacement: InterfaceSbbCheckboxAttributes['iconPlacement'] =
    'end';

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /** Label size variant, either m or s. */
  @Prop({ reflect: true }) public size: InterfaceSbbCheckboxAttributes['size'] = 'm';

  /** Whether the component must be set disabled due disabled attribute on sbb-checkbox-group. */
  @State() private _disabledFromGroup = false;

  /** Whether the component must be set required due required attribute on sbb-checkbox-group. */
  @State() private _requiredFromGroup = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon', 'subtext', 'suffix');

  @State() private _currentLanguage = documentLanguage();

  /** Whether the input is the main input of a selection panel. */
  @State() private _isSelectionPanelInput = false;

  /** The label describing whether the selection panel is exapanded (for screen readers only). */
  @State() private _selectionPanelExpandedLabel: string;

  private _checkbox: HTMLInputElement;
  private _selectionPanelElement: HTMLElement;

  /** MutationObserver on data attributes. */
  private _checkboxAttributeObserver = new MutationObserver(
    this._onCheckboxAttributesChange.bind(this)
  );

  @Element() private _element!: HTMLElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  /**
   * @internal
   * Internal event that emits whenever the state of the checkbox
   * in relation to the parent selection panel changes.
   */
  @Event({
    bubbles: true,
    eventName: 'state-change',
  })
  public stateChange: EventEmitter<CheckboxStateChange>;

  @Watch('checked')
  public handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (this._isSelectionPanelInput && currentValue !== previousValue) {
      this.stateChange.emit({ type: 'checked', checked: currentValue });
      !!this._selectionPanelElement && this._updateExpandedLabel();
    }
  }

  @Watch('disabled')
  public handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (this._isSelectionPanelInput && currentValue !== previousValue) {
      this.stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  // Set up the initial disabled/required values and start observe attributes changes.
  private _setupInitialStateAndAttributeObserver(): void {
    this._disabledFromGroup = !!this._element.dataset.groupDisabled;
    this._requiredFromGroup = !!this._element.dataset.groupRequired;
    this._checkboxAttributeObserver.observe(this._element, checkboxObserverConfig);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onCheckboxAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = !!isValidAttribute(this._element, 'data-group-disabled');
      }
      if (mutation.attributeName === 'data-group-required') {
        this._requiredFromGroup = !!isValidAttribute(this._element, 'data-group-required');
      }
    }
  }

  public connectedCallback(): void {
    // We can use closest here, as we expect the parent sbb-selection-panel to be in light DOM.
    this._selectionPanelElement = this._element.closest('sbb-selection-panel');
    this._isSelectionPanelInput =
      !!this._selectionPanelElement &&
      !this._element.closest('sbb-selection-panel [slot="content"]');
    this._handlerRepository.connect();
    this._setupInitialStateAndAttributeObserver();
  }

  public componentDidLoad(): void {
    !!this._selectionPanelElement && this._updateExpandedLabel();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._checkboxAttributeObserver.disconnect();
  }

  @Listen('click')
  public handleClick(event: Event): void {
    if (!this.disabled && !this._disabledFromGroup && getEventTarget(event) === this._element) {
      this._checkbox.click();
    }
  }

  @Listen('keyup')
  public handleKeyup(event: KeyboardEvent): void {
    // The native checkbox input toggles state on keyup with space.
    if (!this.disabled && !this._disabledFromGroup && event.key === ' ') {
      // The toggle needs to happen after the keyup event finishes, so we schedule
      // it to be triggered after the current event loop.
      setTimeout(() => this._checkbox.click());
    }
  }

  public handleChangeEvent(event: Event): void {
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  /**
   * Method triggered on checkbox input event.
   * If not indeterminate, inverts the value; otherwise sets checked to true.
   */
  public handleInputEvent(): void {
    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
    } else {
      this.checked = this._checkbox?.checked ?? false;
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
      role: 'checkbox',
      'aria-checked': this.indeterminate ? 'mixed' : this.checked?.toString() ?? 'false',
      'aria-required': (this.required || this._requiredFromGroup).toString(),
      'aria-disabled': (this.disabled || this._disabledFromGroup).toString(),
      'data-is-selection-panel-input': this._isSelectionPanelInput,
      ...(this.disabled || this._disabledFromGroup ? undefined : { tabIndex: '0' }),
    };
    return (
      <Host {...attributes}>
        <span class="sbb-checkbox-wrapper">
          <label class="sbb-checkbox">
            <input
              ref={(checkbox: HTMLInputElement) => {
                this._checkbox = checkbox;
                // Forward indeterminate state to native input. As it is only a property, we have to set it programmatically.
                this._checkbox.indeterminate = this.indeterminate;
              }}
              type="checkbox"
              aria-hidden="true"
              tabIndex={-1}
              disabled={this.disabled || this._disabledFromGroup}
              required={this.required || this._requiredFromGroup}
              checked={this.checked}
              value={this.value}
              onInput={() => this.handleInputEvent()}
              onChange={(event) => this.handleChangeEvent(event)}
              // Fix focus when using NVDA
              onFocus={() => this._element.focus()}
            />
            <span class="sbb-checkbox__inner">
              <span class="sbb-checkbox__aligner">
                <sbb-visual-checkbox
                  checked={this.checked}
                  indeterminate={this.indeterminate}
                  disabled={this.disabled || this._disabledFromGroup}
                ></sbb-visual-checkbox>
              </span>
              <span class="sbb-checkbox__label">
                <slot />
                {(this.iconName || (this._namedSlots['icon'] && !this._isSelectionPanelInput)) && (
                  <span class="sbb-checkbox__label--icon">
                    <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
                  </span>
                )}
                {!!this._selectionPanelElement && this._namedSlots['suffix'] && (
                  <slot name="suffix" />
                )}
              </span>
            </span>
            {!!this._selectionPanelElement && this._namedSlots['subtext'] && (
              <slot name="subtext" />
            )}
            {!!this._selectionPanelElement && this._selectionPanelExpandedLabel && (
              /* For screen readers only */
              <span class="sbb-checkbox__expanded-label">{this._selectionPanelExpandedLabel}</span>
            )}
          </label>
        </span>
      </Host>
    );
  }
}
