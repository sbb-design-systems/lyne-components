import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbContainerElement } from './container.js';

describe(`sbb-container ssr`, () => {
  let root: SbbContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-container></sbb-container>`, {
      modules: ['./container.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbContainerElement);
  });
});
