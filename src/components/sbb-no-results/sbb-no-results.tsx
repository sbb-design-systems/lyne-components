import { Component, ComponentInterface, Host, h, JSX, Prop, State, Element } from '@stencil/core';
import {
  HandlerRepository,
  createNamedSlotState,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot image - Use this slot to provide an sbb-image component.
 * @slot title - Use this slot to provide title text for the component.
 * @slot subtitle - Use this slot to provide a subtitle, must be a paragraph.
 * @slot legend - Use this slot to provide a legend, must be a paragraph.
 * @slot action - Use this slot to provide an sbb-button.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-no-results.scss',
  tag: 'sbb-no-results',
})
export class SbbNoResults implements ComponentInterface {
  /** Content of title. */
  @Prop() public titleContent?: string;

  /** Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '3';

  @State() private _namedSlots = createNamedSlotState('image', 'legend', 'action');

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    return (
      <Host>
        <div class="sbb-no-results__container">
          {this._namedSlots['image'] && <slot name="image" />}
          <sbb-title level={this.titleLevel} visualLevel="5" class="sbb-no-results__title">
            <slot name="title">{this.titleContent}</slot>
          </sbb-title>
          <slot name="subtitle" />
          {this._namedSlots['legend'] && <slot name="legend" />}
          {this._namedSlots['action'] && <slot name="action" />}
        </div>
      </Host>
    );
  }
}
