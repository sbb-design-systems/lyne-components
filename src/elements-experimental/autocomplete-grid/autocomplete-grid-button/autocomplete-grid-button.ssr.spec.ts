import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbAutocompleteGridButtonElement } from './autocomplete-grid-button.component.ts';

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
