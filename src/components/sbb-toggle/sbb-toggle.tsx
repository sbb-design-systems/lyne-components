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
  Prop,
  Watch,
} from '@stencil/core';
import { InterfaceSbbToggleAttributes } from './sbb-toggle.custom';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';
import { getNextElementIndex, isArrowKeyPressed } from '../../global/helpers/arrow-navigation';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { ToggleOptionStateChange } from '../sbb-toggle-option/sbb-toggle-option.custom';

/**
 * @slot unnamed - Slot used to render the `<sbb-toggle-option>`.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle.scss',
  tag: 'sbb-toggle',
})
export class SbbToggle implements ComponentInterface {
  /**
   * Whether the toggle is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * If true set the width of the component fixed; if false the width is dynamic based on the label of the sbb-toggle-option.
   */
  @Prop({ reflect: true }) public even: boolean;

  /**
   * Size variant, either m or s.
   */
  @Prop({ reflect: true }) public size?: InterfaceSbbToggleAttributes['size'] = 'm';

  /**
   * The value of the toggle. It needs to be mutable since it is updated whenever
   * a new option is selected (see the `onToggleOptionSelect()` method).
   */
  @Prop({ mutable: true }) public value: any | null;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  @Element() private _element: HTMLElement;

  private _toggleElement: HTMLElement;
  private _toggleResizeObserver = new ResizeObserver(() => this._setCheckedPillPosition(true));

  @Watch('value')
  public valueChanged(value: any | undefined): void {
    const selectedOption = this._options.find((o) => o.value === value) ?? this._options[0];
    if (!selectedOption) {
      console.warn(`sbb-toggle: No available options! (${this._element.id || 'No id'})`);
      return;
    }
    if (!selectedOption.checked) {
      selectedOption.checked = true;
    }
    this._options
      .filter((o) => o !== selectedOption && o.checked)
      .forEach((o) => (o.checked = false));
    this._setCheckedPillPosition(false);
  }

  @Watch('disabled')
  public updateDisabled(): void {
    for (const toggleOption of this._options) {
      toggleOption.disabled = this.disabled;
    }
  }

  /**
   * Emits whenever the radio group value changes.
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public didChange: EventEmitter;

  /**
   * Emits whenever the radio group value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public change: EventEmitter;

  private get _options(): HTMLSbbToggleOptionElement[] {
    return Array.from(
      this._element.querySelectorAll('sbb-toggle-option'),
    ) as HTMLSbbToggleOptionElement[];
  }

  @Listen('input', { passive: true })
  public handleInput(): void {
    this._emitChange();
  }

  @Listen('state-change', { passive: true })
  public handleStateChange(event: CustomEvent<ToggleOptionStateChange>): void {
    const target: HTMLSbbToggleOptionElement = event.target as HTMLSbbToggleOptionElement;
    event.stopPropagation();
    if (event.detail.type === 'value') {
      this.value = event.detail.value;
      // We emit in this case, as when the value of an option changes
      // also the value of the toggle itself changes.
      // This is an exception, as we don't normally emit on programmatic changes.
      this._emitChange();
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    if (event.detail.checked) {
      this.value = target.value;
    } else if (this._options.every((o) => !o.checked)) {
      // If no option is currently checked, we select the first option, as per requirement
      // there must always be a checked option. We also need to emit in order for listeners
      // to register the change.
      this.value = this._options[0].value;
      this._emitChange();
    }
  }

  private _setCheckedPillPosition(resizing: boolean): void {
    const options = this._options;

    if (options.every((o) => !o.checked) || !this._toggleElement) {
      return;
    }

    toggleDatasetEntry(this._element, 'disableAnimationOnResizing', resizing);

    const firstOption = options[0];
    const isFirstChecked = firstOption.checked;
    const pillLeft = firstOption.checked ? '0px' : `${firstOption.clientWidth}px`;
    const pillRight = isFirstChecked
      ? `${this._toggleElement.clientWidth - firstOption.clientWidth}px`
      : '0px';

    this._element.style.setProperty('--sbb-toggle-option-left', pillLeft);
    this._element.style.setProperty('--sbb-toggle-option-right', pillRight);
  }

  public connectedCallback(): void {
    this._options.forEach((option) => this._toggleResizeObserver.observe(option));
    this._updateToggle();
  }

  public disconnectedCallback(): void {
    this._toggleResizeObserver.disconnect();
  }

  private _updateToggle(): void {
    this.valueChanged(this.value);
    this.updateDisabled();
  }

  private _emitChange(): void {
    this.change.emit();
    this.didChange.emit();
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledToggleOptions = this._options?.filter((t) => !t.disabled);

    if (
      !enabledToggleOptions ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this._element &&
        (evt.target as HTMLElement).parentElement !== this._element)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const checked: number = enabledToggleOptions.findIndex(
        (toggleOption: HTMLSbbToggleOptionElement) => toggleOption.checked,
      );
      const nextIndex: number = getNextElementIndex(evt, checked, enabledToggleOptions.length);
      if (!enabledToggleOptions[nextIndex].checked) {
        enabledToggleOptions[nextIndex].checked = true;
        enabledToggleOptions[nextIndex].focus();
        enabledToggleOptions[nextIndex].dispatchEvent(
          new InputEvent('input', { bubbles: true, composed: true }),
        );
      }
      evt.preventDefault();
    }
  }

  public render(): JSX.Element {
    return (
      <Host role="radiogroup">
        <div class="sbb-toggle" ref={(toggle) => (this._toggleElement = toggle)}>
          <slot onSlotchange={() => this._updateToggle()} />
        </div>
      </Host>
    );
  }
}
