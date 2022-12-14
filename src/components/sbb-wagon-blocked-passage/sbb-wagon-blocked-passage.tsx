import { Component, ComponentInterface, h, JSX } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-wagon-blocked-passage.scss',
  tag: 'sbb-wagon-blocked-passage',
})
export class SbbWagonBlockedPassage implements ComponentInterface {
  public render(): JSX.Element {
    return (
      <div class="sbb-wagon-blocked-passage">
        <div class="sbb-wagon-blocked-passage__icon"></div>
      </div>
    );
  }
}
