import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCalendarDayElement } from './calendar-day.component.ts';

describe('sbb-calendar-day', () => {
  let element: SbbCalendarDayElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-calendar-day></sbb-calendar-day>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendarDayElement);
  });
});
