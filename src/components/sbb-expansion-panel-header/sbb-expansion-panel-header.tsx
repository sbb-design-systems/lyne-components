import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import {
  actionElementHandlerAspect,
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot icon - Slot used to render the panel-header icon.
 * @slot unnamed - Slot used to render the panel-header text.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel-header.scss',
  tag: 'sbb-expansion-panel-header',
})
export class SbbExpansionPanelHeader implements ComponentInterface {
  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Prop() public iconName?: string;

  /** Sets the correct toggle icon. */
  @Prop() public expanded: boolean;

  @Element() private _element!: HTMLElement;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @Event({
    bubbles: true,
    eventName: 'toggle-expanded',
  })
  public toggleExpanded: EventEmitter;

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    return (
      <Host slot="header">
        <button
          type="button"
          class="sbb-expansion-panel-header"
          aria-expanded={this.expanded}
          onClick={() => this.toggleExpanded.emit()}
        >
          <span class="sbb-expansion-panel-header__title">
            {(this.iconName || this._namedSlots.icon) && (
              <span class="sbb-expansion-panel-header__icon">
                <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
              </span>
            )}
            <span class="sbb-expansion-panel-header__label">
              <slot />
            </span>
          </span>
          <span class="sbb-expansion-panel-header__toggle">
            <sbb-icon name={this.expanded ? 'chevron-up-small' : 'chevron-down-small'} />
          </span>
        </button>
      </Host>
    );
  }
}
