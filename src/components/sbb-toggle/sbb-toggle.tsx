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
    for (const toggleOption of this._options) {
      toggleOption.checked = toggleOption.value === value;
      toggleOption.tabIndex = this._getOptionTabIndex(toggleOption);
    }
    this._setCheckedPillPosition(false);
    this.change.emit({ value });
    this.didChange.emit({ value });
  }

  @Watch('disabled')
  public updateDisabled(): void {
    for (const toggleOption of this._options) {
      toggleOption.disabled = this.disabled;
      toggleOption.tabIndex = this._getOptionTabIndex(toggleOption);
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
      this._element.querySelectorAll('sbb-toggle-option')
    ) as HTMLSbbToggleOptionElement[];
  }

  private get _checked(): HTMLSbbToggleOptionElement {
    return this._options.find((toggle) => toggle.checked) ?? this._options[0];
  }

  @Listen('did-select', { passive: true })
  public onToggleOptionSelect(event: CustomEvent): void {
    this.value = event.detail;
  }

  private _setCheckedPillPosition(resizing: boolean): void {
    const options = this._options;
    const checked = this._checked;

    if (!checked) {
      return;
    }

    toggleDatasetEntry(this._element, 'disableAnimationOnResizing', resizing);

    const checkedIndex = options.findIndex((option) => option === checked);
    const pillLeft = checkedIndex === 0 ? '0px' : `${options[0].clientWidth}px`;
    const pillRigth =
      checkedIndex === 0 ? `${this._toggleElement.clientWidth - options[0].clientWidth}px` : '0px';

    this._element.style.setProperty('--sbb-toggle-option-left', pillLeft);
    this._element.style.setProperty('--sbb-toggle-option-right', pillRigth);
  }

  public connectedCallback(): void {
    this._toggleResizeObserver.observe(this._element.querySelector('sbb-toggle-option'));
  }

  public disconnectedCallback(): void {
    this._toggleResizeObserver.disconnect();
  }

  private _updateToggle(): void {
    const options = this._options;
    const value = this.value ?? this._checked?.value;

    for (const toggleOption of options) {
      toggleOption.checked = toggleOption.value === value;
      toggleOption.disabled = toggleOption.disabled ? toggleOption.disabled : this.disabled;
      toggleOption.tabIndex = this._getOptionTabIndex(toggleOption);
    }
  }

  private _getOptionTabIndex(option: HTMLSbbToggleOptionElement): number {
    return option.checked && !this.disabled ? 0 : -1;
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
        (toggleOption: HTMLSbbToggleOptionElement) => toggleOption.checked
      );
      const current: number = checked !== -1 ? checked : 0;
      const nextIndex: number = getNextElementIndex(evt, current, enabledToggleOptions.length);
      enabledToggleOptions[nextIndex].select();
      enabledToggleOptions[nextIndex].focus();
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
