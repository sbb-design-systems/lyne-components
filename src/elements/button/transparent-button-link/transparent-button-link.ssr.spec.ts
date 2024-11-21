import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTransparentButtonLinkElement } from './transparent-button-link.js';

describe(`sbb-transparent-button-link ssr`, () => {
  let root: SbbTransparentButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-transparent-button-link>Button</sbb-transparent-button-link>`,
      {
        modules: ['./transparent-button-link.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTransparentButtonLinkElement);
  });
});
