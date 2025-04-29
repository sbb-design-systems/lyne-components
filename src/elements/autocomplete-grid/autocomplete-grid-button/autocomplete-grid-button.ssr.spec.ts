import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbAutocompleteGridButtonElement } from './autocomplete-grid-button.component.js';

describe(`sbb-autocomplete-grid-button ssr`, () => {
  let element: SbbAutocompleteGridButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-autocomplete-grid-button>Button</sbb-autocomplete-grid-button>`,
      { modules: ['./autocomplete-grid-button.component.ts'] },
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAutocompleteGridButtonElement);
  });
});
