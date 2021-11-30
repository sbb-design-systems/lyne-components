import { LyneAutocompleteItem } from './lyne-autocomplete-item';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-autocomplete-item', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAutocompleteItem],
      html: '<lyne-autocomplete-item />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-autocomplete-item>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-autocomplete-item>
      `);
  });

});
