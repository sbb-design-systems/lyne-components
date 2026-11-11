import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAutocompleteRowElement } from './autocomplete-row.component.ts';

import '../../autocomplete.ts';

describe(`sbb-autocomplete-row ssr`, () => {
  let root: SbbAutocompleteRowElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-autocomplete-row></sbb-autocomplete-row>`, {
      modules: ['../../autocomplete.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAutocompleteRowElement);
  });
});
