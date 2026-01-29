import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbCalendarEnhancedElement } from '../../calendar.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';
import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import { createSlottedDays } from '../calendar-enhanced/calendar-enhanced.helper.private.ts';

import { SbbCalendarDayElement } from './calendar-day.component.ts';
import '../calendar-enhanced/calendar-enhanced.component.ts';

describe('sbb-calendar-day', () => {
  let root: SbbCalendarEnhancedElement;
  let todayElement: SbbCalendarDayElement;
  const elementInternals = elementInternalsSpy();

  const today = new Date();
  const month = defaultDateAdapter.getMonth(today);
  const year = defaultDateAdapter.getYear(today);
  const currentDaySlotNameSelector = `sbb-calendar-day[slot="${defaultDateAdapter.toIso8601(today)}"]`;

  beforeEach(async () => {
    root = await fixture(html`
      <sbb-calendar-enhanced> ${createSlottedDays(year, month)} </sbb-calendar-enhanced>
    `);
    todayElement = root.querySelector(currentDaySlotNameSelector)!;
  });

  it('renders', async () => {
    assert.instanceOf(root, SbbCalendarEnhancedElement);
    assert.instanceOf(todayElement, SbbCalendarDayElement);
  });

  it('should have the right properties on todayElement', async () => {
    expect(todayElement).to.match(':state(current)');
    expect(todayElement).not.to.match(':state(crossed-out)');
    expect(todayElement).not.to.match(':state(selected)');
    expect(todayElement.disabled).to.be.false;
    expect(elementInternals.get(todayElement)!.ariaCurrent).to.be.equal('date');
  });

  it('should react to calendar property changes', async () => {
    root.selected = new Date(`${year}-${month}-15`);
    root.min = new Date(`${year}-${month}-10`);
    root.max = new Date(`${year}-${month}-20`);
    root.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 1;
    await waitForLitRender(root);
    const selectedDaySelector = `sbb-calendar-day[slot="${defaultDateAdapter.toIso8601(root.selected)}"]`;
    const selectedElement = root.querySelector<SbbCalendarDayElement>(selectedDaySelector)!;
    expect(selectedElement).to.match(':state(selected)');
    expect(elementInternals.get(selectedElement)!.ariaPressed).to.be.equal('true');

    const lowerThanMinSelector = `sbb-calendar-day[slot="${defaultDateAdapter.toIso8601(new Date(`${year}-${month}-01`))}"]`;
    const lowerThanMinElement = root.querySelector<SbbCalendarDayElement>(lowerThanMinSelector)!;
    expect(lowerThanMinElement.disabled).to.be.true;
    expect(elementInternals.get(lowerThanMinElement)!.ariaDisabled).to.be.equal('true');

    const higherThanMaxSelector = `sbb-calendar-day[slot="${defaultDateAdapter.toIso8601(new Date(`${year}-${month}-25`))}"]`;
    const higherThanMaxElement = root.querySelector<SbbCalendarDayElement>(higherThanMaxSelector)!;
    expect(higherThanMaxElement.disabled).to.be.true;
    expect(elementInternals.get(higherThanMaxElement)!.ariaDisabled).to.be.equal('true');

    const filteredOutSelector = `sbb-calendar-day[slot="${defaultDateAdapter.toIso8601(new Date(`${year}-${month}-18`))}"]`;
    const filteredOutElement = root.querySelector<SbbCalendarDayElement>(filteredOutSelector)!;
    expect(filteredOutElement).to.match(':state(crossed-out)');
  });
});
