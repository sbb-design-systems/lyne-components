import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing';

import { SbbDividerElement } from './divider';

describe(`sbb-divider with ${fixture.name}`, () => {
  it('renders', async () => {
    const element: SbbDividerElement = await fixture(html`<sbb-divider></sbb-divider>`, {
      modules: ['./divider.ts'],
    });
    assert.instanceOf(element, SbbDividerElement);
  });
});
