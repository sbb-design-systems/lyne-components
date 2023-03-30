import { Component, ComponentInterface, Element, h, Host, JSX, Prop } from '@stencil/core';
import { actionElementHandlerAspect, HandlerRepository } from '../../global/helpers';
import { hostContext } from '../../global/helpers/host-context';
import {
  ButtonProperties,
  resolveButtonRenderVariables,
} from '../../global/interfaces/link-button-properties';

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

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName = 'circle-information-small';

  /** Whether the tooltip-trigger is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(this._element, actionElementHandlerAspect);
  private _isInFormField = false;

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._isInFormField = !!(
      hostContext('sbb-form-field', this._element) ??
      hostContext('[data-form-field]', this._element)
    );
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const { hostAttributes } = resolveButtonRenderVariables(this);

    return (
      <Host {...hostAttributes}>
        <span class="sbb-tooltip-trigger" data-icon-small={this._isInFormField}>
          <slot>{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        </span>
      </Host>
    );
  }
}
