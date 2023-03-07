import {
  Component,
  ComponentInterface,
  h,
  Element,
  Host,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { RadioButtonStateChange } from '../sbb-radio-button/sbb-radio-button.custom';
import { InterfaceSbbSelectionPanelAttributes } from './sbb-selection-panel.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-selection-panel.scss',
  tag: 'sbb-selection-panel',
})
export class SbbSelectionPanel implements ComponentInterface {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbSelectionPanelAttributes['someInterface'];

  /**
   * The background color of the panel.
   */
  @Prop() color: 'white' | 'milk' = 'white';

  /**
   * Whether the content section is always visible.
   */
  @Prop({ reflect: true }) public forceOpen = false;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

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
  @State() private _namedSlots = createNamedSlotState('badge', 'content');

  @Element() private _element: HTMLElement;

  private _contentElement: HTMLElement;

  private get _input(): HTMLInputElement {
    return this._element.querySelector('sbb-checkbox, sbb-radio-button') as HTMLInputElement;
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('state-change')
  public onInputChange(event: CustomEvent<RadioButtonStateChange>): void {
    event.stopPropagation();

    if (event.detail.type === 'disabled') {
      this._disabled = event.detail.disabled;
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    this._checked = event.detail.checked;
    this._setContentElementHeight();
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._updateSelectionPanel();
  }

  private _updateSelectionPanel(): void {
    this._checked = this._input?.checked;
    this._disabled = this._input?.disabled;
    this._setContentElementHeight();
  }

  private _setContentElementHeight(): void {
    if (this._contentElement && this._checked && !this.forceOpen) {
      this._element.style.setProperty(
        '--sbb-selection-panel-content-height',
        `${this._contentElement.scrollHeight}px`
      );
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        data-has-content={this._namedSlots['content']}
        data-checked={this._checked}
        data-disabled={this._disabled}
      >
        <div class="sbb-selection-panel">
          {this._namedSlots['badge'] && (
            <div class="sbb-selection-panel__badge">
              <slot name="badge" />
            </div>
          )}

          <div class="sbb-selection-panel__input">
            <slot onSlotchange={() => this._updateSelectionPanel()} />
          </div>

          {this._namedSlots['content'] && (
            <div class="sbb-selection-panel__content" ref={(el) => (this._contentElement = el)}>
              <sbb-divider />
              <slot name="content" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
