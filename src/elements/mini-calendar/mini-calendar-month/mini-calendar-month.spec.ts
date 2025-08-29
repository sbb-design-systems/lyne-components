import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbMiniCalendarMonthElement } from './mini-calendar-month.component.js';

describe('sbb-mini-calendar-month', () => {
  let element: SbbMiniCalendarMonthElement;

  it('renders', async () => {
    element = await fixture(html`
      <sbb-mini-calendar-month date="2025-01"></sbb-mini-calendar-month>
    `);
    assert.instanceOf(element, SbbMiniCalendarMonthElement);
  });

  it('should have CSS offset property set', async () => {
    element = await fixture(html`
      <sbb-mini-calendar-month date="2025-01"></sbb-mini-calendar-month>
    `);
    expect(element.style.getPropertyValue('--sbb-mini-calendar-month-offset')).to.be.equal('3');
  });

  it('should have year and month label', async () => {
    element = await fixture(html`
      <sbb-mini-calendar-month date="2025-01"></sbb-mini-calendar-month>
    `);
    expect(
      element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-year')!.textContent,
    ).to.be.equal('2025');
    expect(
      element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jan.');
  });

  it('should have only month label', async () => {
    element = await fixture(html`
      <sbb-mini-calendar-month date="2025-06"></sbb-mini-calendar-month>
    `);
    expect(
      element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-year')!.textContent,
    ).to.be.equal('');
    expect(
      element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jun.');
  });

  it('should have year and month label if first child of sbb-mini-calendar', async () => {
    element = await fixture(html`
      <sbb-mini-calendar>
        <sbb-mini-calendar-month date="2025-06"></sbb-mini-calendar-month>
      </sbb-mini-calendar>
    `);
    const month = element.querySelector('sbb-mini-calendar-month')!;
    expect(
      month.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-year')!.textContent,
    ).to.be.equal('2025');
    expect(
      month.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jun.');
  });
});
