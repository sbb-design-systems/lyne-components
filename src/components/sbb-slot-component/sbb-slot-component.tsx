import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-slot-component.default.scss',
    shared: 'styles/sbb-slot-component.shared.scss'
  },
  tag: 'sbb-slot-component'
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
