import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbChipElement } from './chip';

describe('sbb-chip', () => {
  it('renders', async () => {
    const element: SbbChipElement = await fixture(html`<sbb-chip>Label</sbb-chip>`);
    assert.instanceOf(element, SbbChipElement);
  });
});
