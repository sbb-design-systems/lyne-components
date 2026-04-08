import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import { defaultDateAdapter } from '../../core.ts';
import { SbbCalendarElement } from '../calendar/calendar.component.ts';

import { SbbCalendarYearElement } from './calendar-year.component.ts';

import '../../calendar.ts';

describe('sbb-calendar-year', () => {
  let root: SbbCalendarElement;
  const today = new Date();
  const year = defaultDateAdapter.getYear(today);

  beforeEach(async () => {
    root = await fixture(html`<sbb-calendar view="year"></sbb-calendar>`);
  });

  it('renders', async () => {
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('should have the correct states on the calendar', async () => {
    const current = root.shadowRoot!.querySelectorAll('sbb-calendar-year:state(current)');
    expect(current.length).to.be.equal(1);
    assert.instanceOf(current[0], SbbCalendarYearElement);
    expect((current[0] as SbbCalendarYearElement).value).to.equal(String(year));
    const crossedOut = root.shadowRoot!.querySelectorAll('sbb-calendar-year:state(crossed-out)');
    expect(crossedOut.length).to.be.equal(0);
    const selected = root.shadowRoot!.querySelectorAll('sbb-calendar-year:state(selected)');
    expect(selected.length).to.be.equal(0);
    const disabled = root.shadowRoot!.querySelectorAll('sbb-calendar-year[disabled]');
    expect(disabled.length).to.be.equal(0);
  });

  it('should react to calendar property changes', async () => {
    root.selected = new Date(`${year}-06-15`);
    root.min = new Date(`${year - 2}-06-15`);
    root.max = new Date(`${year + 1}-06-15`);
    root.dateFilter = (d: Date | null): boolean =>
      !!d && d.getFullYear() !== year - 1 && d.getFullYear() !== year + 1;
    await waitForLitRender(root);
    const current = root.shadowRoot!.querySelectorAll('sbb-calendar-year:state(current)');
    expect(current.length).to.be.equal(1);
    assert.instanceOf(current[0], SbbCalendarYearElement);
    expect((current[0] as SbbCalendarYearElement).value).to.equal(String(year));
    const crossedOut = root.shadowRoot!.querySelectorAll('sbb-calendar-year:state(crossed-out)');
    expect(crossedOut.length).to.be.equal(2);
    expect((crossedOut[0] as SbbCalendarYearElement).value).to.be.equal(String(year - 1));
    expect((crossedOut[1] as SbbCalendarYearElement).value).to.be.equal(String(year + 1));
    const selected = root.shadowRoot!.querySelectorAll('sbb-calendar-year:state(selected)');
    expect(selected.length).to.be.equal(1);
    expect((selected[0] as SbbCalendarYearElement).value).to.be.equal(String(year));
    const disabled = root.shadowRoot!.querySelectorAll('sbb-calendar-year[disabled]');
    expect(disabled.length).to.be.equal(22);
  });
});
