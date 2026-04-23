import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import { defaultDateAdapter } from '../../core.ts';
import { SbbCalendarElement } from '../calendar/calendar.component.ts';

import { SbbCalendarMonthElement } from './calendar-month.component.ts';

import '../../calendar.ts';

describe('sbb-calendar-month', () => {
  let root: SbbCalendarElement;
  const today = new Date();
  const year = String(defaultDateAdapter.getYear(today));
  const month = String(defaultDateAdapter.getMonth(today)).padStart(2, '0');

  beforeEach(async () => {
    root = await fixture(html`<sbb-calendar view="month"></sbb-calendar>`);
  });

  it('renders', async () => {
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('should have the correct states on the calendar', async () => {
    const current = root.shadowRoot!.querySelectorAll('sbb-calendar-month:state(current)');
    expect(current.length).to.be.equal(1);
    assert.instanceOf(current[0], SbbCalendarMonthElement);
    expect((current[0] as SbbCalendarMonthElement).value).to.equal(`${year}-${month}`);
    const crossedOut = root.shadowRoot!.querySelectorAll('sbb-calendar-month:state(crossed-out)');
    expect(crossedOut.length).to.be.equal(0);
    const selected = root.shadowRoot!.querySelectorAll('sbb-calendar-month:state(selected)');
    expect(selected.length).to.be.equal(0);
    const disabled = root.shadowRoot!.querySelectorAll('sbb-calendar-month[disabled]');
    expect(disabled.length).to.be.equal(0);
  });

  it('should react to calendar property changes', async () => {
    root.selected = new Date(`${year}-06-15`);
    root.min = new Date(`${year}-03-15`);
    root.max = new Date(`${year}-09-15`);
    root.dateFilter = (d: Date | null): boolean => !!d && d.getMonth() % 2 === 1;
    await waitForLitRender(root);
    const current = root.shadowRoot!.querySelectorAll('sbb-calendar-month:state(current)');
    expect(current.length).to.be.equal(1);
    assert.instanceOf(current[0], SbbCalendarMonthElement);
    expect((current[0] as SbbCalendarMonthElement).value).to.equal(`${year}-${month}`);
    const crossedOut = root.shadowRoot!.querySelectorAll('sbb-calendar-month:state(crossed-out)');
    expect(crossedOut.length).to.be.equal(4);
    expect((crossedOut[0] as SbbCalendarMonthElement).value).to.be.equal(`${year}-03`);
    expect((crossedOut[1] as SbbCalendarMonthElement).value).to.be.equal(`${year}-05`);
    expect((crossedOut[2] as SbbCalendarMonthElement).value).to.be.equal(`${year}-07`);
    expect((crossedOut[3] as SbbCalendarMonthElement).value).to.be.equal(`${year}-09`);
    const selected = root.shadowRoot!.querySelectorAll('sbb-calendar-month:state(selected)');
    expect(selected.length).to.be.equal(1);
    expect((selected[0] as SbbCalendarMonthElement).value).to.be.equal(`${year}-06`);
    expect((selected[0] as SbbCalendarMonthElement).shadowRoot!.textContent).to.be.equal(`Jun`);
    const disabled = root.shadowRoot!.querySelectorAll('sbb-calendar-month[disabled]');
    expect(disabled.length).to.be.equal(9);
    expect((disabled[0] as SbbCalendarMonthElement).value).to.be.equal(`${year}-01`);
    expect((disabled[1] as SbbCalendarMonthElement).value).to.be.equal(`${year}-02`);
    expect((disabled[6] as SbbCalendarMonthElement).value).to.be.equal(`${year}-10`);
    expect((disabled[7] as SbbCalendarMonthElement).value).to.be.equal(`${year}-11`);
    expect((disabled[8] as SbbCalendarMonthElement).value).to.be.equal(`${year}-12`);
  });
});
