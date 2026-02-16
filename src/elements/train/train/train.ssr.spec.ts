import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTrainElement } from './train.component.ts';

describe(`sbb-train ssr`, () => {
  let root: SbbTrainElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train></sbb-train>`, {
      modules: ['./train.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainElement);
  });
});
