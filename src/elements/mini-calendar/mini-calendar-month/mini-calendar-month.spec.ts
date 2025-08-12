import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbMiniCalendarMonthElement } from './mini-calendar-month.component.js';

describe('sbb-mini-calendar-month', () => {
  let element: SbbMiniCalendarMonthElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-mini-calendar-month></sbb-mini-calendar-month>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMiniCalendarMonthElement);
  });
});
