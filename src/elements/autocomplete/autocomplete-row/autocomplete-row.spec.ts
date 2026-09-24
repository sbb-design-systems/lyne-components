import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbAutocompleteRowElement } from './autocomplete-row.component.ts';

import '../../autocomplete.ts';

describe('sbb-autocomplete-row', () => {
  let element: SbbAutocompleteRowElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-autocomplete-row></sbb-autocomplete-row>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAutocompleteRowElement);
    expect(element.role).to.be.null;
  });
});
