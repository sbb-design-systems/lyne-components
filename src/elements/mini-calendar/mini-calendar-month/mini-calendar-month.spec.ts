import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbMiniCalendarMonthElement } from './mini-calendar-month.component.js';
import '../mini-calendar.js';

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

  it('should have year label visible', async () => {
    element = await fixture(html`
      <sbb-mini-calendar-month date="2025-01"></sbb-mini-calendar-month>
    `);
    element['toggleState']('show-year', true);
    expect(
      element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jan.');
    const yearDiv = element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-year')!;
    expect(yearDiv.textContent).to.be.equal('2025');
    expect(getComputedStyle(yearDiv).getPropertyValue('display')).to.be.equal('block');
  });

  it('should have year label not visible', async () => {
    element = await fixture(html`
      <sbb-mini-calendar-month date="2025-06"></sbb-mini-calendar-month>
    `);
    expect(
      element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jun.');
    const yearDiv = element.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-year')!;
    expect(yearDiv.textContent).to.be.equal('2025');
    expect(getComputedStyle(yearDiv).getPropertyValue('display')).to.be.equal('none');
  });

  it('should have year label visible if first child of sbb-mini-calendar or January', async () => {
    element = await fixture(html`
      <sbb-mini-calendar>
        <sbb-mini-calendar-month date="2025-06"></sbb-mini-calendar-month>
        <sbb-mini-calendar-month date="2025-09"></sbb-mini-calendar-month>
        <sbb-mini-calendar-month date="2025-01"></sbb-mini-calendar-month>
      </sbb-mini-calendar>
    `);
    const months = element.querySelectorAll('sbb-mini-calendar-month');

    const firstMonth = months[0];
    expect(
      firstMonth.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jun.');
    const firstMonthYear = firstMonth.shadowRoot!.querySelector(
      '.sbb-mini-calendar-month-label-year',
    )!;
    expect(getComputedStyle(firstMonthYear).getPropertyValue('display')).to.be.equal('block');

    const secondMonth = months[1];
    expect(
      secondMonth.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Sep.');
    const secondMonthYear = secondMonth.shadowRoot!.querySelector(
      '.sbb-mini-calendar-month-label-year',
    )!;
    expect(getComputedStyle(secondMonthYear).getPropertyValue('display')).to.be.equal('none');

    const thirdMonth = months[2];
    expect(
      thirdMonth.shadowRoot!.querySelector('.sbb-mini-calendar-month-label-month')!.textContent,
    ).to.be.equal('Jan.');
    const thirdMonthYear = thirdMonth.shadowRoot!.querySelector(
      '.sbb-mini-calendar-month-label-year',
    )!;
    expect(getComputedStyle(thirdMonthYear).getPropertyValue('display')).to.be.equal('block');
  });
});
