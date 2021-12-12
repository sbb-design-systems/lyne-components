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
            <div class="autocomplete-list" tabindex="-1">
              <ul aria-hidden="" class="autocomplete-list__list" role="presentation"></ul>
              <p aria-atomic="true" aria-live="polite" class="autocomplete-list__accessibility-hint" role="status"></p>
            </div>
          </mock:shadow-root>
        </lyne-autocomplete-list>
      `);
  });

});
