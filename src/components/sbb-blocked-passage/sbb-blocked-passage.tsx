import { Component, h, JSX } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-blocked-passage.scss',
  tag: 'sbb-blocked-passage',
})
export class SbbBlockedPassage {
  public render(): JSX.Element {
    return (
      <div class="sbb-blocked-passage">
        <div class="sbb-blocked-passage__icon"></div>
      </div>
    );
  }
}
