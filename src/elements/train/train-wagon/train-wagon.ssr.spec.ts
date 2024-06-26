import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTrainWagonElement } from './train-wagon.js';

describe(`sbb-train-wagon ssr`, () => {
  let root: SbbTrainWagonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train-wagon></sbb-train-wagon>`, {
      modules: ['./train-wagon.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainWagonElement);
  });
});
