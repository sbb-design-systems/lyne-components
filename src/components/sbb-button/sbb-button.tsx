import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceButtonAttributes } from './sbb-button.custom';
import {
  getButtonAttributeList,
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkButtonProperties,
} from '../../global/interfaces/link-button-properties';
import { ACTION_ELEMENTS, hostContext } from '../../global/helpers/host-context';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';

@Component({
  shadow: true,
  styleUrl: 'sbb-button.scss',
  tag: 'sbb-button',
})
export class SbbButton implements LinkButtonProperties, ComponentInterface {
  /** Variant of the button, like primary, secondary etc. */
  @Prop({ reflect: true }) public variant?: InterfaceButtonAttributes['variant'] = 'primary';

  /** Size variant, either l or m. */
  @Prop({ reflect: true }) public size?: InterfaceButtonAttributes['size'] = 'l';

  /** The href value you want to link to */
  @Prop({ reflect: true }) public href: string | undefined;

  /**
   * Set this property to true if you want only a visual representation of a
   * button, but no interaction (a span instead of a button will be rendered).
   */
  @Prop({ attribute: 'static', mutable: true, reflect: true }) public isStatic = false;

  /** Set to true to get a disabled button */
  @Prop({ reflect: true }) public disabled? = false;

  /**
   * The icon name we want to use,
   * choose from the small icon variants from
   * the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/ (optional).
   * Inline variant doesn't support icons.
   */
  @Prop() public iconName?: string;

  /** The type attribute to use for the button */
  @Prop() public type: InterfaceButtonAttributes['buttonType'] | undefined;

  /** The name attribute to use for the button */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button */
  @Prop() public value?: string;

  /**
   * Negative coloring variant flag
   */
  @Prop({ reflect: true }) public negative: boolean;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * When an interaction of this button has an impact on another element(s) in the document, the id
   * of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute
   * to the relevant nested element.
   */
  @Prop() public accessibilityControls: string | undefined;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHasPopup: InterfaceButtonAttributes['popup'] | undefined;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _hasText = false;

  @Element() private _element!: HTMLElement;

  /**
   * Emits whenever the native button click event triggers.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-button_click',
  })
  public click: EventEmitter;

  public connectedCallback(): void {
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this._element);
    this._hasText = Array.from(this._element.childNodes).some(
      (n) => !(n as Element).slot && n.textContent
    );
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  /**
   * Method triggered at button click to emit the click event (can be caught from parent component).
   */
  public emitButtonClick(): void {
    if (!this.disabled && !this.isStatic) {
      this.click.emit();
    }
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n) => !!n.textContent.trim());
  }

  /**
   * Generate the class attribute based on component's parameters.
   */
  private _getClassString(): string {
    const sizeClass = `sbb-button--size-${this.size}`;
    const variantClass = `sbb-button--${this.variant}`;
    const iconClass = !this._hasText ? 'sbb-button--icon-only' : '';
    const semanticClass = this.isStatic ? 'sbb-button--visual-only' : '';
    const negativeClass = this.negative ? ' sbb-button--negative' : '';

    return `sbb-button ${variantClass} ${sizeClass} ${iconClass} ${semanticClass} ${negativeClass}`;
  }

  public render(): JSX.Element {
    let TAG_NAME: string;
    let attributeList: Record<string, string>;
    if (this.isStatic) {
      TAG_NAME = 'span';
      attributeList = getLinkButtonBaseAttributeList(this);
    } else if (this.href) {
      TAG_NAME = 'a';
      attributeList = getLinkAttributeList(this, this);
    } else {
      TAG_NAME = 'button';
      attributeList = getButtonAttributeList(this);
    }

    return (
      <TAG_NAME {...attributeList} class={this._getClassString()}>
        {(this.iconName || this._namedSlots.icon) && (
          <span class="sbb-button__icon">
            <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
          </span>
        )}

        <span class={{ 'sbb-button__label': true, 'sbb-button__label--hidden': !this._hasText }}>
          <slot onSlotchange={(event): void => this._onLabelSlotChange(event)} />
        </span>
      </TAG_NAME>
    );
  }
}
