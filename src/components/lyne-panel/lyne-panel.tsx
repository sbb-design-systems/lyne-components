import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-panel.scss',
  tag: 'lyne-panel'
})

export class LynePanel {

  /** The text to show in the panel */
  @Prop() public text? = 'Text inside of the panel.';

  public render(): JSX.Element {
    return (
      <div class='lyne-panel'>
        <p>{this.text}</p>
        <lyne-button
          label='Button text'
          variant='secondary-negative'
          size='small'
        ></lyne-button>
      </div>
    );
  }
}
