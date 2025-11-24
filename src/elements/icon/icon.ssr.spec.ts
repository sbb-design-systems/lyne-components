import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbIconElement } from './icon.component.ts';

describe(`sbb-icon ssr`, () => {
  let root: SbbIconElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-icon name="app-icon-small"></sbb-icon>`, {
      modules: ['./icon.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconElement);
  });
});
