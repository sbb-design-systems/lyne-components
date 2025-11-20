import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';
import type { SbbCardElement } from '../card.ts';

import { SbbCardLinkElement } from './card-link.component.ts';

import '../card.ts';

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
