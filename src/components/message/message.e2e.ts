import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private/index.js';

import { SbbMessageElement } from './message.js';

describe(`sbb-message with ${fixture.name}`, () => {
  let element: SbbMessageElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-message></sbb-message>`, { modules: ['./message.ts'] });
    assert.instanceOf(element, SbbMessageElement);
  });
});
