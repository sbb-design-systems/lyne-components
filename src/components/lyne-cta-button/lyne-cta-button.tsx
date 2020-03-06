import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter
} from '@stencil/core';

@Component({
  tag: 'lyne-cta-button',
  styleUrl: 'lyne-cta-button.css',
  shadow: true
})

export class LyneCtaButton {

  /** Event is triggered when button is clicked */
  @Event() onClick: EventEmitter;

  /** Label text to show on the button */
  @Prop() label: string = 'Default button text';

  handleClick(event: UIEvent) {
    this.onClick.emit(event);
  }

  render() {
    return <button class='button' onClick={this.handleClick.bind(this)}>{this.label}</button>;
  }

}
