import { Component, ComponentInterface, h, JSX } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-wagon-blocked-passage.scss',
  tag: 'sbb-wagon-blocked-passage',
})
export class SbbWagonBlockedPassage implements ComponentInterface {
  public render(): JSX.Element {
    return (
      <span class="sbb-wagon-blocked-passage">
        <span class="sbb-wagon-blocked-passage__wrapper">
          <span class="sbb-wagon-blocked-passage__icon"></span>
        </span>
      </span>
    );
  }
}
