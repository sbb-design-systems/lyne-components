import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTitle } from './sbb-title';

describe('sbb-title', () => {
  let element: SbbTitle;

  it('renders', async () => {
    await fixture(html`<sbb-title></sbb-title>`);
    element = document.querySelector('sbb-title');
    assert.instanceOf(element, SbbTitle);
  });
});
