import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTrainWagonButtonElement } from './train-wagon-button.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon-button ssr`, () => {
  let root: SbbTrainWagonButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train-wagon-button></sbb-train-wagon-button>`, {
      modules: ['../../train.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainWagonButtonElement);
  });
});
