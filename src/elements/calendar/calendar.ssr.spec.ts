import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbCalendarElement } from './calendar.js';

describe(`sbb-calendar ssr`, () => {
  let root: SbbCalendarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-calendar now="2023-01-04T00:00:00" selected="2023-01-20T00:00:00"></sbb-calendar>`,
      { modules: ['./calendar.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders shadow DOM', () => {
    assert.instanceOf(root.shadowRoot?.querySelector('.sbb-calendar__controls'), HTMLDivElement);
  });
});
