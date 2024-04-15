import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbStatusElement } from './status.js';

describe(`sbb-status with ${fixture.name}`, () => {
  let element: SbbStatusElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-status> Status info text </sbb-status>`, {
      modules: ['./status.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStatusElement);
  });
});
