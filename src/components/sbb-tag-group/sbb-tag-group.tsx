import { Component, h, JSX } from '@stencil/core';

/**
 * @slot unnamed - Provide one or more 'sbb-tag' to add to the group.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tag-group.scss',
  tag: 'sbb-tag-group',
})
export class SbbTagGroup {
  public render(): JSX.Element {
    return (
      <div class="sbb-tag-group" role="tablist">
        <slot />
      </div>
    );
  }
}
