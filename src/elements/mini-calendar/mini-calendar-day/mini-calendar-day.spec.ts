import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbMiniCalendarDayElement } from './mini-calendar-day.component.js';

describe('sbb-mini-calendar-day', () => {
  let element: SbbMiniCalendarDayElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMiniCalendarDayElement);
  });

  it('has aria-label', async () => {
    expect(element.getAttribute('aria-label')).to.be.equal('January 1, 2025');
  });
});
