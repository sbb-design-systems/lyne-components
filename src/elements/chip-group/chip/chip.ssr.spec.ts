import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbChipElement } from './chip.js';

describe(`sbb-chip ssr`, () => {
  let root: SbbChipElement;

  it('renders', async () => {
    root = await ssrHydratedFixture(html`<sbb-chip value="Value"></sbb-chip>`, {
      modules: ['./chip.js'],
    });
    assert.instanceOf(root, SbbChipElement);
  });

  it('renders with label', async () => {
    root = await ssrHydratedFixture(html`<sbb-chip value="Value">Label</sbb-chip>`, {
      modules: ['./chip.js'],
    });
    assert.instanceOf(root, SbbChipElement);
  });
});
