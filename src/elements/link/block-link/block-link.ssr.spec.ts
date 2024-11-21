import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbBlockLinkElement } from './block-link.js';

describe(`sbb-block-link ssr`, () => {
  let root: SbbBlockLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-block-link
          href="https://github.com/sbb-design-systems/lyne-components"
          size="m"
          download
          accessibility-label="Travelcards &amp; tickets"
        >
          Travelcards &amp; tickets.
        </sbb-block-link>
      `,
      { modules: ['./block-link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbBlockLinkElement);
  });
});
