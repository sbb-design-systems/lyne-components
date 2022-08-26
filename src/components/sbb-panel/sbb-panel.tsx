import { Component, h, Prop } from '@stencil/core';
import { InterfacePanelAttributes } from './sbb-panel.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-panel.scss',
  tag: 'sbb-panel',
})
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
    const TAGNAME = this.tag;

    return (
      <div class="panel">
        <TAGNAME class="panel__text">{this.text}</TAGNAME>

        <sbb-button
          class="panel__button"
          variant="secondary"
          negative={true}
          size="m"
          event-id={this.eventId}
          visual-button-only={true}
        >
          {this.buttonText}
        </sbb-button>
      </div>
    );
  }
}
