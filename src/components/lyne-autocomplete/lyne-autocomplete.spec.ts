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
              <lyne-text-input borderless="" class="autocomplete__input" debounceinputevent="200" eventid="sampleId" inputariaautocomplete="list" inputariacontrols="autocomplete-list" inputautocompletevalue="off" inputname="textfield" inputplaceholder="z.B. Bern" inputrequired="" inputrole="combobox" inputtype="text" label="Von" labelvisible=""></lyne-text-input>
              <ul aria-hidden="" class="autocomplete__list" id="autocomplete-list" role="presentation">
                <lyne-autocomplete-item ariaposinset="1" ariasetsize="10" text="pre ipsum item1 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="2" ariasetsize="10" text="pre ipsum item2 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="3" ariasetsize="10" text="pre ipsum item3 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="4" ariasetsize="10" text="pre ipsum item4 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="5" ariasetsize="10" text="pre ipsum item5 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="6" ariasetsize="10" text="pre ipsum item6 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="7" ariasetsize="10" text="pre ipsum item7 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="8" ariasetsize="10" text="pre ipsum item8 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="9" ariasetsize="10" text="pre ipsum item9 post lorem"></lyne-autocomplete-item>
                <lyne-autocomplete-item ariaposinset="10" ariasetsize="10" text="pre ipsum item10 post lorem"></lyne-autocomplete-item>
              </ul>
              <p aria-atomic="true" aria-live="polite" class="autocomplete__accessibility-hint" role="status"></p>
            </div>
          </mock:shadow-root>
        </lyne-autocomplete>
      `);
  });

});
