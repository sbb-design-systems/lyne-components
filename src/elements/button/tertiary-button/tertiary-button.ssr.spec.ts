import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTertiaryButtonElement } from './tertiary-button.js';

describe(`sbb-tertiary-button ssr`, () => {
  let root: SbbTertiaryButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tertiary-button>Button</sbb-tertiary-button>`, {
      modules: ['./tertiary-button.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTertiaryButtonElement);
  });
});
