import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbCalendarElement } from './calendar.component.ts';

describe(`sbb-calendar ssr`, () => {
  let root: SbbCalendarElement;

  beforeEach(async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);
    root = await ssrHydratedFixture(
      html`<sbb-calendar selected="2023-01-20T00:00:00"></sbb-calendar>`,
      { modules: ['./calendar.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders shadow DOM', () => {
    assert.instanceOf(root.shadowRoot?.querySelector('.sbb-calendar__controls'), HTMLDivElement);
  });
});
