import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbJourneySummaryElement } from './journey-summary.component.ts';

describe(`sbb-journey-summary ssr`, () => {
  let root: SbbJourneySummaryElement;

  beforeEach(async function () {
    // This test seems flakey for unknown reason, so we extend the timeout for this
    // specific test.
    this.timeout(20000);
    root = await ssrHydratedFixture(html`<sbb-journey-summary></sbb-journey-summary>`, {
      modules: ['./journey-summary.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbJourneySummaryElement);
  });
});
