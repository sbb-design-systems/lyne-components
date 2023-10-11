import { Component, ComponentInterface, JSX, Prop, h } from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot image - Use this slot to provide a sbb-image component.
 * @slot title - Use this slot to provide title text for the component.
 * @slot subtitle - Use this slot to provide a subtitle, must be a paragraph.
 * @slot legend - Use this slot to provide a legend, must be a paragraph.
 * @slot action - Use this slot to provide a sbb-button.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-message.scss',
  tag: 'sbb-message',
})
export class SbbMessage implements ComponentInterface {
  /** Content of title. */
  @Prop() public titleContent?: string;

  /** Level of title, it will be rendered as heading tag (e.g., h3). Defaults to level 3. */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '3';

  public render(): JSX.Element {
    return (
      <div class="sbb-message__container">
        <slot name="image" />
        <sbb-title level={this.titleLevel} visualLevel="5" class="sbb-message__title">
          <slot name="title">{this.titleContent}</slot>
        </sbb-title>
        <slot name="subtitle" />
        <slot name="legend" />
        <slot name="action" />
      </div>
    );
  }
}
