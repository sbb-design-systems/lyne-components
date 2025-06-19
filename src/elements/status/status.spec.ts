import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbStatusElement } from './status.component.js';

describe(`sbb-status`, () => {
  let element: SbbStatusElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-status><p>Status info text</p></sbb-status>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStatusElement);
  });
});
