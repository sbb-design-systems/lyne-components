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
} from '@stencil/core';
import { assignId } from '../../global/helpers/assign-id';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { SbbOptionSelectionChange } from '../sbb-autocomplete/sbb-autocomplete.custom';

let nextId = 0;

/**
 * @slot unnamed - Use this to provide the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-option.scss',
  tag: 'sbb-option',
})
export class SbbOption implements ComponentInterface {
  /** Value of the option. */
  @Prop() public value?: string;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;

  /** Whether the icon space is preserved when no icon is set. */
  @Prop({ reflect: true }) public preserveIconSpace = true;

  /** Whether the option is currently active. */
  @Prop() public active?: boolean;

  /** Whether the option is disabled. TBI: missing disabled style, will be implemented with the select component. */
  @Prop() public disabled?: boolean;

  /** The portion of the highlighted label. */
  @Prop() public highlightString: string;

  /** Disable the highlight of the label. */
  @Prop({ reflect: true }) public disableLabelHighlight: boolean;

  /** Emits whenever the menu is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'option-did-select',
  })
  public didSelect: EventEmitter<SbbOptionSelectionChange>;

  /** Emits whenever the menu is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'option-did-deselect',
  })
  public didDeselect: EventEmitter<SbbOptionSelectionChange>;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  /** Whether the option is currently selected. */
  @State() private _selected: boolean;

  @State() private _label: string;

  @Element() private _element: HTMLElement;

  private _optionId = `sbb-option-${++nextId}`;
  private _labelSlot: HTMLSlotElement;

  @Method()
  public async select(): Promise<void> {
    if (this.disabled || this._selected) {
      return;
    }

    this._selected = true;
    this.didSelect.emit({ id: this._element.id, value: this.value });
  }

  @Method()
  public async deselect(): Promise<void> {
    if (this.disabled || !this._selected) {
      return;
    }

    this._selected = false;
    this.didDeselect.emit({ id: this._element.id, value: this.value });
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('click', { passive: true })
  public selectByClick(): void {
    if (this.disabled) {
      return;
    }

    this.select();
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  public componentDidLoad(): void {
    if (!this.disableLabelHighlight) {
      this._setupHighlightHandler();
    }
  }

  private _setupHighlightHandler(): void {
    const labelNode = this._labelSlot
      .assignedNodes()
      .filter((el) => el.nodeType === Node.TEXT_NODE)[0] as Text;

    if (!labelNode) {
      this.disableLabelHighlight = true;
      return;
    }
    this._label = labelNode.wholeText;
  }

  private _getHighlightedLabel(): JSX.Element {
    if (!this.highlightString || !this.highlightString.trim()) {
      return this._label;
    }

    const matchIndex = this._label.toLowerCase().indexOf(this.highlightString.toLowerCase());

    if (matchIndex === -1) {
      return this._label;
    }

    const prefix = this._label.substring(0, matchIndex);
    const highlighted = this._label.substring(matchIndex, matchIndex + this.highlightString.length);
    const postfix = this._label.substring(matchIndex + this.highlightString.length);

    return [
      <span class="sbb-option__label--highlight">{prefix}</span>,
      <span>{highlighted}</span>,
      <span class="sbb-option__label--highlight">{postfix}</span>,
    ];
  }

  public render(): JSX.Element {
    return (
      <Host
        role="option"
        tabindex="0"
        data-active={this.active}
        aria-disabled={this.disabled}
        aria-selected={this._selected}
        ref={assignId(() => this._optionId)}
      >
        <div class="sbb-option">
          <span
            class={{
              'sbb-option__icon': true,
              'sbb-option__icon--hidden':
                !this.preserveIconSpace && !this._namedSlots.icon && !this.iconName,
            }}
          >
            <slot name="icon">
              {this.iconName && <sbb-icon slot="icon" name={this.iconName} />}
            </slot>
          </span>
          <span class="sbb-option__label">
            <slot ref={(slot) => (this._labelSlot = slot as HTMLSlotElement)} />
            {this._label && !this.disableLabelHighlight && this._getHighlightedLabel()}
          </span>
        </div>
      </Host>
    );
  }
}
