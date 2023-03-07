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
   * Whether the radio button is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('content');

  @Element() private _element: HTMLElement;

  private _contentElement: HTMLElement;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('change')
  @Listen('state-change')
  public onInputChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;

    if (this.checked) {
      this._element.style.setProperty(
        '--sbb-selection-panel-content-height',
        `${this._contentElement.scrollHeight}px`
      );
    }
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  public render(): JSX.Element {
    return (
      <Host data-has-content={this._namedSlots.content}>
        <div class="sbb-selection-panel">
          <div class="sbb-selection-panel__badge">
            <slot name="badge" />
          </div>

          <div class="sbb-selection-panel__input">
            <slot />
          </div>

          {this._namedSlots.content && (
            <div class="sbb-selection-panel__content" ref={(el) => (this._contentElement = el)}>
              <slot name="content" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
