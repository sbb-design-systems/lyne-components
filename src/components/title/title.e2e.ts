import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private/index.js';

import { SbbTitleElement } from './title.js';

describe(`sbb-title with ${fixture.name}`, () => {
  let element: SbbTitleElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-title></sbb-title>`, { modules: ['./title.ts'] });
    assert.instanceOf(element, SbbTitleElement);
  });
});
