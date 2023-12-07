import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbContainerElement } from '.';

describe('sbb-container', () => {
  let element: SbbContainerElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-container></sbb-container>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbContainerElement);
  });
});
