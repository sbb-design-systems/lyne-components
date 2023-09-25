import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbChip } from './sbb-chip';

describe('sbb-chip', () => {
  it('renders', async () => {
    await fixture(html`<sbb-chip>Label</sbb-chip>`);

    const element: SbbChip = document.querySelector('sbb-chip');
    assert.instanceOf(element, SbbChip);
  });
});
