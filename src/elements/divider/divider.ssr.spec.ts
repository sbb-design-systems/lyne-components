import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbDividerElement } from './divider.component.ts';

import '../divider.ts';

describe(`sbb-divider ssr`, () => {
  let root: SbbDividerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-divider></sbb-divider>`, {
      modules: ['../divider.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDividerElement);
  });
});
