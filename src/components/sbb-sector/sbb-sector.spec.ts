import { SbbSector } from './sbb-sector';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-sector', () => {
  it('renders an empty sector with a label', async () => {
    const { root } = await newSpecPage({
      components: [SbbSector],
      html: '<sbb-sector label="Sector A"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-sector label="Sector A">
          <mock:shadow-root>
            <div class="sbb-sector">
              <h3 class="sbb-sector__label">
                <span class="sbb-sector__sticky-wrapper">Sector A</span>
              </h3>
              <div class="sbb-sector__wagons">
                <slot />
              </div>
            </div>
          </mock:shadow-root>
        </sbb-sector>
      `);
  });
});
