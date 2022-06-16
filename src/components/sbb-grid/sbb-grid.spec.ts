import { SbbGrid } from './sbb-grid';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-grid', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbGrid],
      html: '<sbb-grid />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-grid>
          <mock:shadow-root>
          <div class="grid grid--base grid--primary"></div>
          </mock:shadow-root>
        </sbb-grid>
      `);
  });

});
