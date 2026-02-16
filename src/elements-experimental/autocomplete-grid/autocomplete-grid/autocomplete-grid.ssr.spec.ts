import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.js';
import { html } from 'lit/static-html.js';

import { SbbAutocompleteGridElement } from './autocomplete-grid.component.ts';
import '../autocomplete-grid-row.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';

describe(`sbb-autocomplete-grid ssr`, () => {
  let formField: SbbFormFieldElement;
  let element: SbbAutocompleteGridElement;

  beforeEach(async () => {
    formField = await fixture(
      html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete-grid id="myAutocomplete">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1" id="option-1"
                >Option 1
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button
                  id="button-1"
                  icon-name="pen-small"
                ></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="2" id="option-2"
                >Option 2
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button
                  id="button-2"
                  icon-name="pen-small"
                ></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button
                  id="button-3"
                  icon-name="trash-small"
                ></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
        </sbb-form-field>
      `,
      { modules: ['../../autocomplete-grid.ts', '../../../elements/form-field.ts'] },
    );
    element = formField.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;
  });

  it('renders', () => {
    assert.instanceOf(formField, SbbFormFieldElement);
    assert.instanceOf(element, SbbAutocompleteGridElement);
  });
});
