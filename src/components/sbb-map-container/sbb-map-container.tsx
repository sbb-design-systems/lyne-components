import { Component, h, JSX } from '@stencil/core';

/**
 * @slot unnamed - Used for slotting the sidebar content.
 * @slot map - Used for slotting the map.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-map-container.scss',
  tag: 'sbb-map-container',
})
export class SbbMapContainer {
  public render(): JSX.Element {
    return (
      <div class="sbb-map-container">
        <div class="sbb-map-container__sidebar">
            <slot></slot>
        </div>
        <div class="sbb-map-container__map">
          <slot name="map"></slot>
        </div>
      </div>
    );
  }
}
