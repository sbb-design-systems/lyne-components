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
  ButtonType,
  forwardHostClick,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  PopupType,
  resolveRenderVariables,
} from '../../global/interfaces/link-button-properties';
import { ACTION_ELEMENTS, hostContext } from '../../global/helpers/host-context';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

/**
 * @slot unnamed - Button Content
 * @slot icon - Slot used to display the icon, if one is set
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-button.scss',
  tag: 'sbb-button',
})
export class SbbButton implements LinkButtonProperties, ComponentInterface {
  /** Variant of the button, like primary, secondary etc. */
  @Prop({ reflect: true }) public variant: InterfaceButtonAttributes['variant'] = 'primary';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /** Size variant, either l or m. */
  @Prop({ reflect: true }) public size?: InterfaceButtonAttributes['size'] = 'l';

  /**
   * Set this property to true if you want only a visual representation of a
   * button, but no interaction (a span instead of a link/button will be rendered).
   */
  @Prop({ attribute: 'static', mutable: true, reflect: true }) public isStatic = false;

  /** Pass in an id, if you need to identify the inner element. */
  @Prop() public idValue?: string;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;

  /** The href value you want to link to (if it is present, button becomes a link). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled? = false;

  /** The name attribute to use for the button. */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

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
  @Prop() public accessibilityHaspopup: PopupType | undefined;

  /** Emits the event on button click. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-button_click',
  })
  public click: EventEmitter;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  @Element() private _element!: HTMLElement;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _hasText = false;
  
  private _closestForm: HTMLFormElement | null;

  public connectedCallback(): void {
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this._element);
    // Check if the current element is nested in a form.
    this._closestForm = hostContext('form', this._element) as HTMLFormElement;
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
    if (this.disabled || this.isStatic) {
      return;
    }
    this.click.emit();
    if (this._closestForm && this.type === 'submit') {
      this._closestForm.requestSubmit();
    }
  }

  @Listen('click')
  public handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      forwardHostClick(
        event,
        this._element,
        this._element.shadowRoot.firstElementChild as HTMLElement // button or a element
      );
    }
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n) => !!n.textContent.trim());
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    }: LinkButtonRenderVariables = resolveRenderVariables(this, this.isStatic);

    // See https://github.com/ionic-team/stencil/issues/2703#issuecomment-1050943715 on why form attribute is set with `setAttribute`
    return (
      <TAG_NAME
        id={this.idValue}
        class={{ 'sbb-button': true, ['sbb-button--icon-only']: !this._hasText }}
        {...attributes}
        ref={(btn) => this.form && btn?.setAttribute('form', this.form)}
      >
        {(this.iconName || this._namedSlots.icon) && (
          <span class="sbb-button__icon">
            <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
          </span>
        )}

        <span class={{ 'sbb-button__label': true, 'sbb-button__label--hidden': !this._hasText }}>
          <slot onSlotchange={(event): void => this._onLabelSlotChange(event)} />
          {screenReaderNewWindowInfo && (
            <span class="sbb-button__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[getDocumentLang()]}
            </span>
          )}
        </span>
      </TAG_NAME>
    );
  }
}
