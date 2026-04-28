import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTrainWagonLinkElement } from './train-wagon-link.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon-link ssr`, () => {
  let root: SbbTrainWagonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-train-wagon-link href="#"></sbb-train-wagon-link>`, {
      modules: ['../../train.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTrainWagonLinkElement);
  });
});
