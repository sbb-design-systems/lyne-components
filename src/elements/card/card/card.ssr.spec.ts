import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCardElement } from './card.component.ts';

describe(`sbb-card ssr`, () => {
  let root: SbbCardElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-card color="transparent-bordered"></sbb-card>`, {
      modules: ['./card.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCardElement);
  });
});
