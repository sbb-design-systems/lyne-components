import { Component, ComponentInterface, h, JSX } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-train-blocked-passage.scss',
  tag: 'sbb-train-blocked-passage',
})
export class SbbTrainBlockedPassage implements ComponentInterface {
  public render(): JSX.Element {
    return (
      <span class="sbb-train-blocked-passage">
        <span class="sbb-train-blocked-passage__wrapper">
          <span class="sbb-train-blocked-passage__icon"></span>
        </span>
      </span>
    );
  }
}
