import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbJourneySummaryElement } from './journey-summary.js';

describe(`sbb-journey-summary ssr`, () => {
  let root: SbbJourneySummaryElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-journey-summary></sbb-journey-summary>`, {
      modules: ['./journey-summary.js'],
    });
  });

  it('renders', function () {
    // This test seems flakey for unknown reason, so we extend the timeout for this
    // specific test.
    this.timeout(20000);
    assert.instanceOf(root, SbbJourneySummaryElement);
  });
});
