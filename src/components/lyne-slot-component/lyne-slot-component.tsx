import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-slot-component.default.scss',
    shared: 'styles/lyne-slot-component.shared.scss'
  },
  tag: 'lyne-slot-component'
})

export class LyneSlotComponent {
  public render(): JSX.Element {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
