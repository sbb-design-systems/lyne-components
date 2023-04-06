import { SbbMapContainer } from './sbb-map-container';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-map-container', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMapContainer],
      html: '<sbb-map-container />',
    });

    expect(root).toEqualHtml(`
        <sbb-map-container>
          <mock:shadow-root>
          <div class="sbb-map-container">
            <div class="sbb-map-container__sidebar">
              <slot></slot>
            </div>
            <div class="sbb-map-container__map">
              <slot name="map"></slot>
            </div>
          </div>
          </mock:shadow-root>
        </sbb-map-container>
      `);
  });
});
