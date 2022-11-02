import { SbbSector } from './sbb-sector';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-sector', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSector],
      html: '<sbb-sector />',
    });

    expect(root).toEqualHtml(`
        <sbb-sector>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-sector>
      `);
  });
});
