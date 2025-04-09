import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbAutocompleteGridCellElement } from './autocomplete-grid-cell.component.js';

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
