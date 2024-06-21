import { ssrHydratedFixture } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { waitForLitRender } from '../core/testing.js';

import { SbbClockElement } from './clock.js';

describe(`sbb-clock ssr`, () => {
  let root: SbbClockElement;

  beforeEach(async () => {
    root = await waitForLitRender(
      ssrHydratedFixture(html`<sbb-clock></sbb-clock>`, { modules: ['./clock.js'] }),
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbClockElement);
  });
});
