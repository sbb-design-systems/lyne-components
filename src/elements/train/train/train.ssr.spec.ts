import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTrainElement } from './train.js';

describe(`sbb-train ssr`, () => {
  let root: SbbTrainElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train></sbb-train>`, { modules: ['./train.js'] });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainElement);
  });
});
