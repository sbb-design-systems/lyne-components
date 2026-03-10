import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbStatusElement } from './status.component.ts';

import '../status.ts';

describe(`sbb-status ssr`, () => {
  let root: SbbStatusElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-status>Status info text</sbb-status>`, {
      modules: ['../status.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbStatusElement);
  });
});
