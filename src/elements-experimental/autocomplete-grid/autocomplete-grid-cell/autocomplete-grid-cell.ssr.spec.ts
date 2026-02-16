import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbAutocompleteGridCellElement } from './autocomplete-grid-cell.component.ts';

describe(`sbb-autocomplete-grid-cell ssr`, () => {
  let element: SbbAutocompleteGridCellElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-autocomplete-grid-cell></sbb-autocomplete-grid-cell>`, {
      modules: ['./autocomplete-grid-cell.component.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAutocompleteGridCellElement);
  });
});
