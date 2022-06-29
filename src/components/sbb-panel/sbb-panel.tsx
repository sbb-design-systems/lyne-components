import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfacePanelAttributes } from './sbb-panel.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-panel.scss',
  tag: 'sbb-panel',
})

/**
 * @slot text - to render the text
 * @slot link- to render the link
 */
export class SbbPanel {
  /** The text to show in the panel */
  @Prop() public text!: string;

  /** The text to use as button text */
  @Prop() public buttonText!: string;

  /** Id which is sent in the click event payload for the button*/
  @Prop() public eventId?: string;

  /** The tag to use for the text element */
  @Prop() public tag?: InterfacePanelAttributes['tag'] = 'p';

  public render(): JSX.Element {
    return (
      <div class="panel">
        <div class="panel__text">
          <slot name="text" />
        </div>
        <div class="panel__link">
          <slot name="link" />
        </div>
      </div>
    );
  }
}
