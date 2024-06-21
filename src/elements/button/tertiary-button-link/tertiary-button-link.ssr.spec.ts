import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTertiaryButtonLinkElement } from './tertiary-button-link.js';

describe(`sbb-tertiary-button-link ssr`, () => {
  let root: SbbTertiaryButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-tertiary-button-link>Button</sbb-tertiary-button-link>`,
      {
        modules: ['./tertiary-button-link.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTertiaryButtonLinkElement);
  });
});
