import { SbbSlider } from './sbb-slider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider />',
    });

    expect(root).toEqualHtml(`
        <sbb-slider>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-slider>
      `);
  });
});
