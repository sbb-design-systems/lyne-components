import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfacePanelAttributes } from './lyne-panel.custom.d';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-panel.default.scss',
    shared: 'styles/lyne-panel.shared.scss'
  },
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
      <div class='panel'>
        <TAGNAME class='panel__text'>{this.text}</TAGNAME>

        <lyne-button
          class='panel__button'
          label={this.buttonText}
          variant='secondary-negative'
          size='m'
          event-id={this.eventId}
          visual-button-only
        />

      </div>
    );
  }
}
