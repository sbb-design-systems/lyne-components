import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-panel.scss',
  tag: 'lyne-panel'
})

export class LynePanel {

  public render(): JSX.Element {
    return (
      <div>
        lyne panel
      </div>
    );
  }
}
