import { SbbMapContainer } from './sbb-map-container';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-map-container', () => {
  it('renders the container with button', async () => {
    const { root } = await newSpecPage({
      components: [SbbMapContainer],
      html: '<sbb-map-container />',
    });

    expect(root).toEqualHtml(`
        <sbb-map-container>
          <mock:shadow-root>
          <div class="sbb-map-container">
            <div class="sbb-map-container__sidebar">
              <span></span>
              <slot></slot>
              <sbb-button
                class="sbb-map-container__sidebar-button"
                variant="tertiary"
                size="l"
                icon-name="location-pin-map-small"
                type="button"
              >Show map</sbb-button>
            </div>
            <div class="sbb-map-container__map">
              <slot name="map"></slot>
            </div>
          </div>
          </mock:shadow-root>
        </sbb-map-container>
      `);
  });
  it('renders the container without button', async () => {
    const { root } = await newSpecPage({
      components: [SbbMapContainer],
      html: '<sbb-map-container hide-scroll-up-button/>',
    });

    expect(root).toEqualHtml(`
        <sbb-map-container hide-scroll-up-button>
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
