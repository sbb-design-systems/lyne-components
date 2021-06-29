import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-alert.scss',
  tag: 'lyne-alert'
})

export class LyneAlert {
  public toggleAlert(): void {
    /* eslint-disable no-alert */
    alert('This alert can only be shown, if client side java script is executed. For an SSR page that means, client side hydration was successfull.');
    /* eslint-enable no-alert */
  }

  public render(): any {

    return <button
      onClick={this.toggleAlert.bind(this)}
    >Click</button>;
  }
}
