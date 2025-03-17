import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbJourneySummaryElement } from './journey-summary.component.js';

describe(`sbb-journey-summary ssr`, () => {
  let root: SbbJourneySummaryElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-journey-summary></sbb-journey-summary>`, {
      modules: ['./journey-summary.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbJourneySummaryElement);
  });
});
