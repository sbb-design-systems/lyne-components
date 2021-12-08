import { LyneAutocompleteItem } from './lyne-autocomplete-item';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-autocomplete-item', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAutocompleteItem],
      html: '<lyne-autocomplete-item text="lorem ipsum item1 dolor sit" highlight="tem"></lyne-autocomplete-item>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-autocomplete-item highlight="tem" text="lorem ipsum item1 dolor sit">
          <mock:shadow-root>
            <li class="autocomplete-item autocomplete-item--has-hightlight" role="option" tabindex="-1">
              <slot name="pre-text"></slot>
              <span>
                lorem ipsum i
              </span>
              <span class="autocomplete-item__highlight">
                tem
              </span>
              <span>
                1 dolor sit
              </span>
              <slot name="post-text"></slot>
            </li>
          </mock:shadow-root>
        </lyne-autocomplete-item>
      `);
  });

});
