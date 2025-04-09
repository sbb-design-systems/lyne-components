import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbJourneyHeaderElement } from './journey-header.component.js';

describe(`sbb-journey-header ssr`, () => {
  let root: SbbJourneyHeaderElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-journey-header></sbb-journey-header>`, {
      modules: ['./journey-header.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbJourneyHeaderElement);
  });
});
