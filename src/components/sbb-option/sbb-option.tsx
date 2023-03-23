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
import { assignId } from '../../global/helpers/assign-id';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { SbbOptionSelectionChange, SbbOptionVariant } from './sbb-option.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';

let nextId = 0;

/** Configuration for the attribute to look at if component is nested in a sbb-checkbox-group */
const optionObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled'],
};

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

  /** Whether the option is currently active. */
  @Prop({ reflect: true }) public active?: boolean;

  /** Whether the option is selected. */
  @Prop({ mutable: true, reflect: true }) public selected = false;

  /** Whether the component must be set disabled due disabled attribute on sbb-checkbox-group. */
  @State() private _disabledFromGroup = false;

  /** Whether the option is disabled. TBI: missing disabled style, will be implemented with the select component. */
  @Prop() public disabled?: boolean;

  /** Emits when the option selection status changes. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'option-selection-change',
  })
  public selectionChange: EventEmitter<SbbOptionSelectionChange>;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _label: string;

  /** The portion of the highlighted label. */
  @State() private _highlightString: string;

  /** Disable the highlight of the label. */
  @State() private _disableLabelHighlight: boolean;

  @Element() private _element: HTMLElement;

  private _optionId = `sbb-option-${++nextId}`;
  private _labelSlot: HTMLSlotElement;
  private _variant: SbbOptionVariant;

  /** MutationObserver on data attributes. */
  private _optionAttributeObserver = new MutationObserver(
    this._onOptionAttributesChange.bind(this)
  );

  /**
   * Highlight the label of the option
   * @param value the highlighted portion of the label
   */
  @Method()
  public async highlight(value: string): Promise<void> {
    this._highlightString = value;
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('click', { passive: true })
  public selectByClick(): void {
    if (this.disabled || this._disabledFromGroup) {
      return;
    }

    this.selected = !this.selected;
  }

  @Watch('selected')
  public handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.selectionChange.emit({
        id: this._element.id,
        value: this.value,
        selected: this.selected,
      });
    }
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._disabledFromGroup = !!this._element.dataset.groupDisabled;
    this._optionAttributeObserver.observe(this._element, optionObserverConfig);
    this._setVariantByContext();
  }

  public componentDidLoad(): void {
    if (!this._disableLabelHighlight) {
      this._setupHighlightHandler();
    }
  }

  private _setVariantByContext(): void {
    if (this._element.closest('sbb-autocomplete')) {
      this._variant = 'autocomplete';
    } else if (this._element.closest('sbb-select')) {
      this._variant = 'select';
    } else {
      throw new Error('sbb-option component is not used within sbb-select or sbb-autocomplete');
    }
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onOptionAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = !!isValidAttribute(this._element, 'data-group-disabled');
      }
    }
  }

  private _setupHighlightHandler(): void {
    const slotNodes = this._labelSlot.assignedNodes();
    const labelNode = slotNodes.filter((el) => el.nodeType === Node.TEXT_NODE)[0] as Text;

    // Disable the highlight if the slot does not contain just a text node
    if (!labelNode || slotNodes.length !== 1) {
      this._disableLabelHighlight = true;
      return;
    }
    this._label = labelNode.wholeText;
  }

  private _getHighlightedLabel(): JSX.Element {
    if (!this._highlightString || !this._highlightString.trim()) {
      return this._label;
    }

    const matchIndex = this._label.toLowerCase().indexOf(this._highlightString.toLowerCase());

    if (matchIndex === -1) {
      return this._label;
    }

    const prefix = this._label.substring(0, matchIndex);
    const highlighted = this._label.substring(
      matchIndex,
      matchIndex + this._highlightString.length
    );
    const postfix = this._label.substring(matchIndex + this._highlightString.length);

    return [
      <span class="sbb-option__label--highlight">{prefix}</span>,
      <span>{highlighted}</span>,
      <span class="sbb-option__label--highlight">{postfix}</span>,
    ];
  }

  private _renderAutocompleteOption(): JSX.Element {
    return (
      <div class="sbb-option">
        <span
          class={{
            'sbb-option__icon': true,
            'sbb-option__icon--empty': !this._namedSlots.icon && !this.iconName,
          }}
        >
          <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        </span>
        <span class="sbb-option__label">
          <slot ref={(slot) => (this._labelSlot = slot as HTMLSlotElement)} />
          {this._label && !this._disableLabelHighlight && this._getHighlightedLabel()}
        </span>
      </div>
    );
  }

  private _renderSelectOption(): JSX.Element {
    return null;
  }

  public render(): JSX.Element {
    return (
      <Host
        role="option"
        data-variant={this._variant}
        /* eslint-disable jsx-a11y/aria-proptypes */
        aria-selected={`${this.selected}`}
        aria-disabled={`${this.disabled || this._disabledFromGroup}`}
        /* eslint-enable jsx-a11y/aria-proptypes */
        data-disable-highlight={this._disableLabelHighlight}
        ref={assignId(() => this._optionId)}
      >
        {this._variant && this._variant === 'select'
          ? this._renderSelectOption()
          : this._renderAutocompleteOption()}
      </Host>
    );
  }
}
