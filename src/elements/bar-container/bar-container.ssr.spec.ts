import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbBarContainerElement } from './bar-container.component.ts';

describe(`sbb-bar-container ssr`, () => {
  let root: SbbBarContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-bar-container></sbb-bar-container>`, {
      modules: ['./bar-container.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbBarContainerElement);
  });
});
