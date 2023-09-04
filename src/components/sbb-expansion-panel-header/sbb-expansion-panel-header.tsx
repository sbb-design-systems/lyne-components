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
} from '../../global/eventing';
import { ButtonProperties, resolveButtonRenderVariables } from '../../global/interfaces';
import { toggleDatasetEntry } from '../../global/dom';

/**
 * @slot icon - Slot used to render the panel header icon.
 * @slot unnamed - Slot used to render the panel header text.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel-header.scss',
  tag: 'sbb-expansion-panel-header',
})
export class SbbExpansionPanelHeader implements ButtonProperties, ComponentInterface {
  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Prop() public iconName?: string;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled: boolean;

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
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _emitExpandedEvent(): void {
    if (!this.disabled) {
      this.toggleExpanded.emit();
    }
  }

  private _onMouseMovement(toggleDataAttribute: boolean): void {
    const parent: HTMLSbbExpansionPanelElement = this._element.closest('sbb-expansion-panel');
    // The `sbb.hover-mq` logic has been removed from scss, but it must be replicated to have
    // the correct behavior on mobile. Android devices need also `(pointer: fine)`.
    if (parent && window.matchMedia('(any-hover: hover) and (pointer: fine)').matches) {
      toggleDatasetEntry(parent, 'toggleHover', toggleDataAttribute);
    }
  }

  public render(): JSX.Element {
    const { hostAttributes } = resolveButtonRenderVariables(this);

    return (
      <Host
        slot="header"
        {...hostAttributes}
        data-icon={!!(this.iconName || this._namedSlots.icon)}
        onClick={() => this._emitExpandedEvent()}
        onMouseenter={() => this._onMouseMovement(true)}
        onMouseleave={() => this._onMouseMovement(false)}
      >
        <span class="sbb-expansion-panel-header">
          <span class="sbb-expansion-panel-header__title">
            {(this.iconName || this._namedSlots.icon) && (
              <span class="sbb-expansion-panel-header__icon">
                <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
              </span>
            )}
            <slot />
          </span>
          {!this.disabled && (
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon
                name="chevron-small-down-medium"
                class="sbb-expansion-panel-header__toggle-icon"
              />
            </span>
          )}
        </span>
      </Host>
    );
  }
}
