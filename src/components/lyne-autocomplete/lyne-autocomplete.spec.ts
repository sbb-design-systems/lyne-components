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
            <div class="autocomplete">
              <lyne-text-input debounceinputevent="200" inputariaautocomplete="list" inputariacontrols="autocomplete-list" inputautocompletevalue="off" inputrequired="" inputrole="combobox" inputtype="text"></lyne-text-input>
              <lyne-autocomplete-list items="[{&quot;text&quot;: &quot;pre ipsum item1 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item2 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item3 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item4 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item5 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item6 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item7 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item8 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item9 post lorem&quot;},{&quot;text&quot;: &quot;pre ipsum item10 post lorem&quot;}]" listid="autocomplete-list"></lyne-autocomplete-list>
            </div>
          </mock:shadow-root>
        </lyne-autocomplete>
      `);
  });

});
