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
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { SbbOptionEventData, SbbOptionVariant } from './sbb-option.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import { isAndroid, isSafari } from '../../global/helpers/platform';
import { hostContext } from '../../global/helpers/host-context';

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
  public selectionChange: EventEmitter<SbbOptionEventData>;

  /** Emits when the option is clicked. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'option-click',
  })
  public optionClick: EventEmitter<SbbOptionEventData>;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _label: string;

  /** The portion of the highlighted label. */
  @State() private _highlightString: string;

  /** Disable the highlight of the label. */
  @State() private _disableLabelHighlight: boolean;

  @State() private _groupLabel: string;

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  private _optionId = `sbb-option-${++nextId}`;
  private _variant: SbbOptionVariant;
  private _inertAriaGroups = isSafari();

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

  /**
   * Set the option group label (used for a11y)
   * @param value the label of the option group
   */
  @Method()
  public async setGroupLabel(value: string): Promise<void> {
    this._groupLabel = value;
  }

  @Listen('click', { passive: true })
  public selectByClick(event): void {
    if (this.disabled || this._disabledFromGroup) {
      return;
    }
    if (this._isMultipleSelect()) {
      event.stopPropagation();
      this.selected = !this.selected;
    } else {
      this.selected = true;
    }

    this.optionClick.emit({
      id: this._element.id,
      value: this.value,
      selected: this.selected,
    });
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
    this._handlerRepository.connect();
    this._disabledFromGroup = !!this._element.dataset.groupDisabled;
    this._optionAttributeObserver.observe(this._element, optionObserverConfig);
    this._setVariantByContext();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _setVariantByContext(): void {
    if (this._element.closest('sbb-autocomplete')) {
      this._variant = 'autocomplete';
    } else if (this._element.closest('sbb-select')) {
      this._variant = 'select';
      this._disableLabelHighlight = true;
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

  private _isMultipleSelect(): boolean {
    return (
      this._variant === 'select' &&
      hostContext('sbb-select', this._element)?.hasAttribute('multiple')
    );
  }

  private _setupHighlightHandler(event): void {
    const slotNodes = (event.target as HTMLSlotElement).assignedNodes();
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
          <slot onSlotchange={(event) => this._setupHighlightHandler(event)} />
          {this._label && !this._disableLabelHighlight && this._getHighlightedLabel()}

          {this._inertAriaGroups && this._groupLabel && (
            <span class="sbb-option__group-label--visually-hidden"> ({this._groupLabel})</span>
          )}
        </span>
      </div>
    );
  }

  private _renderSelectOption(): JSX.Element {
    const isMultiple = this._isMultipleSelect();
    return (
      <div data-multiple={isMultiple} class="sbb-option">
        {isMultiple && (
          <sbb-visual-checkbox
            checked={this.selected}
            disabled={this.disabled || this._disabledFromGroup}
          ></sbb-visual-checkbox>
        )}
        <span class="sbb-option__label">
          <slot />
        </span>
        {!isMultiple && this.selected && <sbb-icon name="tick-small" />}
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <Host
        role="option"
        tabindex={isAndroid() && !this.disabled && 0}
        data-variant={this._variant}
        data-disable-highlight={this._disableLabelHighlight}
        ref={assignId(() => this._optionId)}
        /* eslint-disable jsx-a11y/aria-proptypes */
        aria-selected={`${this.selected}`}
        aria-disabled={`${this.disabled || this._disabledFromGroup}`}
        /* eslint-enable jsx-a11y/aria-proptypes */
      >
        <div class="sbb-option__container">
          {this._variant && this._variant === 'select'
            ? this._renderSelectOption()
            : this._renderAutocompleteOption()}
        </div>
      </Host>
    );
  }
}
