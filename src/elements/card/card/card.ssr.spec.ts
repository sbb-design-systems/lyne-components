import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCardElement } from './card.component.js';

describe(`sbb-card ssr`, () => {
  let root: SbbCardElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-card size="l" color="transparent-bordered"></sbb-card>`,
      {
        modules: ['./card.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCardElement);
  });
});
