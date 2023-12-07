import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbMessageElement } from './message';

describe('sbb-message', () => {
  let element: SbbMessageElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-message></sbb-message>`);
    assert.instanceOf(element, SbbMessageElement);
  });
});
