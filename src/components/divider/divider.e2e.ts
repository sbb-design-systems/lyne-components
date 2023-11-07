import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbDivider } from './divider';

describe('sbb-divider', () => {
  it('renders', async () => {
    const element: SbbDivider = await fixture(html`<sbb-divider></sbb-divider>`);
    assert.instanceOf(element, SbbDivider);
  });
});
