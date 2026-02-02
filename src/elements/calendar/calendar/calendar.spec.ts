import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonStub, stub } from 'sinon';

import type { SbbSecondaryButtonElement } from '../../button/secondary-button.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  elementInternalsSpy,
  fixture,
  sbbBreakpointLargeMinPx,
} from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';

import {
  focusesCurrentDay,
  focusesFirstMonthDifferentYear,
  focusesSelectedMonth,
  waitForTransition,
} from './calendar-base.spec.ts';
import { SbbCalendarElement } from './calendar.component.ts';

import '../../button.ts';

describe(`sbb-calendar`, () => {
  const elementInternals = elementInternalsSpy();
  let element: SbbCalendarElement;
  let todayStub: SinonStub;
  let today: Date | null = null;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').callsFake(
      () => today ?? new Date(2023, 9, 10, 0, 0, 0, 0),
    );
  });

  after(() => {
    todayStub.restore();
  });

  describe('horizontal', () => {
    before(() => {
      today = new Date(2023, 0, 10, 0, 0, 0, 0);
    });

    after(() => {
      today = null;
    });

    beforeEach(async () => {
      element = await fixture(html`<sbb-calendar selected="2023-01-15"></sbb-calendar>`);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbCalendarElement);
    });

    it('highlights current day', async () => {
      const currentDayButton = element.shadowRoot!.querySelector(
        'sbb-calendar-day[slot="2023-01-10"]',
      );
      expect(currentDayButton).to.match(':state(current)');
    });

    it('renders and navigates to next month', async () => {
      let day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-next',
      )!;
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-02-01');
    });

    it('renders and navigates to previous month', async () => {
      let day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

      const prevMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-previous',
      )!;
      prevMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2022-12-01');
    });

    it('sets max and next month button gets disabled', async () => {
      element.max = new Date('2023-01-29');
      await waitForLitRender(element);

      let day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-next',
      )!;
      expect(nextMonthButton).to.have.attribute('disabled');
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');
    });

    it('sets min and previous month button gets disabled', async () => {
      element.min = new Date('2023-01-15');
      await waitForLitRender(element);

      let day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

      const nextMonthButton = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-previous',
      ) as HTMLElement;
      expect(nextMonthButton).to.have.attribute('disabled');
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('sbb-calendar-day')!;
      expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');
    });

    it('selects a different date', async () => {
      const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
      const selectedDate = element.shadowRoot!.querySelector('sbb-calendar-day[slot="2023-01-15"]');

      expect(selectedDate).to.match(':state(selected)');

      const newSelectedDate = element.shadowRoot!.querySelector(
        'sbb-calendar-day[slot="2023-01-18"]',
      ) as HTMLElement;
      expect(newSelectedDate).not.to.match(':state(selected)');
      newSelectedDate.click();
      await selectedSpy.calledOnce();

      expect(selectedDate).not.to.match(':state(selected)');
      expect(newSelectedDate).to.match(':state(selected)');
      expect(selectedSpy.count).to.be.greaterThan(0);
    });

    it("clicks on disabled day and doesn't change selection", async () => {
      const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

      element.max = new Date('2023-01-29');
      await waitForLitRender(element);

      const day = element.shadowRoot!.querySelector(
        'sbb-calendar-day[slot="2023-01-30"]',
      ) as HTMLElement;
      expect(day).to.have.attribute('disabled');
      expect(day).not.to.match(':state(selected)');
      day.click();
      await waitForLitRender(element);

      expect(day).not.to.match(':state(selected)');
      expect(selectedSpy.count).not.to.be.greaterThan(0);
    });

    describe('focusing', () => {
      before(() => {
        today = new Date(2023, 9, 15, 0, 0, 0, 0);
      });

      after(() => {
        today = null;
      });

      it('focuses current day', async () => {
        element = await fixture(html`<sbb-calendar></sbb-calendar>`);

        await focusesCurrentDay(element);

        const selectedDayButton = element.shadowRoot!.querySelector<SbbCalendarDayElement>(
          'sbb-calendar-day[slot="2023-10-15"]',
        )!;

        expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(selectedDayButton);
      });

      it('focuses selected month when selecting same year', async () => {
        await focusesSelectedMonth(element);

        const selectedDayButton = element.shadowRoot!.querySelector<SbbCalendarDayElement>(
          'sbb-calendar-day[slot="2023-10-15"]',
        )!;

        expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(selectedDayButton);
      });

      it('focuses first month when selecting different year', async () => {
        await focusesFirstMonthDifferentYear(element);

        const selectedDayButton = element.shadowRoot!.querySelector<SbbCalendarDayElement>(
          'sbb-calendar-day[slot="2024-01-01"]',
        )!;

        expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(selectedDayButton);
      });
    });

    it('keeps focus on updating', async () => {
      element.focus();
      expect(document.activeElement).to.be.equal(element);

      // Trigger an update which triggers updated().
      element.wide = true;
      await waitForTransition(element);

      expect(document.activeElement).to.be.equal(element);
    });
  });

  describe('vertical', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar selected="2023-01-15" orientation="vertical"></sbb-calendar>`,
      );
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbCalendarElement);
    });
  });

  it('renders with min and max', async () => {
    const page: HTMLElement = await fixture(
      html`<sbb-calendar selected="2023-01-20" min="2023-01-09" max="2023-01-29"></sbb-calendar>`,
    );

    const buttonPrevDay = page.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
      'sbb-secondary-button#sbb-calendar__controls-previous',
    );
    expect(buttonPrevDay).to.have.attribute('disabled');
    const buttonNextDay = page.shadowRoot!.querySelector(
      'sbb-secondary-button#sbb-calendar__controls-next',
    );
    expect(buttonNextDay).to.have.attribute('disabled');

    const emptyCells = page.shadowRoot!.querySelectorAll('td:not(:has(> sbb-calendar-day))');
    expect(emptyCells.length).to.be.equal(6);

    const lastDisabledMinDate = page.shadowRoot!.querySelector<SbbCalendarDayElement>(
      "sbb-calendar-day[slot='2023-01-08']",
    )!;
    expect(lastDisabledMinDate).to.have.attribute('disabled');
    expect(elementInternals.get(lastDisabledMinDate)?.ariaDisabled).to.be.equal('true');
    const firstNotDisabledMinDate = page.shadowRoot!.querySelector<SbbCalendarDayElement>(
      "sbb-calendar-day[slot='2023-01-09']",
    )!;
    expect(firstNotDisabledMinDate).not.to.have.attribute('disabled');
    expect(elementInternals.get(firstNotDisabledMinDate)?.ariaDisabled).to.be.equal('false');

    const lastNotDisabledMaxDate = page.shadowRoot!.querySelector<SbbCalendarDayElement>(
      "sbb-calendar-day[slot='2023-01-29']",
    )!;
    expect(lastNotDisabledMaxDate).not.to.have.attribute('disabled');
    expect(elementInternals.get(lastNotDisabledMaxDate)?.ariaDisabled).to.be.equal('false');
    const firstDisabledMaxDate = page.shadowRoot!.querySelector<SbbCalendarDayElement>(
      "sbb-calendar-day[slot='2023-01-30']",
    )!;
    expect(firstDisabledMaxDate).to.have.attribute('disabled');
    expect(elementInternals.get(firstDisabledMaxDate)?.ariaDisabled).to.be.equal('true');
  });

  /**
   * In both tests, the selected date is 08.04.2025; this month has 5 weeks (14-18)
   */
  describe('with week-numbers', () => {
    describe('horizontal', () => {
      it('renders', async () => {
        const calendar: HTMLElement = await fixture(
          html`<sbb-calendar selected="2025-04-08T00:00:00" week-numbers></sbb-calendar>`,
        );
        // In horizontal variant, the first cell of each row is the one with the week number
        const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
        const cells = Array.from(rows).map((e) => e.querySelector('td')!);
        expect(cells.length).to.be.equal(5);
        expect(cells[0].querySelector('span')!.textContent!.trim()).to.be.equal('14');
        expect(cells[1].querySelector('span')!.textContent!.trim()).to.be.equal('15');
        expect(cells[4].querySelector('span')!.textContent!.trim()).to.be.equal('18');
      });

      it('renders multiple', async () => {
        const calendar: HTMLElement = await fixture(
          html`<sbb-calendar selected="2025-04-08T00:00:00" week-numbers multiple></sbb-calendar>`,
        );
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

        // In horizontal variant, the first cell of each row is the one with the week number
        const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
        const cells = Array.from(rows).map((e) => e.querySelector('td')!);
        expect(cells.length).to.be.equal(5);
        // Due to the multiple property, cells have buttons instead than span.
        expect(cells[0].querySelector('span')).to.be.null;
        // The first button is the weekday button (14th week, days from Apr 1 to Apr 6
        const firstButton = cells[0].querySelector('button')!;
        expect(firstButton).not.to.be.null;
        expect(firstButton.textContent!.trim()).to.be.equal('14');
        // Adding / removing days is done without the use of ctrl/cmd
        firstButton.click();
        await selectedSpy.calledOnce();
        let selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun Apr 06 2025');
        // If the same button is clicked twice, days are removed
        firstButton.click();
        expect(selectedSpy.calledTimes(2));
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(1);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');

        // With the first row selected, add the second one
        const secondButton = cells[1].querySelector('button')!;
        firstButton.click();
        secondButton.click();
        await selectedSpy.calledTimes(4);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(13);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Mon Apr 07 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');

        // Click on Wed button: all missing Wednesdays are added
        const header = calendar.shadowRoot!.querySelectorAll('thead th')!;
        const headerButtons = Array.from(header).map((e) => e.querySelector('button')!);
        expect(headerButtons.length).to.be.equal(8);
        headerButtons[3].click();
        await selectedSpy.calledTimes(5);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(16);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Mon Apr 07 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');
        expect(selectedDates[13].toDateString()).to.be.equal('Wed Apr 16 2025');
        expect(selectedDates[14].toDateString()).to.be.equal('Wed Apr 23 2025');
        expect(selectedDates[15].toDateString()).to.be.equal('Wed Apr 30 2025');

        // Click again on Wed button: all Wednesdays are removed
        headerButtons[3].click();
        await selectedSpy.calledTimes(6);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(11);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[10].toDateString()).to.be.equal('Sun Apr 13 2025');

        // Click on a single day to add it
        const thirdRowButtons = rows[2].querySelectorAll<SbbCalendarDayElement>('sbb-calendar-day');
        thirdRowButtons[5].click();
        await selectedSpy.calledTimes(7);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(12);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[11].toDateString()).to.be.equal('Sat Apr 19 2025');

        // Click on a single day to remove it
        const secondRowButtons =
          rows[1].querySelectorAll<SbbCalendarDayElement>('sbb-calendar-day');
        secondRowButtons[1].click();
        await selectedSpy.calledTimes(8);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(11);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
      });

      it('renders multiple wide', async () => {
        await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
        const calendar: HTMLElement = await fixture(
          html`<sbb-calendar
            selected="2025-04-08T00:00:00"
            wide
            week-numbers
            multiple
          ></sbb-calendar>`,
        );
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

        // In horizontal variant, the first cell of each row is the one with the week number
        const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
        const cells = Array.from(rows).map((e) => e.querySelector('td')!);
        // In wide mode, we have two months displayed, so we have to consider the number of weeks in April and May
        expect(cells.length).to.be.equal(10);
        expect(cells[0].querySelector('button')!.textContent!.trim()).to.be.equal('14');
        expect(cells[1].querySelector('button')!.textContent!.trim()).to.be.equal('15');
        expect(cells[4].querySelector('button')!.textContent!.trim()).to.be.equal('18');
        expect(cells[5].querySelector('button')!.textContent!.trim()).to.be.equal('18');
        expect(cells[9].querySelector('button')!.textContent!.trim()).to.be.equal('22');

        // Clicking on the last week button must select all the days of the week, including the ones in the next month
        const lastButtonFirstMonth = cells[4].querySelector('button')!;
        lastButtonFirstMonth.click();
        await selectedSpy.calledOnce();
        let selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(8);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Sun May 04 2025');

        // Clicking on the first week button in the next month should not change the selection,
        // since the dates are the same as before
        const firstButtonSecondMonth = cells[5].querySelector('button')!;
        firstButtonSecondMonth.click();
        expect(selectedSpy.calledTimes(2));
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(1);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');

        // Clicks on the first button of the first month does not select dates in the previous (not rendered) one
        const firstButton = cells[0].querySelector('button')!;
        firstButton.click();
        await selectedSpy.calledTimes(3);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun Apr 06 2025');

        // Clicking again on the first button of the second month will select dates in the last week of the previous month
        firstButtonSecondMonth.click();
        await selectedSpy.calledTimes(4);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(14);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun Apr 06 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[9].toDateString()).to.be.equal('Wed Apr 30 2025');
        expect(selectedDates[10].toDateString()).to.be.equal('Thu May 01 2025');
        expect(selectedDates[13].toDateString()).to.be.equal('Sun May 04 2025');
      });
    });

    describe('vertical', () => {
      it('renders', async () => {
        const calendar: HTMLElement = await fixture(
          html`<sbb-calendar
            orientation="vertical"
            selected="2025-04-08T00:00:00"
            week-numbers
          ></sbb-calendar>`,
        );
        // In vertical variant, there's a table header with the week numbers as cells
        const thead = calendar.shadowRoot!.querySelector('thead');
        expect(thead).not.to.be.null;
        // Due to the presence of an empty cell along the week days, the cells are 6 and not 5
        const cells = thead!.querySelectorAll('th');
        expect(cells.length).to.be.equal(6);
        // The first cell is empty
        expect(cells[0].className).to.be.equal('sbb-calendar__table-data');
        expect(cells[0].querySelector('span')).to.be.null;
        expect(cells[1].querySelector('span')!.textContent!.trim()).to.be.equal('14');
        expect(cells[2].querySelector('span')!.textContent!.trim()).to.be.equal('15');
        expect(cells[5].querySelector('span')!.textContent!.trim()).to.be.equal('18');
      });

      it('renders multiple', async () => {
        const calendar: HTMLElement = await fixture(
          html`<sbb-calendar
            selected="2025-04-08T00:00:00"
            orientation="vertical"
            week-numbers
            multiple
          ></sbb-calendar>`,
        );
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

        // In vertical variant, there's a table header with the week numbers as cells
        const thead = calendar.shadowRoot!.querySelector('thead');
        expect(thead).not.to.be.null;
        // Due to the presence of an empty cell along the week days, the cells are 6 and not 5
        const cells = thead!.querySelectorAll('th');
        expect(cells.length).to.be.equal(6);
        // Due to the multiple property, cells have buttons instead than span.
        expect(cells[1].querySelector('span')).to.be.null;
        const firstButton = cells[1].querySelector('button')!;
        expect(firstButton).not.to.be.null;
        expect(firstButton.textContent!.trim()).to.be.equal('14');
        firstButton.click();
        await selectedSpy.calledOnce();
        let selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun Apr 06 2025');
        // if the same button is clicked twice, dates are removed
        firstButton.click();
        expect(selectedSpy.calledTimes(2));
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(1);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');

        // With the first row selected, add the second one
        const secondButton = cells[2].querySelector('button')!;
        firstButton.click();
        secondButton.click();
        await selectedSpy.calledTimes(4);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(13);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Mon Apr 07 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');

        // Click on Wed button: all missing Wednesdays are added
        const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
        const weekDayCells: HTMLButtonElement[] = Array.from(rows).map(
          (e) => e.querySelector('td button')!,
        );
        expect(weekDayCells.length).to.be.equal(7);
        weekDayCells[2].click();
        await selectedSpy.calledTimes(5);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(16);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');
        expect(selectedDates[13].toDateString()).to.be.equal('Wed Apr 16 2025');
        expect(selectedDates[14].toDateString()).to.be.equal('Wed Apr 23 2025');
        expect(selectedDates[15].toDateString()).to.be.equal('Wed Apr 30 2025');

        // Click again on Wed button: all Wednesdays are removed
        weekDayCells[2].click();
        await selectedSpy.calledTimes(6);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(11);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Thu Apr 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Mon Apr 07 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Thu Apr 10 2025');
        expect(selectedDates[10].toDateString()).to.be.equal('Sun Apr 13 2025');

        // Click on a single day to add it
        const thirdRowButtons = rows[2].querySelectorAll<SbbCalendarDayElement>('sbb-calendar-day');
        thirdRowButtons[4].click();
        await selectedSpy.calledTimes(7);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(12);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[11].toDateString()).to.be.equal('Wed Apr 30 2025');

        // Click on a single day to remove it
        const secondRowButtons =
          rows[1].querySelectorAll<SbbCalendarDayElement>('sbb-calendar-day');
        secondRowButtons[1].click();
        await selectedSpy.calledTimes(8);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(11);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
      });

      it('renders multiple wide', async () => {
        await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
        const calendar: HTMLElement = await fixture(
          html` <sbb-calendar
            selected="2025-04-08T00:00:00"
            orientation="vertical"
            week-numbers
            multiple
            wide
          ></sbb-calendar>`,
        );
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

        // In vertical variant, there's a table header with the week numbers as cells
        const thead = calendar.shadowRoot!.querySelectorAll('thead');
        // In wide variant we have two tables with two separate headers
        expect(thead.length).to.be.equal(2);
        // The first header has a cell more than the second above the weekdays
        const cellsPrev = thead[0].querySelectorAll('th');
        expect(cellsPrev.length).to.be.equal(6);
        const cellsNext = thead[1].querySelectorAll('th');
        expect(cellsNext.length).to.be.equal(5);
        expect(cellsPrev[1].querySelector('button')!.textContent!.trim()).to.be.equal('14');
        expect(cellsPrev[2].querySelector('button')!.textContent!.trim()).to.be.equal('15');
        expect(cellsPrev[5].querySelector('button')!.textContent!.trim()).to.be.equal('18');
        expect(cellsNext[0].querySelector('button')!.textContent!.trim()).to.be.equal('18');
        expect(cellsNext[1].querySelector('button')!.textContent!.trim()).to.be.equal('19');
        expect(cellsNext[4].querySelector('button')!.textContent!.trim()).to.be.equal('22');

        // Clicking on the last week button must select all the days of the week, including the ones in the next month
        const lastButtonFirstMonth = cellsPrev[5].querySelector('button')!;
        lastButtonFirstMonth.click();
        await selectedSpy.calledOnce();
        let selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(8);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Sun May 04 2025');

        // Clicking on the first week button in the next month should not change the selection,
        // since the dates are the same as before
        const firstButtonSecondMonth = cellsNext[0].querySelector('button')!;
        firstButtonSecondMonth.click();
        expect(selectedSpy.calledTimes(2));
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(1);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');

        // Clicks on the first button of the first month does not select dates in the previous (not rendered) one
        const firstButton = cellsPrev[1].querySelector('button')!;
        firstButton.click();
        await selectedSpy.calledTimes(3);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun Apr 06 2025');

        // Clicking again on the first button of the second month will select dates in the last week of the previous month
        firstButtonSecondMonth.click();
        await selectedSpy.calledTimes(4);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(14);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[2].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun Apr 06 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[8].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[13].toDateString()).to.be.equal('Sun May 04 2025');
      });
    });
  });
});
