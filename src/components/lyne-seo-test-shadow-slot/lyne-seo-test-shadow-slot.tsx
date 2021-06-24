import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-seo-test-shadow-slot.scss',
  tag: 'lyne-seo-test-shadow-slot'
})

export class LyneSeoTestShadowSlot {
  public render(): JSX.Element {
    return <div>
      <slot />
    </div>;
  }
}
