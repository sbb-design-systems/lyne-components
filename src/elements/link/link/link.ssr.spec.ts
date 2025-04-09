import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbLinkElement } from './link.component.js';

describe(`sbb-link ssr`, () => {
  let root: SbbLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-link href="#" id="focus-id">Inline link</sbb-link>`, {
      modules: ['./link.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLinkElement);
  });
});
