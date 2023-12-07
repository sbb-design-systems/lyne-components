import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbIconElement } from './icon';

describe('sbb-icon', () => {
  let element: SbbIconElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-icon></sbb-icon>`);

    assert.instanceOf(element, SbbIconElement);
  });
});
