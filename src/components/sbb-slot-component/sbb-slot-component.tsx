import { Component, h, JSX } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-slot-component.scss',
  tag: 'sbb-slot-component',
})
export class SbbSlotComponent {
  public render(): JSX.Element {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
