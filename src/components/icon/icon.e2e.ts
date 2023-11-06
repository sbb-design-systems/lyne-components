import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbIcon } from './sbb-icon';

describe('sbb-icon', () => {
  let element;

  it('renders', async () => {
    element = await fixture(html`<sbb-icon></sbb-icon>`);

    assert.instanceOf(element, SbbIcon);
  });
});
