import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { InterfaceSbbCheckboxGroupAttributes } from './sbb-checkbox-group.custom';
import { isArrowKeyPressed, getNextElementIndex } from '../../global/a11y';
import { toggleDatasetEntry, isValidAttribute } from '../../global/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';

/**
 * @slot unnamed - Slot used to render the <sbb-checkbox> inside the <sbb-checkbox-group>.
 * @slot error - Slot used to render the <sbb-form-error> inside the <sbb-checkbox-group>.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox-group.scss',
  tag: 'sbb-checkbox-group',
})
export class SbbCheckboxGroup implements ComponentInterface {
  /**
   * Whether the checkbox group is disabled.
   */
  @Prop() public disabled = false;

  /**
   * Whether the checkbox group is required.
   */
  @Prop() public required = false;

  /**
   * Size variant, either m or s.
   */
  @Prop() public size: InterfaceSbbCheckboxGroupAttributes['size'] = 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Prop({ reflect: true })
  public horizontalFrom?: InterfaceSbbCheckboxGroupAttributes['horizontalFrom'];

  /**
   * Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`.
   */
  @Prop({ reflect: true }) public orientation: InterfaceSbbCheckboxGroupAttributes['orientation'] =
    'horizontal';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  @Watch('disabled')
  public updateDisabled(): void {
    for (const checkbox of this._checkboxes) {
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
    }
  }

  @Watch('required')
  public updateRequired(): void {
    for (const checkbox of this._checkboxes) {
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  @Watch('size')
  public updateSize(): void {
    for (const checkbox of this._checkboxes) {
      checkbox.size = this.size;
    }
  }

  public connectedCallback(): void {
    toggleDatasetEntry(
      this._element,
      'hasSelectionPanel',
      !!this._element.querySelector('sbb-selection-panel'),
    );
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: HTMLSbbCheckboxElement[] = this._checkboxes.filter(
      (tag: HTMLSbbCheckboxElement) => !isValidAttribute(tag, 'disabled'),
    );

    if (
      !enabledCheckboxes ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this._element &&
        (evt.target as HTMLElement).parentElement !== this._element &&
        (evt.target as HTMLElement).parentElement.nodeName !== 'SBB-SELECTION-PANEL')
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledCheckboxes.findIndex(
        (e: HTMLSbbCheckboxElement) => e === evt.target,
      );
      const nextIndex: number = getNextElementIndex(evt, current, enabledCheckboxes.length);
      enabledCheckboxes[nextIndex]?.focus();
    }
  }

  private _updateCheckboxes(): void {
    const checkboxes = this._checkboxes;

    for (const checkbox of checkboxes) {
      checkbox.size = this.size;
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  private get _checkboxes(): HTMLSbbCheckboxElement[] {
    return (
      Array.from(this._element.querySelectorAll('sbb-checkbox')) as HTMLSbbCheckboxElement[]
    ).filter((el) => el.closest('sbb-checkbox-group') === this._element);
  }

  public render(): JSX.Element {
    return (
      <Host>
        <div class="sbb-checkbox-group">
          <slot onSlotchange={() => this._updateCheckboxes()} />
        </div>
        {this._namedSlots.error && (
          <div class="sbb-checkbox-group__error">
            <slot name="error" />
          </div>
        )}
      </Host>
    );
  }
}
