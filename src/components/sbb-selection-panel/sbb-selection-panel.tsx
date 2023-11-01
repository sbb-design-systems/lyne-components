import {
  Component,
  ComponentInterface,
  h,
  Element,
  Event,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  EventEmitter,
} from '@stencil/core';
import { CheckboxStateChange } from '../sbb-checkbox/sbb-checkbox.custom';
import { RadioButtonStateChange } from '../sbb-radio-button/sbb-radio-button.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import { InterfaceSbbSelectionPanelAttributes } from './sbb-selection-panel.custom';

/**
 * @slot unnamed - Use this slot to provide a `sbb-checkbox` or a `sbb-radio-button`.
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 * @slot content - Use this slot to provide custom content for the panel (optional).
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-selection-panel.scss',
  tag: 'sbb-selection-panel',
})
export class SbbSelectionPanel implements ComponentInterface {
  /**
   * The background color of the panel.
   */
  @Prop() public color: InterfaceSbbSelectionPanelAttributes['color'] = 'white';

  /**
   * Whether the content section is always visible.
   */
  @Prop({ reflect: true }) public forceOpen = false;

  /**
   * Whether the unselected panel has a border.
   */
  @Prop({ reflect: true }) public borderless = false;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * The state of the selection panel.
   */
  @State() private _state: 'closed' | 'opening' | 'opened' | 'closing';

  /**
   * Whether the selection panel is checked.
   */
  @State() private _checked = false;

  /**
   * Whether the selection panel is disabled.
   */
  @State() private _disabled = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('content');

  @Element() private _element!: HTMLElement;

  /**
   * Emits whenever the content section starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<{ closeTarget: HTMLElement }>;

  /**
   * Emits whenever the content section is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<{ closeTarget: HTMLElement }>;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  private _contentElement: HTMLElement;

  private get _input(): HTMLSbbCheckboxElement | HTMLSbbRadioButtonElement {
    return this._element.querySelector('sbb-checkbox, sbb-radio-button') as
      | HTMLSbbCheckboxElement
      | HTMLSbbRadioButtonElement;
  }

  @Listen('state-change', { passive: true })
  public onInputChange(event: CustomEvent<RadioButtonStateChange | CheckboxStateChange>): void {
    if (event.detail.type === 'disabled') {
      this._disabled = event.detail.disabled;
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    this._checked = event.detail.checked;

    if (this.forceOpen) {
      return;
    }

    if (this._checked) {
      this._state = 'opening';
      this.willOpen.emit();
      this.disableAnimation && this._handleOpening();
    } else {
      this._state = 'closing';
      this.willClose.emit();
      this.disableAnimation && this._handleClosing();
    }
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  @Listen('input-loaded')
  public updateSelectionPanel(): void {
    this._checked = this._input?.checked;
    this._state = this._checked || this.forceOpen ? 'opened' : 'closed';
    this._disabled = this._input?.disabled;
  }

  private _onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this._contentElement || event.propertyName !== 'opacity') {
      return;
    }

    if (this._checked) {
      this._handleOpening();
    } else {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this.didOpen.emit();
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this.didClose.emit();
  }

  public render(): JSX.Element {
    return (
      <Host
        data-has-content={this._namedSlots['content']}
        data-state={this._state}
        data-checked={this._checked}
        data-disabled={this._disabled}
      >
        <div class="sbb-selection-panel">
          <div class="sbb-selection-panel__badge">
            <slot name="badge" />
          </div>

          <div class="sbb-selection-panel__input">
            <slot />
          </div>

          {this._namedSlots['content'] && (
            <div
              class="sbb-selection-panel__content--wrapper"
              data-expanded={this._checked || this.forceOpen}
              ref={(el) => {
                this._contentElement = el;
                this._contentElement.inert = !this._checked && !this.forceOpen;
              }}
              onTransitionEnd={(event: TransitionEvent) => this._onTransitionEnd(event)}
            >
              <div class="sbb-selection-panel__content">
                <sbb-divider />
                <slot name="content" />
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
