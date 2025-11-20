import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbChipElement } from './chip.component.ts';

describe(`sbb-chip ssr`, () => {
  let root: SbbChipElement;

  it('renders', async () => {
    root = await ssrHydratedFixture(html`<sbb-chip value="Value"></sbb-chip>`, {
      modules: ['./chip.component.js'],
    });
    assert.instanceOf(root, SbbChipElement);
  });

  it('renders with label', async () => {
    root = await ssrHydratedFixture(html`<sbb-chip value="Value">Label</sbb-chip>`, {
      modules: ['./chip.component.js'],
    });
    assert.instanceOf(root, SbbChipElement);
  });
});
