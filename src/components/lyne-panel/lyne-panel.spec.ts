import { LynePanel } from './lyne-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-panel', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePanel],
      html: '<lyne-panel />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-panel>
          <mock:shadow-root>
          </mock:shadow-root>
        </lyne-panel>
      `);
  });
});
