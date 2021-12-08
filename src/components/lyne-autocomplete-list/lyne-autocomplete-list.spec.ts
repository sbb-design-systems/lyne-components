import { LyneAutocompleteList } from './lyne-autocomplete-list';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-autocomplete-list', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAutocompleteList],
      html: '<lyne-autocomplete-list />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-autocomplete-list>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-autocomplete-list>
      `);
  });

});
