import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-cta-button.css',
  tag: 'lyne-cta-button'
})

export class LyneCtaButton {

  /** Event is triggered when button is clicked */
  @Event() public onClick: EventEmitter;

  /** Label text to show on the button */
  @Prop() public label = 'Default button text';

  private handleClick = (event: UIEvent): void => {
    this.onClick.emit(event);
  };

  public render(): JSX.Element {
    return <button class='button' onClick={this.handleClick.bind(this)}>{this.label}</button>;
  }
}
