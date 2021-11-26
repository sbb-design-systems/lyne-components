import { LyneAutocomplete } from './lyne-autocomplete';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-autocomplete', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAutocomplete],
      html: '<lyne-autocomplete />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-autocomplete>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-autocomplete>
      `);
  });

});
