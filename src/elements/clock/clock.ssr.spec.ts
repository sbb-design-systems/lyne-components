import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbClockElement } from './clock.js';

describe(`sbb-clock ssr`, () => {
  it('renders', async () => {
    const root = await ssrHydratedFixture(html`<sbb-clock></sbb-clock>`, {
      modules: ['./clock.js'],
    });
    assert.instanceOf(root, SbbClockElement);
  });

  it('renders with specific time', async () => {
    const root = await ssrHydratedFixture(html`<sbb-clock now="12:00:00"></sbb-clock>`, {
      modules: ['./clock.js'],
    });
    assert.instanceOf(root, SbbClockElement);
  });
});
