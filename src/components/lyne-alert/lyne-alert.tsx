import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: 'lyne-alert.scss',
  tag: 'lyne-alert'
})

export class LyneAlert {
  public toggleAlert(): void {
    /* eslint-disable no-alert */
    alert('hey');
    /* eslint-enable no-alert */
  }

  public render(): any {

    return <button
      onClick={this.toggleAlert.bind(this)}
    >Click</button>;
  }
}
