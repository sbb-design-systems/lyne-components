import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTrainFormationElement } from './train-formation.component.ts';

describe(`sbb-train-formation ssr`, () => {
  let root: SbbTrainFormationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train-formation></sbb-train-formation>`, {
      modules: ['./train-formation.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainFormationElement);
  });
});
