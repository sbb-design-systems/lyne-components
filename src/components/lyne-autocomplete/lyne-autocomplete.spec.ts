import { LyneAutocomplete } from './lyne-autocomplete';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-autocomplete.sample-data';

describe('lyne-autocomplete', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAutocomplete],
      html: `
<lyne-autocomplete
  items='${sampleData}'
  inputName='test-input'
  inputLabel='input-label'
  minChars='2'
></lyne-autocomplete>`
    });

    expect(root)
      .toEqualHtml(`
      <lyne-autocomplete inputlabel="input-label" inputname="test-input" items="[{&quot;text&quot;: &quot;Bern&quot;},{&quot;text&quot;: &quot;Bern, Hauptbahnhof&quot;},{&quot;text&quot;: &quot;Bern (Marzilibahn)&quot;},{&quot;text&quot;: &quot;Bern Marzili&quot;},{&quot;text&quot;: &quot;Bern Matte&quot;},{&quot;text&quot;: &quot;Bern Münsterplattform&quot;},{&quot;text&quot;: &quot;Bern Europaplatz, Bahnhof&quot;},{&quot;text&quot;: &quot;Bern, Bahnhof&quot;},{&quot;text&quot;: &quot;Bern, Brunnadernstrasse&quot;},{&quot;text&quot;: &quot;Bern, Bärenplatz&quot;}]" minchars="2">
          <mock:shadow-root>
            <div class="autocomplete">
              <lyne-text-input debounceinputevent="200" inputariaautocomplete="list" inputariacontrols="autocomplete-list" inputautocompletevalue="off" inputrequired="" inputrole="combobox" inputtype="text"></lyne-text-input>
              <div tabindex="-1">
                <ul aria-hidden="" class="autocomplete__list" id="autocomplete-list" role="presentation">
                  <lyne-autocomplete-item ariaposinset="1" ariasetsize="10" text="Bern"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="2" ariasetsize="10" text="Bern, Hauptbahnhof"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="3" ariasetsize="10" text="Bern (Marzilibahn)"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="4" ariasetsize="10" text="Bern Marzili"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="5" ariasetsize="10" text="Bern Matte"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="6" ariasetsize="10" text="Bern Münsterplattform"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="7" ariasetsize="10" text="Bern Europaplatz, Bahnhof"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="8" ariasetsize="10" text="Bern, Bahnhof"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="9" ariasetsize="10" text="Bern, Brunnadernstrasse"></lyne-autocomplete-item>
                  <lyne-autocomplete-item ariaposinset="10" ariasetsize="10" text="Bern, Bärenplatz"></lyne-autocomplete-item>
                </ul>
                <p aria-atomic="true" aria-live="polite" class="autocomplete__accessibility-hint" role="status"></p>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-autocomplete>
      `);
  });

});
