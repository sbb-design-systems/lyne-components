import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';

import { SbbMiniCalendarDayElement } from './mini-calendar-day.component.ts';

describe('sbb-mini-calendar-day', () => {
  let element: SbbMiniCalendarDayElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMiniCalendarDayElement);
  });

  it('has aria-label', async () => {
    expect(elementInternals.get(element)!.ariaLabel).to.equal('January 1, 2025');
  });
});
