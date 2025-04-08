import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbAutocompleteGridRowElement } from './autocomplete-grid-row.component.js';

describe('sbb-autocomplete-grid-row', () => {
  let element: SbbAutocompleteGridRowElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-autocomplete-grid-row></sbb-autocomplete-grid-row>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAutocompleteGridRowElement);
  });
});
