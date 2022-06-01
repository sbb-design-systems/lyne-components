import { LyneAlert } from './lyne-alert';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-alert', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAlert],
      html: '<lyne-alert />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-alert>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-alert>
      `);
  });

});
