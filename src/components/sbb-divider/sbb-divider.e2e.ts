import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbDivider } from './sbb-divider';

describe('sbb-divider', () => {
  let element: SbbDivider;

  it('renders', async () => {
    await fixture(html`<sbb-divider></sbb-divider>`);
    element = document.querySelector('sbb-divider');
    assert.instanceOf(element, SbbDivider);
  });
});
