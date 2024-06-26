import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbMessageElement } from './message.js';

describe(`sbb-message ssr`, () => {
  let root: SbbMessageElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-message></sbb-message>`, {
      modules: ['./message.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMessageElement);
  });
});
