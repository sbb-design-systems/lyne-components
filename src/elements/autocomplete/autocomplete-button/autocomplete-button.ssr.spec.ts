import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAutocompleteButtonElement } from './autocomplete-button.component.ts';

import '../../autocomplete.ts';

describe(`sbb-autocomplete-button ssr`, () => {
  let root: SbbAutocompleteButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-autocomplete-button>Button</sbb-autocomplete-button>`,
      {
        modules: ['../../autocomplete.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAutocompleteButtonElement);
  });
});
