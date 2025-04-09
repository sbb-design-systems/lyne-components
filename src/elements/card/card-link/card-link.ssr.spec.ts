import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';
import type { SbbCardElement } from '../card.js';

import { SbbCardLinkElement } from './card-link.component.js';

import '../card.js';

describe(`sbb-card-link ssr`, () => {
  let root: SbbCardElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-card>
          <sbb-card-link
            href="https://github.com/sbb-design-systems/lyne-components"
            target="_blank"
            >Follow me</sbb-card-link
          >
          Content text
        </sbb-card>
      `,
      { modules: ['../card.js', './card-link.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-card-link'), SbbCardLinkElement);
  });
});
