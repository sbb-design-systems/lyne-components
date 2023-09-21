import { Component, ComponentInterface, Element, h, Host, JSX, Prop } from '@stencil/core';
import { ButtonProperties, resolveButtonRenderVariables } from '../../global/interfaces';
import { hostContext, isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import { HandlerRepository, actionElementHandlerAspect } from '../../global/eventing';

/**
 * @slot unnamed - Slot to render the content.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tooltip-trigger.scss',
  tag: 'sbb-tooltip-trigger',
})
export class SbbTooltipTrigger implements ComponentInterface, ButtonProperties {
  /** The name attribute to use for the button. */
  @Prop({ reflect: true }) public name: string | undefined;

  /** Negative coloring variant flag. */
  @Prop({ reflect: true, mutable: true }) public negative = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Prop() public iconName = 'circle-information-small';

  /** Whether the tooltip-trigger is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(this._element, actionElementHandlerAspect);

  public connectedCallback(): void {
    this._handlerRepository.connect();
    const formField =
      hostContext('sbb-form-field', this._element) ??
      hostContext('[data-form-field]', this._element);

    if (formField) {
      toggleDatasetEntry(this._element, 'iconSmall', true);
      this.negative = isValidAttribute(formField as HTMLElement, 'negative');
    }
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const { hostAttributes } = resolveButtonRenderVariables(this);

    return (
      <Host {...hostAttributes}>
        <span class="sbb-tooltip-trigger">
          <slot>{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        </span>
      </Host>
    );
  }
}
