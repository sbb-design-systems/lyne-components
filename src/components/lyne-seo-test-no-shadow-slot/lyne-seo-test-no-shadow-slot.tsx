import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: 'lyne-seo-test-no-shadow-slot.scss',
  tag: 'lyne-seo-test-no-shadow-slot'
})

export class LyneSeoTestNoShadowSlot {
  public render(): JSX.Element {
    return <div>
      <slot />
    </div>;
  }
}
