import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfacePanelAttributes } from './lyne-panel.custom.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-panel.scss',
  tag: 'lyne-panel'
})

export class LynePanel {

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
      <div class='lyne-panel'>
        <TAGNAME class='lyne-panel__text'>{this.text}</TAGNAME>

        <lyne-button
          class='lyne-panel__button'
          label={this.buttonText}
          variant='secondary-negative'
          size='small'
          event-id={this.eventId}
        ></lyne-button>

      </div>
    );
  }
}
