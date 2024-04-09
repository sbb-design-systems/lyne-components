import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private/index.js';

import { SbbChipElement } from './chip.js';

describe(`sbb-chip with ${fixture.name}`, () => {
  it('renders', async () => {
    const element: SbbChipElement = await fixture(html`<sbb-chip>Label</sbb-chip>`, {
      modules: ['./chip.ts'],
    });
    assert.instanceOf(element, SbbChipElement);
  });
});
