import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbContainerElement } from './container.component.ts';

describe(`sbb-container ssr`, () => {
  let root: SbbContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-container></sbb-container>`, {
      modules: ['./container.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbContainerElement);
  });
});
