import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import type { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.js';
import { html } from 'lit/static-html.js';

import { SbbAutocompleteGridOptionElement } from './autocomplete-grid-option.component.ts';
import '@sbb-esta/lyne-elements/form-field.js';
import '../autocomplete-grid.ts';
import '../autocomplete-grid-optgroup.ts';
import '../autocomplete-grid-row.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';

describe(`sbb-autocomplete-grid-option ssr`, () => {
  let element: SbbFormFieldElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete-grid>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option>Option 1</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option>Option 2</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
        </sbb-form-field>
      `,
      { modules: ['../../autocomplete-grid.ts', '../../../elements/form-field.ts'] },
    );
  });

  it('renders', async () => {
    const option = element.querySelector('sbb-autocomplete-grid-option')!;
    assert.instanceOf(option, SbbAutocompleteGridOptionElement);
  });
});
