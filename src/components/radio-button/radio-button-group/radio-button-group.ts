import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { isArrowKeyPressed, getNextElementIndex, interactivityChecker } from '../../core/a11y';
import { toggleDatasetEntry, setAttribute } from '../../core/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  EventEmitter,
  ConnectedAbortController,
} from '../../core/eventing';
import { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces';
import type {
  SbbRadioButton,
  SbbRadioButtonSize,
  SbbRadioButtonStateChange,
} from '../radio-button';

import style from './radio-button-group.scss?lit&inline';

export type SbbRadioButtonGroupEventDetail = { value: any | null; radioButton: SbbRadioButton };

/**
 * It can be used as a container for one or more `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-radio-button` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} didChange - Deprecated. Only used for React. Will probably be removed once React 19 is available. Emits whenever the `sbb-radio-group` value changes.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} change - Emits whenever the `sbb-radio-group` value changes.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} input - Emits whenever the `sbb-radio-group` value changes.
 */
@customElement('sbb-radio-button-group')
export class SbbRadioButtonGroup extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Whether the radios can be deselected.
   */
  @property({ attribute: 'allow-empty-selection', type: Boolean })
  public set allowEmptySelection(value: boolean) {
    this._allowEmptySelection = value;
    this._updateAllowEmptySelection();
  }
  public get allowEmptySelection(): boolean {
    return this._allowEmptySelection;
  }
  private _allowEmptySelection: boolean = false;

  /**
   * Whether the radio group is disabled.
   */
  @property({ type: Boolean })
  public set disabled(value: boolean) {
    this._disabled = value;
    this._updateDisabled();
  }
  public get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean = false;

  /**
   * Whether the radio group is required.
   */
  @property({ type: Boolean })
  public set required(value: boolean) {
    this._required = value;
    this._updateRequired();
  }
  public get required(): boolean {
    return this._required;
  }
  private _required: boolean = false;

  /**
   * The value of the radio group.
   */
  @property() public value?: any | null;

  /**
   * Size variant, either m or s.
   */
  @property()
  public set size(value: SbbRadioButtonSize) {
    this._size = value;
    this._updateSize();
  }
  public get size(): SbbRadioButtonSize {
    return this._size;
  }
  private _size: SbbRadioButtonSize = 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @state() private _namedSlots = createNamedSlotState('error');

  private _hasSelectionPanel: boolean;
  private _didLoad = false;
  private _abort = new ConnectedAbortController(this);

  private _valueChanged(value: any | undefined): void {
    for (const radio of this._radioButtons) {
      radio.checked = radio.value === value;
      radio.tabIndex = this._getRadioTabIndex(radio);
    }
    this._setFocusableRadio();
  }

  private _updateDisabled(): void {
    for (const radio of this._radioButtons) {
      toggleDatasetEntry(radio, 'groupDisabled', this.disabled);
      radio.tabIndex = this._getRadioTabIndex(radio);
    }
    this._setFocusableRadio();
  }

  private _updateRequired(): void {
    for (const radio of this._radioButtons) {
      toggleDatasetEntry(radio, 'groupRequired', this.required);
    }
  }

  private _updateSize(): void {
    for (const radio of this._radioButtons) {
      radio.size = this.size;
    }
  }

  private _updateAllowEmptySelection(): void {
    for (const radio of this._radioButtons) {
      radio.allowEmptySelection = this.allowEmptySelection;
    }
  }

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroup.events.didChange,
  );

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   */
  private _change: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroup.events.change,
  );

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   */
  private _input: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroup.events.input,
  );

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener(
      'stateChange',
      (e: CustomEvent<SbbRadioButtonStateChange>) => this._onRadioButtonSelect(e),
      {
        signal,
        passive: true,
      },
    );
    this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
    this._hasSelectionPanel = !!this.querySelector?.('sbb-selection-panel');
    toggleDatasetEntry(this, 'hasSelectionPanel', this._hasSelectionPanel);
    this._handlerRepository.connect();
    this._updateRadios(this.value);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value')) {
      this._valueChanged(this.value);
    }
  }

  protected override firstUpdated(): void {
    this._didLoad = true;
    this._updateRadios(this.value);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _onRadioButtonSelect(event: CustomEvent<SbbRadioButtonStateChange>): void {
    event.stopPropagation();
    if (event.detail.type !== 'checked' || !this._didLoad) {
      return;
    }

    const radioButton = event.target as SbbRadioButton;

    if (event.detail.checked) {
      this.value = radioButton.value;
      this._emitChange(radioButton, this.value);
    } else if (this.allowEmptySelection) {
      this.value = this._radioButtons.find((radio) => radio.checked)?.value;
      if (!this.value) {
        this._emitChange(radioButton);
      }
    }
  }

  private _emitChange(radioButton: SbbRadioButton, value?: string): void {
    this._change.emit({ value, radioButton });
    this._input.emit({ value, radioButton });
    this._didChange.emit({ value, radioButton });
  }

  private _updateRadios(initValue?: string): void {
    if (!this._didLoad) {
      return;
    }

    const radioButtons = this._radioButtons;

    this.value = initValue ?? radioButtons.find((radio) => radio.checked)?.value;

    for (const radio of radioButtons) {
      radio.checked = radio.value === this.value;
      radio.size = this.size;
      radio.allowEmptySelection = this.allowEmptySelection;

      toggleDatasetEntry(radio, 'groupDisabled', this.disabled);
      toggleDatasetEntry(radio, 'groupRequired', this.required);

      radio.tabIndex = this._getRadioTabIndex(radio);
    }

    this._setFocusableRadio();
  }

  private get _radioButtons(): SbbRadioButton[] {
    return (
      Array.from(this.querySelectorAll?.('sbb-radio-button') ?? []) as SbbRadioButton[]
    ).filter((el) => el.closest?.('sbb-radio-button-group') === this);
  }

  private get _enabledRadios(): SbbRadioButton[] | undefined {
    if (!this.disabled) {
      return this._radioButtons.filter((r) => !r.disabled && interactivityChecker.isVisible(r));
    }
  }

  private _setFocusableRadio(): void {
    const checked = this._radioButtons.find((radio) => radio.checked && !radio.disabled);

    const enabledRadios = this._enabledRadios;
    if (!checked && enabledRadios?.length) {
      enabledRadios[0].tabIndex = 0;
    }
  }

  private _getRadioTabIndex(radio: SbbRadioButton): number {
    return (radio.checked || this._hasSelectionPanel) && !radio.disabled && !this.disabled ? 0 : -1;
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledRadios: SbbRadioButton[] = this._enabledRadios;

    if (
      !enabledRadios ||
      !enabledRadios.length ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement.nodeName !== 'SBB-SELECTION-PANEL')
    ) {
      return;
    }

    if (!isArrowKeyPressed(evt)) {
      return;
    }

    let current: number;
    let nextIndex: number;

    if (this._hasSelectionPanel) {
      current = enabledRadios.findIndex((e: SbbRadioButton) => e === evt.target);
      nextIndex = getNextElementIndex(evt, current, enabledRadios.length);
    } else {
      const checked: number = enabledRadios.findIndex((radio: SbbRadioButton) => radio.checked);
      nextIndex = getNextElementIndex(evt, checked, enabledRadios.length);
      enabledRadios[nextIndex].select();
    }

    enabledRadios[nextIndex].focus();
    evt.preventDefault();
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'role', 'radiogroup');

    return html`
      <div class="sbb-radio-group">
        <slot @slotchange=${() => this._updateRadios()}></slot>
      </div>
      ${this._namedSlots.error
        ? html`<div class="sbb-radio-group__error">
            <slot name="error"></slot>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-group': SbbRadioButtonGroup;
  }
}
