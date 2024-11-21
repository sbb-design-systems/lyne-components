import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTrainBlockedPassageElement } from './train-blocked-passage.js';

describe(`sbb-train-blocked-passage ssr`, () => {
  let root: SbbTrainBlockedPassageElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`, {
      modules: ['./train-blocked-passage.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainBlockedPassageElement);
  });
});
