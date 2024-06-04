import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../core/testing/private.js';

import { SbbCalendarElement } from './calendar.js';

describe(`sbb-calendar ${fixture.name}`, () => {
  let root: SbbCalendarElement;

  beforeEach(async () => {
    root = await fixture(
      html`<sbb-calendar data-now="1673348400000" selected="1673744400"></sbb-calendar>`,
      { modules: ['./calendar.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarElement);
  });
});
