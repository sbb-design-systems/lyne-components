import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbBlockLinkElement } from './block-link.component.ts';

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
      { modules: ['./block-link.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbBlockLinkElement);
  });
});
