import { LyneInputError } from './lyne-input-error';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-input-error', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneInputError],
      html: '<lyne-input-error />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-input-error>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-input-error>
      `);
  });

});
