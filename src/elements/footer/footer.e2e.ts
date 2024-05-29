import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbFooterElement } from './footer.js';

describe(`sbb-footer with ${fixture.name}`, () => {
  let element: SbbFooterElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-footer></sbb-footer>`, { modules: ['./footer.ts'] });
    assert.instanceOf(element, SbbFooterElement);
  });
});
