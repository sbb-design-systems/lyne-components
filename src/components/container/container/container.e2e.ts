import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbContainer } from '.';

describe('sbb-container', () => {
  let element: SbbContainer;

  beforeEach(async () => {
    element = await fixture(html`<sbb-container></sbb-container>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbContainer);
  });
});
