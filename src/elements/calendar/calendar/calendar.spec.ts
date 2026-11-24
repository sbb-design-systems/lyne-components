import { assert, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { type SinonStub, stub } from 'sinon';

import type { SbbSecondaryButtonElement } from '../../button.ts';
import {
  elementInternalsSpy,
  fixture,
  sbbBreakpointLargeMinPx,
  tabKey,
} from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import {
  defaultDateAdapter,
  i18nCalendarDateSelection,
  i18nCalendarDeselectAll,
  i18nCalendarDeselectWeek,
  i18nCalendarDeselectWeekday,
  i18nCalendarSelectAll,
  i18nCalendarSelectWeek,
  i18nCalendarSelectWeekday,
} from '../../core.ts';
import { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';
import {
  createPrice,
  createSlottedDays,
  monthChangeHandler,
} from '../calendar-day/calendar-day.helper.private.ts';
import type { SbbCalendarMonthElement } from '../calendar-month/calendar-month.component.ts';
import type { SbbCalendarSelectAllElement } from '../calendar-select-all/calendar-select-all.component.ts';
import type { SbbCalendarWeekdayElement } from '../calendar-weekday/calendar-weekday.component.ts';
import type { SbbCalendarWeeknumberElement } from '../calendar-weeknumber/calendar-weeknumber.component.ts';
import type { SbbCalendarYearElement } from '../calendar-year/calendar-year.component.ts';

import type { SbbDateSelectedEvent, SbbMonthChangeEvent } from './calendar.component.ts';
import { SbbCalendarElement } from './calendar.component.ts';

import '../../button.ts';
import '../../calendar.ts';

const toIso8601 = (date: Date): string => defaultDateAdapter.toIso8601(date);
const yearButtonSelector = '.sbb-calendar__day-view [icon-name="chevron-small-up-small"]';
const returnFromMonthViewSelector =
  '.sbb-calendar__month-view [icon-name="chevron-small-down-small"]';
const returnFromYearViewSelector =
  '.sbb-calendar__year-view [icon-name="chevron-small-down-small"]';

describe(`sbb-calendar`, () => {
  const elementInternals = elementInternalsSpy();
  let todayStub: SinonStub;
  let today: Date | null = null;

  const getDayCells = (element: SbbCalendarElement): SbbCalendarDayElement[] => {
    return Array.from(element.shadowRoot!.querySelectorAll('slot')).flatMap((e) =>
      e.assignedElements({ flatten: true }),
    ) as SbbCalendarDayElement[];
  };

  const getYearActiveElementText: () => string = () =>
    (document.activeElement!.shadowRoot!.activeElement as SbbCalendarYearElement).shadowRoot!
      .textContent;

  const getDayActiveElementValue: () => string | null = () => {
    if (document.activeElement instanceof SbbCalendarDayElement) {
      return toIso8601(document.activeElement.value);
    } else if (document.activeElement instanceof SbbCalendarElement) {
      return toIso8601(
        (document.activeElement!.shadowRoot!.activeElement as SbbCalendarDayElement).value!,
      );
    }
    return null;
  };

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').callsFake(
      () => today ?? new Date(2023, 9, 10, 0, 0, 0, 0),
    );
  });

  after(() => {
    todayStub.restore();
  });

  ['default', 'enhanced', 'mixed'].forEach((variant) => {
    let element: SbbCalendarElement;

    describe(variant, async () => {
      before(() => {
        today = new Date(2023, 0, 10, 0, 0, 0, 0);
      });

      after(() => {
        today = null;
      });

      describe('horizontal', () => {
        beforeEach(async () => {
          let template;
          switch (variant) {
            case 'enhanced': {
              template = html` <sbb-calendar
                value="2023-01-15"
                @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e, true)}
              >
              </sbb-calendar>`;
              break;
            }
            case 'mixed': {
              template = html` <sbb-calendar value="2023-01-15">
                <sbb-calendar-day slot=${toIso8601(new Date('2023-01-05'))}>
                  ${createPrice(true)}
                </sbb-calendar-day>
              </sbb-calendar>`;
              break;
            }
            default: {
              template = html`<sbb-calendar value="2023-01-15"></sbb-calendar>`;
              break;
            }
          }

          element = await fixture(template);
        });

        it('renders', async () => {
          assert.instanceOf(element, SbbCalendarElement);
        });

        it('highlights current day', async () => {
          const currentDayButton = getDayCells(element).find((e) =>
            e.matches('sbb-calendar-day[slot="2023-01-10"]'),
          );
          expect(currentDayButton).to.match(':state(current)');
        });

        it('renders and navigates to next month', async () => {
          let day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

          const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
            'sbb-secondary-button[icon-name="chevron-small-right-small"]',
          )!;
          nextMonthButton.click();
          await waitForLitRender(element);

          // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
          day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-02-01');
        });

        it('renders and navigates to previous month', async () => {
          let day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

          const prevMonthButton: HTMLElement = element.shadowRoot!.querySelector(
            'sbb-secondary-button[icon-name="chevron-small-left-small"]',
          )!;
          prevMonthButton.click();
          await waitForLitRender(element);

          // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
          day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2022-12-01');
        });

        it('sets max and next month button gets disabled', async () => {
          element.max = new Date('2023-01-29');
          await waitForLitRender(element);

          let day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

          const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
            'sbb-secondary-button[icon-name="chevron-small-right-small"]',
          )!;
          expect(nextMonthButton).to.have.attribute('disabled');
          nextMonthButton.click();
          await waitForLitRender(element);

          // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
          day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');
        });

        it('sets min and previous month button gets disabled', async () => {
          element.min = new Date('2023-01-15');
          await waitForLitRender(element);

          let day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');

          const nextMonthButton = element.shadowRoot!.querySelector(
            'sbb-secondary-button[icon-name="chevron-small-left-small"]',
          ) as HTMLElement;
          expect(nextMonthButton).to.have.attribute('disabled');
          nextMonthButton.click();
          await waitForLitRender(element);

          // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
          day = getDayCells(element)[0];
          expect(await day.getAttribute('slot')).to.be.equal('2023-01-01');
        });

        it('selects a different date', async () => {
          const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
          const selectedDate = getDayCells(element).find((e) =>
            e.matches('sbb-calendar-day[slot="2023-01-15"]'),
          )!;

          expect(selectedDate).to.match(':state(selected)');

          const newSelectedDate = getDayCells(element).find((e) =>
            e.matches('sbb-calendar-day[slot="2023-01-18"]'),
          )!;
          expect(newSelectedDate).not.to.match(':state(selected)');
          newSelectedDate.click();
          await selectedSpy.calledOnce();

          expect(selectedDate).not.to.match(':state(selected)');
          expect(newSelectedDate).to.match(':state(selected)');
          expect(selectedSpy.count).to.be.greaterThan(0);
        });

        it('select day', async () => {
          const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

          const day = getDayCells(element).find((e) =>
            e.matches('sbb-calendar-day[slot="2023-01-28"]'),
          )!;
          expect(day).not.to.match(':state(selected)');
          day.click();
          await waitForLitRender(element);

          expect(day).to.match(':state(selected)');
          expect(selectedSpy.count).to.be.equal(1);
        });

        if (variant === 'enhanced') {
          it('select day with span click', async () => {
            const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

            const day = getDayCells(element).find((e) =>
              e.matches('sbb-calendar-day[slot="2023-01-28"]'),
            )!;
            const extraContent = day.querySelector('span')!;

            expect(day).not.to.match(':state(selected)');
            extraContent.click();
            await waitForLitRender(element);

            expect(day).to.match(':state(selected)');
            expect(selectedSpy.count).to.be.equal(1);
          });
        }

        it("clicks on disabled day and doesn't change selection", async () => {
          const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

          element.max = new Date('2023-01-29');
          await waitForLitRender(element);

          const day = getDayCells(element).find((e) =>
            e.matches('sbb-calendar-day[slot="2023-01-30"]'),
          )!;
          expect(day).to.have.attribute('disabled');
          expect(day).not.to.match(':state(selected)');
          day.click();
          await waitForLitRender(element);

          expect(day).not.to.match(':state(selected)');
          expect(selectedSpy.count).not.to.be.greaterThan(0);
        });

        it('changes to year and month selection views', async () => {
          const yearSelectionButton: HTMLElement =
            element.shadowRoot!.querySelector(yearButtonSelector)!;

          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForLitRender(element);

          const yearSelection: HTMLElement = element.shadowRoot!.querySelector(
            returnFromYearViewSelector,
          )!;
          expect(yearSelection).not.to.be.null;
          expect(yearSelection).dom.to.be.equal(`
            <sbb-secondary-button class="sbb-calendar__control" icon-name="chevron-small-down-small" size="s" tabindex="0">
            </sbb-secondary-button>
          `);
          expect(elementInternals.get(yearSelection)?.ariaLabel).to.be.equals(
            i18nCalendarDateSelection.en,
          );

          const yearCells: SbbCalendarYearElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
          );
          expect(yearCells.length).to.be.equal(24);
          expect(yearCells[0].value).to.be.equal('2016');
          expect(yearCells[yearCells.length - 1].value).to.be.equal('2039');

          const yearButton = element.shadowRoot!.querySelector<SbbCalendarYearElement>(
            '.sbb-calendar__year-view :state(selected)',
          )!;
          expect(yearButton.value).to.be.equal('2023');
          yearButton.click();
          await waitForLitRender(element);

          const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
            returnFromMonthViewSelector,
          )!;
          expect(monthSelection).not.to.be.null;
          expect(monthSelection).dom.to.be.equal(`
            <sbb-secondary-button  class="sbb-calendar__control" icon-name="chevron-small-down-small" size="s" tabindex="0">
            </sbb-secondary-button>
          `);
          expect(elementInternals.get(monthSelection)?.ariaLabel).to.be.equals(
            i18nCalendarDateSelection.en,
          );

          const monthCells: SbbCalendarMonthElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          expect(monthCells[0].value).to.be.equal(`2023-01`);
          expect(monthCells[0].shadowRoot!.textContent).to.be.equal(`Jan`);
          monthCells[0].click();
          await waitForLitRender(element);

          await waitForLitRender(element);

          const dayCells: SbbCalendarDayElement[] = getDayCells(element);
          expect(dayCells.length).to.be.equal(31);
          expect(toIso8601(new Date(dayCells[0].value!))).to.be.equal('2023-01-01');
        });

        it('reset view if day is not selected when year/month are changed', async () => {
          // We move from Dec 2023 to Sep 2030
          const yearSelectionButton: HTMLElement =
            element.shadowRoot!.querySelector(yearButtonSelector)!;
          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForLitRender(element);

          const yearButtonArray: SbbCalendarYearElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
          );
          const yearButton = yearButtonArray.find((e) => e.value === '2030')!;
          expect(yearButton).not.to.be.null;
          yearButton.click();
          await waitForLitRender(element);

          const monthCells: SbbCalendarMonthElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          monthCells[8].click();
          await waitForLitRender(element);
          await waitForLitRender(element);

          const dayCells = getDayCells(element);
          expect(dayCells.length).to.be.equal(30);
          expect(toIso8601(new Date(dayCells[0].value!))).to.be.equal('2030-09-01');

          // Without selecting a day, change to the year view
          yearSelectionButton.click();
          await waitForLitRender(element);
          // Go back to day view again by clicking once more
          const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
            returnFromYearViewSelector,
          )!;
          monthSelection.click();
          await waitForLitRender(element);
          // We expect to be in the month of the selected day (Dec 2023)
          const dayCells2 = getDayCells(element);
          expect(dayCells2.length).to.be.equal(31);
          expect(toIso8601(new Date(dayCells2[0].value!))).to.be.equal('2023-01-01');
        });

        it('clamps day when selecting a month shorter than the current active day (e.g. March 31 → February)', async () => {
          // Set up calendar with March 31, 2023 as the selected value
          element = await fixture(html`<sbb-calendar value="2023-03-31"></sbb-calendar>`);

          // Go to year selection
          const yearSelectionButton: HTMLElement =
            element.shadowRoot!.querySelector(yearButtonSelector)!;
          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForLitRender(element);

          // Select year 2022
          const yearButtonArray: SbbCalendarYearElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
          );
          const year2022Button = yearButtonArray.find((e) => e.value === '2022')!;
          expect(year2022Button).not.to.be.null;
          year2022Button.click();
          await waitForLitRender(element);

          // Select February (index 1, February 2022 has only 28 days)
          // This must NOT throw "Invalid day '31' for month '2'"
          const monthCells: SbbCalendarMonthElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          expect(monthCells[1].value).to.be.equal('2022-02');
          monthCells[1].click();
          await waitForLitRender(element);

          // Calendar should show February 2022 (28 days), no exception thrown
          const dayCells = getDayCells(element);
          expect(dayCells.length).to.be.equal(28);
          expect(toIso8601(new Date(dayCells[0].value!))).to.be.equal('2022-02-01');
        });

        it('clamps day when selecting a year where the current month/day is invalid (e.g. Feb 29 leap year → non-leap year)', async () => {
          // Set up calendar with February 29, 2024 (leap year)
          element = await fixture(html`<sbb-calendar value="2024-02-29"></sbb-calendar>`);

          // Go to year selection
          const yearSelectionButton: HTMLElement =
            element.shadowRoot!.querySelector(yearButtonSelector)!;
          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForLitRender(element);

          // Select year 2023 (non-leap year) — must NOT throw when transitioning to month view
          const yearButtonArray: SbbCalendarYearElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
          );
          const year2023Button = yearButtonArray.find((e) => e.value === '2023')!;
          expect(year2023Button).not.to.be.null;
          year2023Button.click();
          await waitForLitRender(element);

          // Month view should be visible; now select February
          const monthCells: SbbCalendarMonthElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          expect(monthCells[1].value).to.be.equal('2023-02');
          monthCells[1].click();
          await waitForLitRender(element);

          // Calendar should show February 2023 (28 days), day clamped from 29 → 28
          const dayCells = getDayCells(element);
          expect(dayCells.length).to.be.equal(28);
          expect(toIso8601(new Date(dayCells[0].value!))).to.be.equal('2023-02-01');
        });

        it('clamps day when navigating to a previous year in month view with a day that would be invalid (e.g. Feb 29 leap year → non-leap year)', async () => {
          // Calendar starts directly in month view with Feb 29, 2024 (leap year).
          // _activeDate is set to the value, so _activeDate.day = 29.
          element = await fixture(
            html`<sbb-calendar value="2024-02-29" view="month"></sbb-calendar>`,
          );

          // The month view is already shown for year 2024.
          // Click the left arrow (previous year) → _goToDifferentYear(-1)
          const prevYearButton: HTMLElement = element.shadowRoot!.querySelector(
            '.sbb-calendar__month-view [icon-name="chevron-small-left-small"]',
          )!;
          expect(prevYearButton).not.to.be.null;
          prevYearButton.click();
          await waitForLitRender(element);

          // Month view should now show 2023; no exception must have been thrown.
          // Select February (index 1).
          const monthCells: SbbCalendarMonthElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          expect(monthCells[1].value).to.be.equal('2023-02');
          monthCells[1].click();
          await waitForLitRender(element);
          await waitForLitRender(element);

          // Calendar should show February 2023 (28 days), no exception thrown.
          const dayCells = getDayCells(element);
          expect(dayCells.length).to.be.equal(28);
          expect(toIso8601(new Date(dayCells[0].value!))).to.be.equal('2023-02-01');
        });

        describe('focusing', () => {
          before(() => {
            today = new Date(2023, 9, 15, 0, 0, 0, 0);
          });

          after(() => {
            today = null;
          });

          it('focuses current day', async () => {
            element = await fixture(html`
              <sbb-calendar>
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? createSlottedDays(2023, 10, true)
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2023-10-15'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);

            // Open year selection
            const yearSelectionButton =
              element.shadowRoot!.querySelector<HTMLElement>(yearButtonSelector)!;
            yearSelectionButton.click();
            await waitForLitRender(element);

            // Select same year
            const yearButtonArray: SbbCalendarYearElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
            );
            const year2023Button = yearButtonArray.find((e) => e.value === '2023')!;
            year2023Button.click();
            await waitForLitRender(element);

            const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
              returnFromMonthViewSelector,
            )!;
            expect(monthSelection).not.to.be.null;

            const monthButtonArray: SbbCalendarMonthElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
            );
            const october2023Button = monthButtonArray.find((e) => e.value === '2023-10')!;
            expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(
              october2023Button,
            );

            october2023Button.click();
            await waitForLitRender(element);

            const selectedDayButton = getDayCells(element).find((e) =>
              e.matches('sbb-calendar-day[slot="2023-10-15"]'),
            )!;

            expect(
              variant === 'default'
                ? document.activeElement!.shadowRoot!.activeElement
                : document.activeElement,
            ).to.be.equal(selectedDayButton);
          });

          it('focuses selected month when selecting same year', async function (this: Mocha.Context) {
            // Flaky on Firefox
            this.retries(3);

            element.value = new Date('2023-10-15');
            await waitForLitRender(element);

            // Open year selection
            const yearSelectionButton =
              element.shadowRoot!.querySelector<HTMLElement>(yearButtonSelector)!;
            yearSelectionButton.click();
            await waitForLitRender(element);

            // Select same year
            const yearButtonArray: SbbCalendarYearElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
            );
            const year2023Button = yearButtonArray.find((e) => e.value === '2023')!;
            expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(year2023Button);

            year2023Button.click();
            await waitForLitRender(element);

            // Check that we're in month selection view
            const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
              returnFromMonthViewSelector,
            )!;
            expect(monthSelection).not.to.be.null;

            const monthButtonArray: SbbCalendarMonthElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
            );
            const october2023Button = monthButtonArray.find((e) => e.value === '2023-10')!;
            expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(
              october2023Button,
            );

            october2023Button.click();
            await waitForLitRender(element);

            const selectedDayButton = getDayCells(element).find((e) =>
              e.matches('sbb-calendar-day[slot="2023-10-15"]'),
            )!;

            expect(
              variant === 'enhanced'
                ? document.activeElement
                : document.activeElement!.shadowRoot!.activeElement,
            ).to.be.equal(selectedDayButton);
          });

          it('focuses first month when selecting different year', async function (this: Mocha.Context) {
            // Flaky on Firefox
            this.retries(3);

            element.value = new Date('2023-10-15');
            await waitForLitRender(element);

            // Open year selection
            const yearSelectionButton =
              element.shadowRoot!.querySelector<HTMLElement>(yearButtonSelector)!;
            yearSelectionButton.click();
            await waitForLitRender(element);

            // Select a different year (2024, not the current year 2023)
            const yearButtonArray: SbbCalendarYearElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
            );
            const yearButton = yearButtonArray.find((e) => e.value === '2024')!;
            yearButton.click();
            await waitForLitRender(element);

            // Check that we're in month selection view
            const monthSelection = element.shadowRoot!.querySelector<HTMLElement>(
              returnFromMonthViewSelector,
            )!;
            expect(monthSelection).not.to.be.null;

            // Check that the first month (January) has tabindex="0" (is focused)
            const monthButtonArray: SbbCalendarMonthElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
            );
            const january2024Button = monthButtonArray.find((e) => e.value === '2024-01')!;
            expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(
              january2024Button,
            );
            january2024Button.click();
            await waitForLitRender(element);

            const selectedDayButton = getDayCells(element).find((e) =>
              e.matches('sbb-calendar-day[slot="2024-01-01"]'),
            )!;

            expect(
              variant === 'enhanced'
                ? document.activeElement
                : document.activeElement!.shadowRoot!.activeElement,
            ).to.be.equal(selectedDayButton);
          });
        });

        it('avoids taking focus on updating', async () => {
          document.body.focus();
          expect(document.activeElement).to.be.equal(document.body);

          // Trigger an update which triggers updated().
          element.amount = 2;
          await waitForLitRender(element);

          expect(document.activeElement).to.be.equal(document.body);
        });

        it('keeps focus on updating', async () => {
          const activeElement =
            variant === 'enhanced'
              ? element.querySelector<SbbCalendarDayElement>('sbb-calendar-day[slot="2023-01-15"]')!
              : element;
          element.focus();
          expect(document.activeElement).to.be.equal(activeElement);

          // Trigger an update which triggers updated().
          element.amount = 2;
          await waitForLitRender(element);

          expect(document.activeElement).to.be.equal(activeElement);
        });

        it('restores focus into year view after focusing out and back in', async () => {
          const outsideButton = document.createElement('button');
          element.parentElement!.append(outsideButton);

          // Navigate to year view
          const yearSelectionButton =
            element.shadowRoot!.querySelector<HTMLElement>(yearButtonSelector)!;
          yearSelectionButton.focus();
          await sendKeys({ press: 'Enter' });
          await waitForLitRender(element);

          expect(element.shadowRoot!.querySelector('.sbb-calendar__year-view')).not.to.be.null;

          // Focus out of calendar
          await sendKeys({ press: tabKey });
          await waitForLitRender(element);
          expect(document.activeElement).to.be.equal(outsideButton);
          expect(element).not.to.have.attribute('tabindex');

          // Focus back into the calendar
          await sendKeys({ press: `Shift+${tabKey}` });
          await waitForLitRender(element);

          // The focused element should now be a year cell inside the calendar
          const focusedYear = element.shadowRoot!.querySelector<SbbCalendarYearElement>(
            'sbb-calendar-year[tabindex="0"]',
          );
          expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(focusedYear);
        });

        it('does not create horizontal scrollbar when calendar is 100% width in overflow container', async () => {
          const container = document.createElement('div');
          container.style.width = '400px';
          container.style.overflow = 'auto';
          document.body.appendChild(container);

          const testElement = document.createElement('sbb-calendar');
          testElement.style.width = '100%';
          container.appendChild(testElement);

          await waitForLitRender(testElement);

          // ScrollWidth should equal clientWidth if there's no horizontal scroll
          expect(container.scrollWidth).to.be.equal(container.clientWidth);

          // Cleanup
          document.body.removeChild(container);
        });

        it('opens year view', async () => {
          element.view = 'year';
          await waitForLitRender(element);

          expect(element.shadowRoot!.querySelector('.sbb-calendar__year-view')).not.to.be.null;
        });

        it('opens month view', async () => {
          element.view = 'month';
          await waitForLitRender(element);

          expect(element.shadowRoot!.querySelector('.sbb-calendar__month-view')).not.to.be.null;
          expect(
            element
              .shadowRoot!.querySelector(
                '.sbb-calendar__month-view .sbb-calendar__table-header span',
              )!
              .textContent!.trim(),
          ).to.be.equal('2023');
        });

        it('opens month view with selected date', async () => {
          element.value = new Date('2017-01-22');
          element.view = 'month';
          await waitForLitRender(element);

          expect(
            element
              .shadowRoot!.querySelector(
                '.sbb-calendar__month-view .sbb-calendar__table-header span',
              )!
              .textContent!.trim(),
          ).to.be.equal('2017');
        });

        it('opens month view with current date', async () => {
          element.value = null;
          element.view = 'month';
          await waitForLitRender(element);

          expect(
            element
              .shadowRoot!.querySelector(
                '.sbb-calendar__month-view .sbb-calendar__table-header span',
              )!
              .textContent!.trim(),
          ).to.be.equal('2023');
        });

        describe('shift click', () => {
          it('should select multiple dates with shift click', async () => {
            element.multiple = true;
            element.value = [];

            const days = getDayCells(element);
            const initialDayButton = days.find((e) => e.slot === '2023-01-10');

            initialDayButton!.click();
            expect(element.value.length).to.be.equal(1);
            expect(toIso8601(element.value[0])).to.be.equal('2023-01-10');

            const lastDayButton = days.find((e) => e.slot === '2023-01-20');
            const shiftClickEvent = new MouseEvent('click', {
              shiftKey: true,
              bubbles: true,
              composed: true,
            });
            lastDayButton!.dispatchEvent(shiftClickEvent);

            expect(element.value.length).to.be.equal(11);
            expect(toIso8601(element.value[0])).to.be.equal('2023-01-10');
            expect(toIso8601(element.value[element.value.length - 1])).to.be.equal('2023-01-20');
          });

          it('should select multiple dates with shift click in the past', async () => {
            element.multiple = true;
            element.value = [];

            const days = getDayCells(element);
            const initialDayButton = days.find((e) => e.slot === '2023-01-20');

            initialDayButton!.click();
            expect(element.value.length).to.be.equal(1);
            expect(toIso8601(element.value[0])).to.be.equal('2023-01-20');

            const lastDayButton = days.find((e) => e.slot === '2023-01-10');
            const shiftClickEvent = new MouseEvent('click', {
              shiftKey: true,
              bubbles: true,
              composed: true,
            });
            lastDayButton!.dispatchEvent(shiftClickEvent);

            expect(element.value.length).to.be.equal(11);
            expect(toIso8601(element.value[0])).to.be.equal('2023-01-10');
            expect(toIso8601(element.value[element.value.length - 1])).to.be.equal('2023-01-20');
          });
        });

        describe('keyboard navigation', () => {
          it('it should focus on the selected date if it is in the view', () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
          });

          it('it should focus on the first of the month if selected date is not in the view', async () => {
            const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
              'sbb-secondary-button[icon-name="chevron-small-right-small"]',
            )!;
            nextMonthButton.click();
            await waitForLitRender(element);
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-02-01');
          });

          it('it should not navigate when unmapped keys are pressed', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'a' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: '1' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
          });

          it('it should not navigate out of bounds', async () => {
            element.focus();
            // go to upper bound
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
            // no navigation before
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
            // go to lower bound
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
            // no navigation after
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-14');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-16');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-08');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-22');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-29');
          });
        });

        it('returns the visible days and updates them after navigation', async () => {
          const expectedJanuaryDays = Array.from(
            { length: 31 },
            (_, index) => `2023-01-${String(index + 1).padStart(2, '0')}`,
          );
          expect(element.visibleDays().map((day) => day.value)).to.deep.equal(expectedJanuaryDays);

          const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
            'sbb-secondary-button[icon-name="chevron-small-right-small"]',
          )!;
          nextMonthButton.click();
          await waitForLitRender(element);

          const expectedFebruaryDays = Array.from(
            { length: 28 },
            (_, index) => `2023-02-${String(index + 1).padStart(2, '0')}`,
          );
          expect(element.visibleDays().map((day) => day.value)).to.deep.equal(expectedFebruaryDays);
        });
      });

      describe('vertical', () => {
        beforeEach(async () => {
          let template;
          switch (variant) {
            case 'enhanced': {
              template = html` <sbb-calendar
                value="2023-01-15"
                orientation="vertical"
                @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e, true)}
              >
              </sbb-calendar>`;
              break;
            }
            case 'mixed': {
              template = html` <sbb-calendar value="2023-01-15" orientation="vertical">
                <sbb-calendar-day slot=${toIso8601(new Date('2023-01-05'))}>
                  ${createPrice(true)}
                </sbb-calendar-day>
              </sbb-calendar>`;
              break;
            }
            default: {
              template = html`<sbb-calendar
                value="2023-01-15"
                orientation="vertical"
              ></sbb-calendar>`;
              break;
            }
          }

          element = await fixture(template);
        });

        it('renders', async () => {
          assert.instanceOf(element, SbbCalendarElement);
        });

        describe('keyboard navigation', () => {
          it('it should focus on the selected date if it is in the view', () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
          });

          it('it should focus on the first of the month if selected date is not in the view', async () => {
            const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
              'sbb-secondary-button[icon-name="chevron-small-right-small"]',
            )!;
            nextMonthButton.click();
            await waitForLitRender(element);
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-02-01');
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-08');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-22');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-14');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-16');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');

            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);

            expect(getDayActiveElementValue()).to.be.equal('2023-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-09');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
          });
        });
      });

      it('renders with min and max', async () => {
        element = await fixture(html`
          <sbb-calendar value="2023-01-20" min="2023-01-09" max="2023-01-29">
            ${
              variant === 'default'
                ? nothing
                : variant === 'enhanced'
                  ? createSlottedDays(2023, 1, true)
                  : html`
                      <sbb-calendar-day slot=${toIso8601(new Date('2023-01-22'))}>
                        ${createPrice(true)}
                      </sbb-calendar-day>
                    `
            }
          </sbb-calendar>
        `);

        const buttonPrevDay = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
          'sbb-secondary-button[icon-name="chevron-small-left-small"]',
        );
        expect(buttonPrevDay).to.have.attribute('disabled');
        const buttonNextDay = element.shadowRoot!.querySelector(
          'sbb-secondary-button[icon-name="chevron-small-right-small"]',
        );
        expect(buttonNextDay).to.have.attribute('disabled');

        const emptyCells = element.shadowRoot!.querySelectorAll('td:not(:has(slot))');
        expect(emptyCells.length).to.be.equal(6);

        const lastDisabledMinDate = getDayCells(element).find((e) =>
          e.matches("sbb-calendar-day[slot='2023-01-08']"),
        )!;
        expect(lastDisabledMinDate).to.have.attribute('disabled');
        expect(elementInternals.get(lastDisabledMinDate)?.ariaDisabled).to.be.equal('true');
        const firstNotDisabledMinDate = getDayCells(element).find((e) =>
          e.matches("sbb-calendar-day[slot='2023-01-09']"),
        )!;
        expect(firstNotDisabledMinDate).not.to.have.attribute('disabled');
        expect(elementInternals.get(firstNotDisabledMinDate)?.ariaDisabled).to.be.equal('false');

        const lastNotDisabledMaxDate = getDayCells(element).find((e) =>
          e.matches("sbb-calendar-day[slot='2023-01-29']"),
        )!;
        expect(lastNotDisabledMaxDate).not.to.have.attribute('disabled');
        expect(elementInternals.get(lastNotDisabledMaxDate)?.ariaDisabled).to.be.equal('false');
        const firstDisabledMaxDate = getDayCells(element).find((e) =>
          e.matches("sbb-calendar-day[slot='2023-01-30']"),
        )!;
        expect(firstDisabledMaxDate).to.have.attribute('disabled');
        expect(elementInternals.get(firstDisabledMaxDate)?.ariaDisabled).to.be.equal('true');
      });

      describe('wide', () => {
        beforeEach(async () => {
          await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
        });

        describe('horizontal', () => {
          it('changes to year and month selection views', async function () {
            // Flaky on WebKit
            this.retries(3);

            let template: TemplateResult;
            switch (variant) {
              case 'enhanced': {
                template = html`<sbb-calendar
                  value="2023-01-15"
                  amount="2"
                  @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e, true)}
                >
                </sbb-calendar>`;
                break;
              }
              case 'mixed': {
                template = html`<sbb-calendar value="2023-01-15" amount="2">
                  <sbb-calendar-day slot=${toIso8601(new Date('2023-01-22'))}>
                    ${createPrice(true)}
                  </sbb-calendar-day>
                  <sbb-calendar-day slot=${toIso8601(new Date('2023-02-18'))}>
                    ${createPrice(true)}
                  </sbb-calendar-day>
                </sbb-calendar>`;
                break;
              }
              default: {
                template = html`<sbb-calendar value="2023-01-15" amount="2"></sbb-calendar>`;
                break;
              }
            }

            element = await fixture(template);

            // Open year selection
            element
              .shadowRoot!.querySelector<HTMLButtonElement>(
                '.sbb-calendar__control[icon-name="chevron-small-up-small"]',
              )!
              .click();

            await waitForLitRender(element);

            // Open month selection
            const yearButtonArray: SbbCalendarYearElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
            );
            const year2039Button = yearButtonArray.find((e) => e.value === '2039')!;
            year2039Button!.click();

            await waitForLitRender(element);

            const monthButtonArray: SbbCalendarMonthElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
            );
            const december2039Button = monthButtonArray.find((e) => e.value === '2039-12')!;
            december2039Button!.click();

            await waitForLitRender(element);

            // Day view should be opened with December 2039
            expect(
              element
                .shadowRoot!.querySelector<HTMLButtonElement>('.sbb-calendar__table-header span')!
                .textContent.trim(),
            ).to.be.equal('December 2039');
          });

          it('renders with min and max', async () => {
            element = await fixture(html`
              <sbb-calendar value="2024-11-20" min="2023-11-04" max="2026-12-31" amount="2">
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? html`${createSlottedDays(2024, 11, true)}
                        ${createSlottedDays(2024, 12, true)}`
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2024-11-22'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                          <sbb-calendar-day slot=${toIso8601(new Date('2024-12-18'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);

            // Open year selection
            element
              .shadowRoot!.querySelector<HTMLButtonElement>(
                '.sbb-calendar__control[icon-name="chevron-small-up-small"]',
              )!
              .click();

            await waitForLitRender(element);

            // Open month selection
            const yearButtonArray: SbbCalendarYearElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
            );
            const year2023Button = yearButtonArray.find((e) => e.value === '2023')!;
            year2023Button!.click();

            await waitForLitRender(element);

            const monthButtonArray: SbbCalendarMonthElement[] = Array.from(
              element.shadowRoot!.querySelectorAll('sbb-calendar-month'),
            );

            // Check if November 2023 is clickable
            const november2023Button = monthButtonArray.find((e) => e.value === '2023-11')!;
            expect(november2023Button).not.to.have.attribute('disabled');

            // Navigate to max page
            for (let i = 0; i < 2; i++) {
              const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
                '.sbb-calendar__month-view sbb-secondary-button[icon-name="chevron-small-right-small"]',
              )!;

              nextButton.click();
              await waitForLitRender(element);
            }

            const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
              '.sbb-calendar__month-view sbb-secondary-button[icon-name="chevron-small-right-small"]',
            )!;
            expect(nextButton).to.have.attribute('disabled');

            // Check if December 2025 is clickable (last possible)
            const december2025Button = monthButtonArray.find((e) => e.value === '2025-12')!;
            expect(december2025Button).not.to.have.attribute('disabled');
          });

          describe('keyboard navigation', () => {
            beforeEach(async () => {
              element = await fixture(html`
                <sbb-calendar value="2025-01-31" amount="2">
                  ${
                    variant === 'default'
                      ? nothing
                      : variant === 'enhanced'
                        ? html`${createSlottedDays(2025, 1, true)}
                          ${createSlottedDays(2025, 2, true)}`
                        : html`
                            <sbb-calendar-day slot=${toIso8601(new Date('2025-01-01'))}>
                              ${createPrice(true)}
                            </sbb-calendar-day>
                            <sbb-calendar-day slot=${toIso8601(new Date('2025-02-13'))}>
                              ${createPrice(true)}
                            </sbb-calendar-day>
                          `
                  }
                </sbb-calendar>
              `);
            });

            it('it should navigate left', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-30');
            });

            it('it should navigate right', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-02-01');
            });

            it('it should navigate up', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowUp' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-24');
            });

            it('it should navigate down', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-02-07');
            });

            it('it should navigate to first day', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'Home' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-01');
            });

            it('it should navigate to last day', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'End' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
            });

            it('it should navigate to column start', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'PageUp' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-03');
            });

            it('it should navigate to column end', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
              await sendKeys({ press: 'PageDown' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
            });
          });
        });

        describe('vertical', () => {
          beforeEach(async () => {
            element = await fixture(html`
              <sbb-calendar value="2025-01-29" orientation="vertical" amount="2">
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? html`${createSlottedDays(2025, 1, true)} ${createSlottedDays(2025, 2, true)}`
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-01-01'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-02-13'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
          });

          describe('keyboard navigation', () => {
            it('it should navigate left', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            });

            it('it should navigate right', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-02-05');
            });

            it('it should navigate up', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowUp' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-28');
            });

            it('it should navigate down', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-30');
            });

            it('it should navigate to first day', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'Home' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-01');
            });

            it('it should navigate to last day', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'End' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
            });

            it('it should navigate to column start', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'PageUp' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-01-27');
            });

            it('it should navigate to column end', async () => {
              element.focus();
              expect(getDayActiveElementValue()).to.be.equal('2025-01-29');
              await sendKeys({ press: 'PageDown' });
              await waitForLitRender(element);
              expect(getDayActiveElementValue()).to.be.equal('2025-02-02');
            });
          });
        });
      });

      describe('keyboard navigation for year view', () => {
        beforeEach(async () => {
          element = await fixture(
            html`<sbb-calendar value="2023-01-15"
              >${variant === 'enhanced' ? createSlottedDays(2023, 1, true) : nothing}</sbb-calendar
            >`,
          );

          const yearSelectionButton: HTMLElement =
            element.shadowRoot!.querySelector(yearButtonSelector)!;

          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForLitRender(element);

          const years: SbbCalendarYearElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('sbb-calendar-year'),
          );
          expect(years.length).to.equal(24);

          const selectedYear = years.find((e) => e.value === '2023')!;
          await waitForLitRender(element);
          selectedYear.focus();
        });

        it('it should focus on the selected year if it is in the view', () => {
          element.focus();
          expect(getYearActiveElementText()).to.be.equal('2023');
        });

        it('it should focus on the first year if selected year is not in the view', async () => {
          const nextYearButton: HTMLElement = element.shadowRoot!.querySelector(
            '.sbb-calendar__year-view sbb-secondary-button[icon-name="chevron-small-right-small"]',
          )!;
          nextYearButton.click();
          await waitForLitRender(element);
          element.focus();
          expect(getYearActiveElementText()).to.be.equal('2040');
        });

        it('it should navigate left', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2022');
        });

        it('it should navigate right', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowRight' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2024');
        });

        it('it should navigate up', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowUp' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2019');
        });

        it('it should navigate down', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowDown' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2027');
        });

        it('it should navigate to first day', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'Home' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2016');
        });

        it('it should navigate to last day', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'End' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2039');
        });

        it('it should navigate to column start', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'PageUp' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2019');
        });

        it('it should navigate to column end', async () => {
          expect(getYearActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'PageDown' });
          await waitForLitRender(element);

          expect(getYearActiveElementText()).to.be.equal('2039');
        });
      });

      describe('date filter applied', () => {
        // selected date is 2025-01-22, Wednesday
        beforeEach(async () => {
          element = await fixture(html`
            <sbb-calendar value="2025-01-22">
              ${
                variant === 'default'
                  ? nothing
                  : variant === 'enhanced'
                    ? createSlottedDays(2025, 1, true)
                    : html`
                        <sbb-calendar-day slot=${toIso8601(new Date('2025-01-30'))}>
                          ${createPrice(true)}
                        </sbb-calendar-day>
                      `
              }
            </sbb-calendar>
          `);
        });

        it('focus the first available day if the selected date is disabled by dateFilter', async () => {
          // the dateFilter function excludes even days
          element.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 1;
          await waitForLitRender(element);
          element.focus();
          expect(getDayActiveElementValue()).to.be.equal('2025-01-01');
        });

        it('focus the selected date if not disabled by dateFilter', async () => {
          // the dateFilter function excludes odd days
          element.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 0;
          await waitForLitRender(element);
          element.focus();
          expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
        });

        describe('keyboard navigation in horizontal variant', async () => {
          // the dateFilter removes 2 days each 5 and all the thursdays; start date is 2025-01-22, Wed
          beforeEach(async () => {
            await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
            element = await fixture(html`
              <sbb-calendar value="2025-01-22" amount="2" orientation="horizontal">
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? html`${createSlottedDays(2025, 1, true)} ${createSlottedDays(2025, 2, true)}`
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-01-30'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-02-10'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            element.dateFilter = (d: Date | null): boolean =>
              !!d && (d.getDate() - 1) % 5 < 3 && d.getDay() !== 4;
            await waitForLitRender(element);
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-21');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-26');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-08');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-02-12');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-01');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
          });
        });

        describe('keyboard navigation in vertical variant', async () => {
          // the dateFilter removes 2 days each 5 and all the thursdays; start date is 2025-01-22, Wed
          beforeEach(async () => {
            await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
            element = await fixture(html`
              <sbb-calendar value="2025-01-22" amount="2" orientation="vertical">
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? html`${createSlottedDays(2025, 1, true)} ${createSlottedDays(2025, 2, true)}`
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-01-30'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-02-10'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            element.dateFilter = (d: Date | null): boolean =>
              !!d && (d.getDate() - 1) % 5 < 3 && d.getDay() !== 4;
            await waitForLitRender(element);
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-08');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-02-12');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-21');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-26');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-21');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getDayActiveElementValue()).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getDayActiveElementValue()).to.be.equal('2025-01-26');
          });
        });
      });

      /**
       * In both tests, the selected date is 08.04.2025; this month has 5 weeks (14-18)
       */
      describe('with week-numbers', () => {
        const slottedDays = (): TemplateResult | typeof nothing =>
          variant === 'default'
            ? nothing
            : variant === 'enhanced'
              ? createSlottedDays(2025, 4, true)
              : html`
                  <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                    ${createPrice(true)}
                  </sbb-calendar-day>
                `;

        const selectAllButton = (calendar: SbbCalendarElement): HTMLElement[] =>
          Array.from(calendar.shadowRoot!.querySelectorAll<HTMLElement>('sbb-calendar-select-all'));

        const lastSelectedDates = (spy: EventSpy<Event>): string[] =>
          ((spy.lastEvent as SbbDateSelectedEvent<Date>).dateSelected as Date[]).map(toIso8601);

        const testSelectAll = (orientation: 'horizontal' | 'vertical'): void => {
          describe('select all', () => {
            const april = Array.from(
              { length: 30 },
              (_, i) => `2025-04-${String(i + 1).padStart(2, '0')}`,
            );

            it('selects and deselects all days of the month', async () => {
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
              const inputSpy = new EventSpy('input');
              const changeSpy = new EventSpy('change');
              const selectAll = selectAllButton(calendar)[0];

              // The already selected day is kept, no duplicates are created
              selectAll.click();
              await selectedSpy.calledOnce();
              expect(inputSpy.count).to.be.equal(1);
              expect(changeSpy.count).to.be.equal(1);
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal(april);

              // All days are selected: second click removes them all
              selectAll.click();
              await selectedSpy.calledTimes(2);
              expect(inputSpy.count).to.be.equal(2);
              expect(changeSpy.count).to.be.equal(2);
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal([]);

              // Third click selects them again
              selectAll.click();
              await selectedSpy.calledTimes(3);
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal(april);
            });

            it('selects the remaining days when only some are selected', async () => {
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

              getDayCells(calendar)
                .find((e) => e.matches('sbb-calendar-day[slot="2025-04-19"]'))!
                .click();
              await selectedSpy.calledOnce();
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal(['2025-04-08', '2025-04-19']);

              selectAllButton(calendar)[0].click();
              await selectedSpy.calledTimes(2);
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal(april);
            });

            it('can be activated via keyboard', async () => {
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

              selectAllButton(calendar)[0].focus();
              await sendKeys({ press: 'Enter' });
              await selectedSpy.calledOnce();
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal(april);
            });

            it('selects only enabled days', async () => {
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  min="2025-04-05"
                  max="2025-04-25"
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

              selectAllButton(calendar)[0].click();
              await selectedSpy.calledOnce();
              const selected = lastSelectedDates(selectedSpy);
              expect(selected.length).to.be.equal(21);
              expect(selected[0]).to.be.equal('2025-04-05');
              expect(selected[20]).to.be.equal('2025-04-25');
            });

            it('does not select days excluded by the date filter', async () => {
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  .dateFilter=${(d: Date | null) => !!d && d.getDay() !== 0 && d.getDay() !== 6}
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

              selectAllButton(calendar)[0].click();
              await selectedSpy.calledOnce();
              const selected = lastSelectedDates(selectedSpy);
              // April 2025 has 22 working days
              expect(selected.length).to.be.equal(22);
              expect(
                selected.every((d) => ![0, 6].includes(new Date(`${d}T00:00:00`).getDay())),
              ).to.be.equal(true);
            });

            it('toggles each month independently with amount 2', async () => {
              await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  amount="2"
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
              const buttons = selectAllButton(calendar);
              expect(buttons.length).to.be.equal(2);

              buttons[1].click();
              await selectedSpy.calledOnce();
              let selected = lastSelectedDates(selectedSpy);
              expect(selected.length).to.be.equal(32);
              expect(selected[0]).to.be.equal('2025-04-08');
              expect(selected[1]).to.be.equal('2025-05-01');
              expect(selected[31]).to.be.equal('2025-05-31');

              buttons[0].click();
              await selectedSpy.calledTimes(2);
              selected = lastSelectedDates(selectedSpy);
              expect(selected.length).to.be.equal(61);
              expect(selected[0]).to.be.equal('2025-04-01');
              expect(selected[60]).to.be.equal('2025-05-31');

              // Deselect only the second month
              buttons[1].click();
              await selectedSpy.calledTimes(3);
              expect(lastSelectedDates(selectedSpy)).to.be.deep.equal(april);
            });

            describe('aria-label', () => {
              it('describes the select action when not all days are selected', async () => {
                const calendar: SbbCalendarElement = await fixture(html`
                  <sbb-calendar
                    value="2025-04-08T00:00:00"
                    orientation=${orientation}
                    week-numbers
                    multiple
                  >
                    ${slottedDays()}
                  </sbb-calendar>
                `);
                expect(elementInternals.get(selectAllButton(calendar)[0])?.ariaLabel).to.be.equal(
                  i18nCalendarSelectAll('April 2025').en,
                );
              });

              it('switches between select and deselect depending on the selection', async () => {
                const calendar: SbbCalendarElement = await fixture(html`
                  <sbb-calendar
                    value="2025-04-08T00:00:00"
                    orientation=${orientation}
                    week-numbers
                    multiple
                  >
                    ${slottedDays()}
                  </sbb-calendar>
                `);
                const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
                const getLabel = (): string | null =>
                  elementInternals.get(selectAllButton(calendar)[0])?.ariaLabel ?? null;

                selectAllButton(calendar)[0].click();
                await selectedSpy.calledOnce();
                await waitForLitRender(calendar);

                expect(getLabel()).to.be.equal(i18nCalendarDeselectAll('April 2025').en);

                // Removing a single day makes the select action available again
                getDayCells(calendar)
                  .find((e) => e.matches('sbb-calendar-day[slot="2025-04-19"]'))!
                  .click();
                await selectedSpy.calledTimes(2);
                await waitForLitRender(calendar);
                expect(getLabel()).to.be.equal(i18nCalendarSelectAll('April 2025').en);

                selectAllButton(calendar)[0].click();
                await selectedSpy.calledTimes(3);
                await waitForLitRender(calendar);
                expect(getLabel()).to.be.equal(i18nCalendarDeselectAll('April 2025').en);

                // Deselecting all days restores the select label
                selectAllButton(calendar)[0].click();
                await selectedSpy.calledTimes(4);
                await waitForLitRender(calendar);
                expect(getLabel()).to.be.equal(i18nCalendarSelectAll('April 2025').en);
              });

              it('is evaluated for each month with amount 2', async () => {
                await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
                const calendar: SbbCalendarElement = await fixture(html`
                  <sbb-calendar
                    value="2025-04-08T00:00:00"
                    orientation=${orientation}
                    amount="2"
                    week-numbers
                    multiple
                  >
                    ${slottedDays()}
                  </sbb-calendar>
                `);
                const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
                const labels = (): (string | null)[] =>
                  selectAllButton(calendar).map((b) => elementInternals.get(b)?.ariaLabel ?? null);

                expect(labels()).to.be.deep.equal([
                  i18nCalendarSelectAll('April 2025').en,
                  i18nCalendarSelectAll('May 2025').en,
                ]);

                selectAllButton(calendar)[1].click();
                await selectedSpy.calledOnce();
                await waitForLitRender(calendar);
                expect(labels()).to.be.deep.equal([
                  i18nCalendarSelectAll('April 2025').en,
                  i18nCalendarDeselectAll('May 2025').en,
                ]);
              });
            });
          });
        };

        const testWeekdayAndWeeknumberLabels = (orientation: 'horizontal' | 'vertical'): void => {
          describe('weekday and weeknumber aria-label', () => {
            const createCalendar = (): Promise<SbbCalendarElement> =>
              fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);

            const weekdayLabels = (calendar: SbbCalendarElement): (string | null)[] =>
              Array.from(
                calendar.shadowRoot!.querySelectorAll<SbbCalendarWeekdayElement>(
                  'sbb-calendar-weekday',
                ),
                (e) => elementInternals.get(e)!.ariaLabel,
              );

            const weeknumberLabels = (calendar: SbbCalendarElement): (string | null)[] =>
              Array.from(
                calendar.shadowRoot!.querySelectorAll<SbbCalendarWeeknumberElement>(
                  'sbb-calendar-weeknumber',
                ),
                (e) => elementInternals.get(e)!.ariaLabel,
              );

            const clickDay = (calendar: SbbCalendarElement, isoDate: string): void =>
              getDayCells(calendar)
                .find((e) => e.matches(`sbb-calendar-day[slot="${isoDate}"]`))!
                .click();

            const weekdays = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ];

            it('describes the select action initially', async () => {
              const calendar = await createCalendar();
              expect(weekdayLabels(calendar)).to.be.deep.equal(
                weekdays.map((d) => i18nCalendarSelectWeekday(d).en),
              );
              expect(weeknumberLabels(calendar)).to.be.deep.equal(
                [14, 15, 16, 17, 18].map((n) => i18nCalendarSelectWeek(n).en),
              );
            });

            it('switches the weekday label depending on the selection', async () => {
              const calendar = await createCalendar();
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
              const mondayButton =
                calendar.shadowRoot!.querySelectorAll<HTMLElement>('sbb-calendar-weekday')[0];

              mondayButton.click();
              await selectedSpy.calledOnce();
              await waitForLitRender(calendar);
              let labels = weekdayLabels(calendar);
              expect(labels[0]).to.be.equal(i18nCalendarDeselectWeekday('Monday').en);
              // The other weekdays are not affected
              expect(labels.slice(1)).to.be.deep.equal(
                weekdays.slice(1).map((d) => i18nCalendarSelectWeekday(d).en),
              );

              // Removing a single Monday makes the select action available again
              clickDay(calendar, '2025-04-14');
              await selectedSpy.calledTimes(2);
              await waitForLitRender(calendar);
              expect(weekdayLabels(calendar)[0]).to.be.equal(
                i18nCalendarSelectWeekday('Monday').en,
              );

              mondayButton.click();
              await selectedSpy.calledTimes(3);
              mondayButton.click();
              await selectedSpy.calledTimes(4);
              await waitForLitRender(calendar);
              labels = weekdayLabels(calendar);
              expect(labels[0]).to.be.equal(i18nCalendarSelectWeekday('Monday').en);
            });

            it('switches the weeknumber label depending on the selection', async () => {
              const calendar = await createCalendar();
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);
              const firstWeekButton =
                calendar.shadowRoot!.querySelectorAll<HTMLElement>('sbb-calendar-weeknumber')[0];

              firstWeekButton.click();
              await selectedSpy.calledOnce();
              await waitForLitRender(calendar);
              let labels = weeknumberLabels(calendar);
              expect(labels[0]).to.be.equal(i18nCalendarDeselectWeek(14).en);
              // The other weeks are not affected
              expect(labels.slice(1)).to.be.deep.equal(
                [15, 16, 17, 18].map((n) => i18nCalendarSelectWeek(n).en),
              );

              // Removing a single day of the week makes the select action available again
              clickDay(calendar, '2025-04-03');
              await selectedSpy.calledTimes(2);
              await waitForLitRender(calendar);
              labels = weeknumberLabels(calendar);
              expect(labels[0]).to.be.equal(i18nCalendarSelectWeek(14).en);

              firstWeekButton.click();
              await selectedSpy.calledTimes(3);
              firstWeekButton.click();
              await selectedSpy.calledTimes(4);
              await waitForLitRender(calendar);
              expect(weeknumberLabels(calendar)[0]).to.be.equal(i18nCalendarSelectWeek(14).en);
            });

            it('ignores days which cannot be selected', async () => {
              const calendar: SbbCalendarElement = await fixture(html`
                <sbb-calendar
                  value="2025-04-08T00:00:00"
                  orientation=${orientation}
                  min="2025-04-07"
                  max="2025-04-13"
                  week-numbers
                  multiple
                >
                  ${slottedDays()}
                </sbb-calendar>
              `);
              const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

              // Only the 7th is an enabled Monday and only the 15th week has enabled days
              calendar.shadowRoot!.querySelectorAll<HTMLElement>('sbb-calendar-weekday')[0].click();
              await selectedSpy.calledOnce();
              await waitForLitRender(calendar);
              expect(weekdayLabels(calendar)[0]).to.be.equal(
                i18nCalendarDeselectWeekday('Monday').en,
              );

              calendar
                .shadowRoot!.querySelectorAll<HTMLElement>('sbb-calendar-weeknumber')[1]
                .click();
              await selectedSpy.calledTimes(2);
              await waitForLitRender(calendar);
              expect(weeknumberLabels(calendar)[1]).to.be.equal(i18nCalendarDeselectWeek(15).en);
            });
          });
        };

        describe('horizontal', () => {
          testSelectAll('horizontal');
          testWeekdayAndWeeknumberLabels('horizontal');

          it('renders', async () => {
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar value="2025-04-08T00:00:00" week-numbers>
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? createSlottedDays(2025, 4, true)
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            // In horizontal variant, the first cell of each row is the one with the week number
            const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
            const cells = Array.from(rows, (e) => e.querySelector('td')!);
            expect(cells.length).to.be.equal(5);
            expect(
              cells[0].querySelector('span:not(.sbb-screen-reader-only)')!.textContent!.trim(),
            ).to.be.equal('14');
            expect(
              cells[1].querySelector('span:not(.sbb-screen-reader-only)')!.textContent!.trim(),
            ).to.be.equal('15');
            expect(
              cells[4].querySelector('span:not(.sbb-screen-reader-only)')!.textContent!.trim(),
            ).to.be.equal('18');
          });

          it('renders multiple', async () => {
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar value="2025-04-08T00:00:00" week-numbers multiple>
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? createSlottedDays(2025, 4, true)
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

            // In horizontal variant, the first cell of each row is the one with the week number
            const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
            const cells = Array.from(rows, (e) => e.querySelector('td')!);
            expect(cells.length).to.be.equal(5);
            // Due to the multiple property, cells have buttons instead than span.
            expect(cells[0].querySelector('span')).to.be.null;
            // The first button is the weekday button (14th week, days from Apr 1 to Apr 6
            const firstButton =
              cells[0].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            expect(firstButton).not.to.be.null;
            expect(firstButton.value).to.be.equal('14');
            // Adding / removing days is done without the use of ctrl/cmd
            firstButton.click();
            await selectedSpy.calledOnce();
            let selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(7);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-02');
            expect(toIso8601(selectedDates[5])).to.be.equal('2025-04-06');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');
            // If the same button is clicked twice, days are removed
            firstButton.click();
            expect(selectedSpy.calledTimes(2));
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(1);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-08');

            // With the first row selected, add the second one
            const secondButton =
              cells[1].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            firstButton.click();
            secondButton.click();
            await selectedSpy.calledTimes(4);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(13);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-07');
            expect(toIso8601(selectedDates[7])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[12])).to.be.equal('2025-04-13');

            // Click on Wed button: all missing Wednesdays are added
            const header = calendar.shadowRoot!.querySelectorAll('thead th')!;
            const headerButtons = Array.from(header, (e) =>
              e.querySelector<SbbCalendarWeekdayElement>('sbb-calendar-weekday')!,
            );
            expect(headerButtons.length).to.be.equal(8);
            headerButtons[3].click();
            await selectedSpy.calledTimes(5);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(16);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-07');
            expect(toIso8601(selectedDates[7])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[12])).to.be.equal('2025-04-13');
            expect(toIso8601(selectedDates[13])).to.be.equal('2025-04-16');
            expect(toIso8601(selectedDates[14])).to.be.equal('2025-04-23');
            expect(toIso8601(selectedDates[15])).to.be.equal('2025-04-30');

            // Click again on Wed button: all Wednesdays are removed
            headerButtons[3].click();
            await selectedSpy.calledTimes(6);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(11);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[10])).to.be.equal('2025-04-13');

            // Click on a single day to add it
            getDayCells(calendar)
              .find((e) => e.matches('sbb-calendar-day[slot="2025-04-19"]'))!
              .click();
            await selectedSpy.calledTimes(7);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(12);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[11])).to.be.equal('2025-04-19');

            // Click on a single day to remove it
            getDayCells(calendar)
              .find((e) => e.matches('sbb-calendar-day[slot="2025-04-08"]'))!
              .click();
            await selectedSpy.calledTimes(8);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(11);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
          });

          it('renders multiple wide', async () => {
            await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar value="2025-04-08T00:00:00" amount="2" week-numbers multiple>
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? html`${createSlottedDays(2025, 4, true)} ${createSlottedDays(2025, 5, true)}`
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-05-05'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

            // In horizontal variant, the first cell of each row is the one with the week number
            const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
            const cells = Array.from(rows, (e) => e.querySelector('td')!);
            // In wide mode, we have two months displayed, so we have to consider the number of weeks in April and May
            expect(cells.length).to.be.equal(10);
            const readValue = (cell: HTMLElement): string | null =>
              cell.querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!.value;

            expect(readValue(cells[0])).to.be.equal('14');
            expect(readValue(cells[1])).to.be.equal('15');
            expect(readValue(cells[4])).to.be.equal('18');
            expect(readValue(cells[5])).to.be.equal('18');
            expect(readValue(cells[9])).to.be.equal('22');

            // Clicking on the last week button must select all the days of the week in the current month
            const lastButtonFirstMonth =
              cells[4].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            lastButtonFirstMonth.click();
            await selectedSpy.calledOnce();
            let selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(4);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-28');
            expect(toIso8601(selectedDates[2])).to.be.equal('2025-04-29');
            expect(toIso8601(selectedDates[3])).to.be.equal('2025-04-30');

            // Clicking on the first week button in the next month should append the remaining dates in the week.
            const firstButtonSecondMonth =
              cells[5].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            firstButtonSecondMonth.click();
            expect(selectedSpy.calledTimes(2));
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(8);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[4])).to.be.equal('2025-05-01');
            expect(toIso8601(selectedDates[5])).to.be.equal('2025-05-02');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-05-03');
            expect(toIso8601(selectedDates[7])).to.be.equal('2025-05-04');

            // Clicks on the first button of the first month does not select dates in the previous (not rendered) one
            const firstButton =
              cells[0].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            firstButton.click();
            await selectedSpy.calledTimes(3);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(14);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-02');
            expect(toIso8601(selectedDates[5])).to.be.equal('2025-04-06');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');

            // Clicking again on the first button of the second month will deselect dates in the first week of the second month
            firstButtonSecondMonth.click();
            await selectedSpy.calledTimes(4);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(10);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-02');
            expect(toIso8601(selectedDates[5])).to.be.equal('2025-04-06');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[7])).to.be.equal('2025-04-28');
            expect(toIso8601(selectedDates[9])).to.be.equal('2025-04-30');
          });
        });

        describe('vertical', () => {
          testSelectAll('vertical');
          testWeekdayAndWeeknumberLabels('vertical');

          it('renders', async () => {
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar value="2025-04-08" orientation="vertical" week-numbers>
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? createSlottedDays(2025, 4, true)
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            // In vertical variant, there's a table header with the week numbers as cells
            const thead = calendar.shadowRoot!.querySelector('thead');
            expect(thead).not.to.be.null;
            // Due to the presence of an empty cell along the week days, the cells are 6 and not 5
            const cells = thead!.querySelectorAll('th');
            expect(cells.length).to.be.equal(6);
            // The first cell is empty
            expect(cells[0].className).to.be.equal('sbb-calendar__table-data');
            expect(cells[0].querySelector('span:not(.sbb-screen-reader-only)')).to.be.null;
            expect(
              cells[1].querySelector('span:not(.sbb-screen-reader-only)')!.textContent!.trim(),
            ).to.be.equal('14');
            expect(
              cells[2].querySelector('span:not(.sbb-screen-reader-only)')!.textContent!.trim(),
            ).to.be.equal('15');
            expect(
              cells[5].querySelector('span:not(.sbb-screen-reader-only)')!.textContent!.trim(),
            ).to.be.equal('18');
          });

          it('renders multiple', async () => {
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar
                value="2025-04-08T00:00:00"
                orientation="vertical"
                week-numbers
                multiple
              >
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? createSlottedDays(2025, 4, true)
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

            // In vertical variant, there's a table header with the week numbers as cells
            const thead = calendar.shadowRoot!.querySelector('thead');
            expect(thead).not.to.be.null;
            // Due to the presence of an empty cell along the week days, the cells are 6 and not 5
            const cells = thead!.querySelectorAll('th');
            expect(cells.length).to.be.equal(6);
            // Due to the multiple property, cells have buttons instead than span.
            expect(cells[1].querySelector('span')).to.be.null;
            const firstButton =
              cells[1].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            expect(firstButton).not.to.be.null;
            expect(firstButton.value).to.be.equal('14');
            firstButton.click();
            await selectedSpy.calledOnce();
            let selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(7);
            for (let i = 0; i <= 5; i++) {
              expect(toIso8601(selectedDates[i])).to.be.equal(
                `2025-04-${String(i + 1).padStart(2, '0')}`,
              );
            }

            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');
            // if the same button is clicked twice, dates are removed
            firstButton.click();
            expect(selectedSpy.calledTimes(2));
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(1);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-08');

            // With the first row selected, add the second one
            const secondButton =
              cells[2].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            firstButton.click();
            secondButton.click();
            await selectedSpy.calledTimes(4);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(13);
            for (let i = 0; i <= 12; i++) {
              expect(toIso8601(selectedDates[i])).to.be.equal(
                `2025-04-${String(i + 1).padStart(2, '0')}`,
              );
            }

            // Click on Wed button: all missing Wednesdays are added
            const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
            const weekDayCells: SbbCalendarWeekdayElement[] = Array.from(rows, (e) =>
              e.querySelector('sbb-calendar-weekday')!,
            );
            expect(weekDayCells.length).to.be.equal(7);
            weekDayCells[2].click();
            await selectedSpy.calledTimes(5);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(16);
            for (let i = 0; i <= 12; i++) {
              expect(toIso8601(selectedDates[i])).to.be.equal(
                `2025-04-${String(i + 1).padStart(2, '0')}`,
              );
            }

            expect(toIso8601(selectedDates[13])).to.be.equal('2025-04-16');
            expect(toIso8601(selectedDates[14])).to.be.equal('2025-04-23');
            expect(toIso8601(selectedDates[15])).to.be.equal('2025-04-30');

            // Click again on Wed button: all Wednesdays are removed
            weekDayCells[2].click();
            await selectedSpy.calledTimes(6);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(11);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            for (let i = 1; i <= 6; i++) {
              expect(toIso8601(selectedDates[i])).to.be.equal(
                `2025-04-${String(i + 2).padStart(2, '0')}`,
              );
            }

            for (let i = 7; i <= 10; i++) {
              expect(toIso8601(selectedDates[i])).to.be.equal(
                `2025-04-${String(i + 3).padStart(2, '0')}`,
              );
            }

            // Click on a single day to add it
            getDayCells(calendar)
              .find((e) => e.matches('sbb-calendar-day[slot="2025-04-30"]'))!
              .click();
            await selectedSpy.calledTimes(7);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(12);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-03');
            expect(toIso8601(selectedDates[11])).to.be.equal('2025-04-30');

            // Click on a single day to remove it
            getDayCells(calendar)
              .find((e) => e.matches('sbb-calendar-day[slot="2025-04-08"]'))!
              .click();
            await selectedSpy.calledTimes(8);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(11);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-10');
          });

          it('renders multiple wide', async () => {
            await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar
                value="2025-04-08T00:00:00"
                orientation="vertical"
                week-numbers
                multiple
                amount="2"
              >
                ${
                  variant === 'default'
                    ? nothing
                    : variant === 'enhanced'
                      ? html`${createSlottedDays(2025, 4, true)} ${createSlottedDays(2025, 5, true)}`
                      : html`
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                          <sbb-calendar-day slot=${toIso8601(new Date('2025-05-13'))}>
                            ${createPrice(true)}
                          </sbb-calendar-day>
                        `
                }
              </sbb-calendar>
            `);
            const selectedSpy = new EventSpy(SbbCalendarElement.events.dateselected);

            // In vertical variant, there's a table header with the week numbers as cells
            const thead = calendar.shadowRoot!.querySelectorAll('thead');
            expect(thead.length).to.be.equal(2);
            const cellsPrev = thead[0].querySelectorAll('th');
            expect(cellsPrev.length).to.be.equal(6);
            const cellsNext = thead[1].querySelectorAll('th');
            expect(cellsNext.length).to.be.equal(6);
            const readValue = (cell: HTMLElement): string | null =>
              cell.querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!.value;
            expect(readValue(cellsPrev[1])).to.be.equal('14');
            expect(readValue(cellsPrev[2])).to.be.equal('15');
            expect(readValue(cellsPrev[5])).to.be.equal('18');
            expect(readValue(cellsNext[1])).to.be.equal('18');
            expect(readValue(cellsNext[2])).to.be.equal('19');
            expect(readValue(cellsNext[5])).to.be.equal('22');

            // Clicking on the last week button must select all the days of the week in the current month
            const lastButtonFirstMonth =
              cellsPrev[5].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            lastButtonFirstMonth.click();
            await selectedSpy.calledOnce();
            let selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(4);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-28');
            expect(toIso8601(selectedDates[2])).to.be.equal('2025-04-29');
            expect(toIso8601(selectedDates[3])).to.be.equal('2025-04-30');

            // Clicking on the first week button in the next month additionally
            // select all the days of the week in the next month
            const firstButtonSecondMonth =
              cellsNext[1].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            firstButtonSecondMonth.click();
            expect(selectedSpy.calledTimes(2));
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(8);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-28');
            expect(toIso8601(selectedDates[4])).to.be.equal('2025-05-01');
            expect(toIso8601(selectedDates[5])).to.be.equal('2025-05-02');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-05-03');
            expect(toIso8601(selectedDates[7])).to.be.equal('2025-05-04');

            // Clicks on the first button of the first month does not select dates in the previous (not rendered) one
            const firstButton =
              cellsPrev[1].querySelector<SbbCalendarWeeknumberElement>('sbb-calendar-weeknumber')!;
            firstButton.click();
            await selectedSpy.calledTimes(3);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(14);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-02');
            expect(toIso8601(selectedDates[5])).to.be.equal('2025-04-06');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');

            // Clicking again on the first button of the second month will select the dates in the first week of the second month
            firstButtonSecondMonth.click();
            await selectedSpy.calledTimes(4);
            selectedDates = (selectedSpy.lastEvent as SbbDateSelectedEvent<Date>)
              .dateSelected as Date[];
            expect(selectedDates.length).to.be.equal(10);
            expect(toIso8601(selectedDates[0])).to.be.equal('2025-04-01');
            expect(toIso8601(selectedDates[1])).to.be.equal('2025-04-02');
            expect(toIso8601(selectedDates[2])).to.be.equal('2025-04-03');
            expect(toIso8601(selectedDates[6])).to.be.equal('2025-04-08');
            expect(toIso8601(selectedDates[7])).to.be.equal('2025-04-28');
            expect(toIso8601(selectedDates[8])).to.be.equal('2025-04-29');
            expect(toIso8601(selectedDates[9])).to.be.equal('2025-04-30');
          });
        });
      });

      describe('tab group keyboard navigation', () => {
        it('lets Tab and Shift+Tab leave the calendar normally when not multiple', async () => {
          const calendar: SbbCalendarElement = await fixture(html`
            <sbb-calendar value="2023-01-15">
              ${
                variant === 'default'
                  ? nothing
                  : variant === 'enhanced'
                    ? createSlottedDays(2023, 1, true)
                    : html`
                        <sbb-calendar-day slot=${toIso8601(new Date('2023-01-05'))}>
                          ${createPrice(true)}
                        </sbb-calendar-day>
                      `
              }
            </sbb-calendar>
          `);
          const outsideButton = document.createElement('button');
          calendar.parentElement!.append(outsideButton);

          calendar.focus();
          expect(getDayActiveElementValue()).to.be.equal('2023-01-15');

          // No weekday/weeknumber cells are rendered (not `multiple`), so Tab must leave
          // the calendar instead of being trapped by the tab-group navigation.
          await sendKeys({ press: tabKey });
          await waitForLitRender(calendar);
          expect(document.activeElement).to.be.equal(outsideButton);

          await sendKeys({ press: `Shift+${tabKey}` });
          await waitForLitRender(calendar);
          expect(getDayActiveElementValue()).to.be.equal('2023-01-15');
        });

        it('cycles Tab/Shift+Tab through select-all-button and days when multiple', async () => {
          const calendar: SbbCalendarElement = await fixture(html`
            <sbb-calendar value="2025-04-08T00:00:00" week-numbers multiple>
              ${
                variant === 'default'
                  ? nothing
                  : variant === 'enhanced'
                    ? createSlottedDays(2025, 4, true)
                    : html`
                        <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                          ${createPrice(true)}
                        </sbb-calendar-day>
                      `
              }
            </sbb-calendar>
          `);
          const outsideButton = document.createElement('button');
          calendar.parentElement!.append(outsideButton);

          const calendarUpArrow = calendar.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
            '.sbb-calendar__control:last-of-type',
          )!;

          const selectAllButton =
            calendar.shadowRoot!.querySelector<SbbCalendarWeekdayElement>(
              'sbb-calendar-select-all',
            )!;

          calendarUpArrow.focus();
          expect(calendar.shadowRoot!.activeElement).to.be.equal(calendarUpArrow);

          await sendKeys({ press: tabKey });
          await waitForLitRender(calendar);
          expect(calendar.shadowRoot!.activeElement).to.be.equal(selectAllButton);

          // select-all-button -> days
          await sendKeys({ press: tabKey });
          await waitForLitRender(calendar);
          expect(getDayActiveElementValue()).to.be.equal('2025-04-08');

          // days -> outside the calendar (last group)
          await sendKeys({ press: tabKey });
          await waitForLitRender(calendar);
          expect(document.activeElement).to.be.equal(outsideButton);

          // Shift+Tab travels the groups backwards: outside -> days -> select-all-button
          await sendKeys({ press: `Shift+${tabKey}` });
          await waitForLitRender(calendar);
          expect(getDayActiveElementValue()).to.be.equal('2025-04-08');

          await sendKeys({ press: `Shift+${tabKey}` });
          await waitForLitRender(calendar);
          expect(calendar.shadowRoot!.activeElement).to.be.equal(selectAllButton);

          await sendKeys({ press: `Shift+${tabKey}` });
          await waitForLitRender(calendar);
          expect(calendar.shadowRoot!.activeElement).to.be.equal(calendarUpArrow);
        });
      });

      describe('arrow key navigation within weekday and weeknumber groups', () => {
        (
          [
            { selector: 'sbb-calendar-weekday', label: 'weekday' },
            { selector: 'sbb-calendar-weeknumber', label: 'weeknumber' },
          ] as const
        ).forEach(({ selector, label }) => {
          describe(`${label} group`, () => {
            let calendar: SbbCalendarElement;
            let cells: (SbbCalendarWeekdayElement | SbbCalendarWeeknumberElement)[];
            let selectAllButton: SbbCalendarSelectAllElement;

            beforeEach(async () => {
              calendar = await fixture(html`
                <sbb-calendar value="2025-04-08T00:00:00" week-numbers multiple>
                  ${
                    variant === 'default'
                      ? nothing
                      : variant === 'enhanced'
                        ? createSlottedDays(2025, 4, true)
                        : html`
                            <sbb-calendar-day slot=${toIso8601(new Date('2025-04-25'))}>
                              ${createPrice(true)}
                            </sbb-calendar-day>
                          `
                  }
                </sbb-calendar>
              `);
              cells = Array.from(calendar.shadowRoot!.querySelectorAll(selector));
              selectAllButton = calendar.shadowRoot!.querySelector('sbb-calendar-select-all')!;
            });

            it('navigates to the next cell with ArrowRight/ArrowDown and wraps at the end', async () => {
              cells[0].focus();
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[0]);

              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'ArrowDown' });
              } else {
                await sendKeys({ press: 'ArrowRight' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[1]);
              expect(cells[0].tabIndex).to.be.equal(-1);

              // Wraps around from the last cell back to the first with ArrowDown.
              cells[cells.length - 1].focus();
              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'ArrowDown' });
                // ArrowDown is pressed twice to skip the select-all-button
                await sendKeys({ press: 'ArrowDown' });
              } else {
                await sendKeys({ press: 'ArrowRight' });
                // ArrowRight is pressed twice to skip the select-all-button
                await sendKeys({ press: 'ArrowRight' });
              }

              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[0]);
            });

            it('navigates to the previous cell with ArrowLeft/ArrowUp and wraps at the start', async () => {
              cells[0].focus();

              // Wraps around from the first cell to the last with ArrowLeft.
              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'ArrowUp' });
                // ArrowUp is pressed twice to skip the select-all-button
                await sendKeys({ press: 'ArrowUp' });
              } else {
                await sendKeys({ press: 'ArrowLeft' });
                // ArrowLeft is pressed twice to skip the select-all-button
                await sendKeys({ press: 'ArrowLeft' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 1]);

              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'ArrowUp' });
              } else {
                await sendKeys({ press: 'ArrowLeft' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 2]);
            });

            it('jumps to the first cell with Home and PageUp', async () => {
              cells[cells.length - 1].focus();
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 1]);

              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageUp' });
              } else {
                await sendKeys({ press: 'Home' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(selectAllButton!);
            });

            it('jumps to the last cell with End and PageDown', async () => {
              cells[0].focus();

              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageDown' });
              } else {
                await sendKeys({ press: 'End' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 1]);

              cells[0].focus();
              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageDown' });
              } else {
                await sendKeys({ press: 'End' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 1]);
            });

            it('keeps focus in place when Home/End/PageUp/PageDown is pressed on the boundary cell', async () => {
              // Home/PageUp on the already-first cell is a no-op: focus stays put.
              cells[0].focus();
              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageUp' });
              } else {
                await sendKeys({ press: 'Home' });
              }

              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(selectAllButton);

              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageUp' });
              } else {
                await sendKeys({ press: 'Home' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(selectAllButton);

              // End/PageDown on the already-last cell is a no-op: focus stays put.
              cells[cells.length - 1].focus();
              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageDown' });
              } else {
                await sendKeys({ press: 'End' });
              }

              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 1]);

              if (selector === 'sbb-calendar-weeknumber') {
                await sendKeys({ press: 'PageDown' });
              } else {
                await sendKeys({ press: 'End' });
              }
              await waitForLitRender(calendar);
              expect(calendar.shadowRoot!.activeElement).to.be.equal(cells[cells.length - 1]);
            });
          });
        });
      });

      describe('fixed-month', () => {
        beforeEach(async () => {
          element = await fixture(
            html` <sbb-calendar fixed-month="2023-10">
              ${
                variant === 'default'
                  ? nothing
                  : variant === 'enhanced'
                    ? createSlottedDays(2023, 10, true)
                    : html`
                        <sbb-calendar-day slot=${toIso8601(new Date('2023-10-15'))}>
                          ${createPrice(true)}
                        </sbb-calendar-day>
                      `
              }
            </sbb-calendar>`,
          );
        });

        it('should not render control buttons', () => {
          expect(element.shadowRoot!.querySelector('.sbb-calendar__control')).to.be.null;
        });

        it('should render the given month', () => {
          const day = element.shadowRoot!.querySelector('sbb-calendar-day');
          expect(defaultDateAdapter.sameDate(day?.value ?? null, new Date(2023, 9, 1))).to.be.true;
        });

        it('should change the month on fixed-month attribute change', async () => {
          element.fixedMonth = '2024-02';
          await waitForLitRender(element);
          const day = element.shadowRoot!.querySelector('sbb-calendar-day');
          expect(defaultDateAdapter.sameDate(day?.value ?? null, new Date(2024, 1, 1))).to.be.true;
        });
      });

      describe('active-month', () => {
        beforeEach(async () => {
          element = await fixture(
            html` <sbb-calendar active-month="2023-10">
              ${
                variant === 'default'
                  ? nothing
                  : variant === 'enhanced'
                    ? createSlottedDays(2023, 10, true)
                    : html`
                        <sbb-calendar-day slot=${toIso8601(new Date('2023-10-15'))}>
                          ${createPrice(true)}
                        </sbb-calendar-day>
                      `
              }
            </sbb-calendar>`,
          );
        });

        it('should render the given month', () => {
          const day = element.shadowRoot!.querySelector('sbb-calendar-day');
          expect(defaultDateAdapter.sameDate(day?.value ?? null, new Date(2023, 9, 1))).to.be.true;
        });

        it('should change the month on active-month attribute change', async () => {
          element.activeMonth = '2024-02';
          await waitForLitRender(element);
          const day = element.shadowRoot!.querySelector('sbb-calendar-day');
          expect(defaultDateAdapter.sameDate(day?.value ?? null, new Date(2024, 1, 1))).to.be.true;
        });
      });
    });
  });

  describe('keyboard navigation of the header cells and tab groups', () => {
    type Orientation = 'horizontal' | 'vertical';
    type HeaderCell =
      SbbCalendarSelectAllElement | SbbCalendarWeekdayElement | SbbCalendarWeeknumberElement;
    interface TableCells {
      selectAll: SbbCalendarSelectAllElement | null;
      weekdays: SbbCalendarWeekdayElement[];
      weeknumbers: SbbCalendarWeeknumberElement[];
      days: SbbCalendarDayElement[];
    }

    const horizontalKeys = { next: 'ArrowRight', prev: 'ArrowLeft', first: 'Home', last: 'End' };
    const verticalKeys = { next: 'ArrowDown', prev: 'ArrowUp', first: 'PageUp', last: 'PageDown' };

    const getTables = (calendar: SbbCalendarElement): TableCells[] =>
      Array.from(calendar.shadowRoot!.querySelectorAll('table'), (table) => ({
        selectAll: table.querySelector('sbb-calendar-select-all'),
        weekdays: Array.from(table.querySelectorAll('sbb-calendar-weekday')),
        weeknumbers: Array.from(table.querySelectorAll('sbb-calendar-weeknumber')),
        days: Array.from(table.querySelectorAll('sbb-calendar-day')),
      }));

    const getFocused = (calendar: SbbCalendarElement): Element | null =>
      calendar.shadowRoot!.activeElement ?? document.activeElement;

    const label = (calendar: SbbCalendarElement, el: Element | null | undefined): string => {
      if (!el) {
        return String(el);
      }
      const tableIndex = Array.from(calendar.shadowRoot!.querySelectorAll('table')).findIndex((t) =>
        t.contains(el),
      );
      const value = (el as SbbCalendarDayElement).value;
      const text =
        value instanceof Date ? toIso8601(value) : (el as HTMLElement).textContent?.trim();
      return `${el.localName}(${text}) in table ${tableIndex}`;
    };

    // Compares via labels, as chai fails to print elements with big shadow trees.
    const expectFocus = (
      calendar: SbbCalendarElement,
      expected: Element | null | undefined,
      message = '',
    ): void => {
      const focused = getFocused(calendar) ?? (document.activeElement as Element | null);
      expect(
        focused === expected,
        `${message} focused: ${label(calendar, focused)}, expected: ${label(calendar, expected)}`,
      ).to.be.true;
    };

    // The first table contains the active day (selected value), the others the first of the month.
    const entryDay = (tables: TableCells[], index: number): SbbCalendarDayElement =>
      tables[index].days.find((day) =>
        toIso8601(day.value!).endsWith(index === 0 ? '2025-04-08' : '-01'),
      )!;

    const press = async (calendar: SbbCalendarElement, key: string): Promise<void> => {
      await sendKeys({ press: key });
      await waitForLitRender(calendar);
    };

    const createCalendar = async (
      orientation: Orientation,
      amount: number,
      weekNumbers: boolean,
      multiple = true,
    ): Promise<SbbCalendarElement> => {
      return fixture(html`
        <sbb-calendar
          value="2025-04-08T00:00:00"
          orientation=${orientation}
          amount=${amount}
          ?week-numbers=${weekNumbers}
          ?multiple=${multiple}
        ></sbb-calendar>
      `);
    };

    [1, 2, 3].forEach((amount) => {
      (['horizontal', 'vertical'] as const).forEach((orientation) => {
        [true, false].forEach((weekNumbers) => {
          describe(`amount=${amount} orientation=${orientation} week-numbers=${weekNumbers}`, () => {
            let calendar: SbbCalendarElement;
            let outsideButton: HTMLButtonElement;
            let tables: TableCells[];
            // Elements navigated by ArrowLeft/ArrowRight/Home/End and by ArrowUp/ArrowDown/PageUp/PageDown.
            let horizontalGroup: HeaderCell[];
            let verticalGroup: HeaderCell[];
            let weekdayGroup: HeaderCell[];
            let weeknumberGroup: HeaderCell[];

            beforeEach(async () => {
              calendar = await createCalendar(orientation, amount, weekNumbers);
              outsideButton = document.createElement('button');
              calendar.parentElement!.append(outsideButton);
              tables = getTables(calendar);
              expect(tables.length).to.be.equal(amount);

              // Each group spans over all tables and contains the select-all button as first element.
              weekdayGroup = tables.flatMap((t) => [t.selectAll, ...t.weekdays].filter((e) => !!e));
              weeknumberGroup = tables.flatMap((t) =>
                [t.selectAll, ...t.weeknumbers].filter((e) => !!e),
              );
              horizontalGroup = orientation === 'horizontal' ? weekdayGroup : weeknumberGroup;
              verticalGroup = orientation === 'horizontal' ? weeknumberGroup : weekdayGroup;
            });

            const expectedTarget = (
              group: HeaderCell[],
              start: HeaderCell,
              key: string,
              keys: typeof horizontalKeys,
            ): HeaderCell => {
              const index = group.indexOf(start);
              switch (key) {
                case keys.next:
                  return group[(index + 1) % group.length];
                case keys.prev:
                  return group[(index - 1 + group.length) % group.length];
                case keys.first:
                  return group[0];
                case keys.last:
                  return group.at(-1)!;
                default:
                  return start;
              }
            };

            const startCells = (cells: (HeaderCell | null)[][]): HeaderCell[] =>
              Array.from(new Set(cells.flatMap((c) => [c[0], c.at(-1)]).filter((e) => !!e)));

            const allKeys = [...Object.values(horizontalKeys), ...Object.values(verticalKeys), 'a'];

            it('navigates within the weekday group', async () => {
              const keys = weekdayGroup === horizontalGroup ? horizontalKeys : verticalKeys;
              const starts = startCells(tables.map((t) => t.weekdays));
              for (const start of starts) {
                for (const key of allKeys) {
                  start.focus();
                  await press(calendar, key);
                  expectFocus(
                    calendar,
                    expectedTarget(weekdayGroup, start, key, keys),
                    `${key} on ${label(calendar, start)}:`,
                  );
                }
              }
            });

            if (weekNumbers) {
              it('navigates within the weeknumber group', async () => {
                const keys = weeknumberGroup === horizontalGroup ? horizontalKeys : verticalKeys;
                const starts = startCells(tables.map((t) => t.weeknumbers));
                for (const start of starts) {
                  for (const key of allKeys) {
                    start.focus();
                    await press(calendar, key);
                    expectFocus(
                      calendar,
                      expectedTarget(weeknumberGroup, start, key, keys),
                      `${key} on ${label(calendar, start)}:`,
                    );
                  }
                }
              });

              it('navigates in both directions from the select-all buttons', async () => {
                for (const { selectAll } of tables) {
                  for (const key of allKeys) {
                    selectAll!.focus();
                    await press(calendar, key);
                    const expected = Object.values(horizontalKeys).includes(key)
                      ? expectedTarget(horizontalGroup, selectAll!, key, horizontalKeys)
                      : expectedTarget(verticalGroup, selectAll!, key, verticalKeys);
                    expectFocus(calendar, expected, `${key} on ${label(calendar, selectAll)}:`);
                  }
                }
              });
            }

            it('focuses the day of the same table with Tab from a header cell', async () => {
              for (const [tableIndex, table] of tables.entries()) {
                const expectedDay = entryDay(tables, tableIndex);
                for (const start of [table.selectAll, table.weekdays[0], table.weeknumbers[0]]) {
                  if (!start) {
                    continue;
                  }
                  start.focus();
                  await press(calendar, tabKey);
                  expectFocus(calendar, expectedDay, `Tab on ${label(calendar, start)}:`);
                }
              }
            });

            it('leaves the groups with Shift+Tab from a header cell', async () => {
              for (const table of tables) {
                for (const start of [
                  table.selectAll,
                  table.weekdays[0],
                  table.weekdays.at(-1),
                  table.weeknumbers[0],
                ]) {
                  if (!start) {
                    continue;
                  }
                  start.focus();
                  await press(calendar, `Shift+${tabKey}`);
                  expect(
                    getFocused(calendar)?.localName,
                    `Shift+Tab on ${label(calendar, start)}`,
                  ).to.be.equal('sbb-secondary-button');
                }
              }
            });

            it('leaves the calendar with Tab from a day of every table', async () => {
              for (const tableIndex of tables.keys()) {
                entryDay(tables, tableIndex).focus();
                await press(calendar, tabKey);
                expectFocus(calendar, outsideButton, `Tab on day in table ${tableIndex}:`);
              }
            });

            it('focuses the first header cell of the same table with Shift+Tab from a day', async () => {
              for (const [tableIndex, table] of tables.entries()) {
                entryDay(tables, tableIndex).focus();
                await press(calendar, `Shift+${tabKey}`);
                expectFocus(
                  calendar,
                  weekNumbers ? table.selectAll : table.weekdays[0],
                  `Shift+Tab on day in table ${tableIndex}:`,
                );
              }
            });

            it('cycles through the tab groups and restores the tab order', async () => {
              const controls =
                calendar.shadowRoot!.querySelectorAll<HTMLElement>('.sbb-calendar__control');
              const lastControl = controls[controls.length - 1];
              const firstHeaderCell = weekNumbers ? tables[0].selectAll : tables[0].weekdays[0];
              const activeDay = entryDay(tables, 0);

              lastControl.focus();
              await press(calendar, tabKey);
              expectFocus(calendar, firstHeaderCell);
              await press(calendar, tabKey);
              expectFocus(calendar, activeDay);
              await press(calendar, tabKey);
              expectFocus(calendar, outsideButton);

              await press(calendar, `Shift+${tabKey}`);
              expectFocus(calendar, activeDay);
              await press(calendar, `Shift+${tabKey}`);
              expectFocus(calendar, firstHeaderCell);
              await press(calendar, `Shift+${tabKey}`);
              expectFocus(calendar, lastControl);
            });

            it('restores the tab order after leaving from the last table', async () => {
              const lastTable = tables.at(-1)!;
              const activeDay = entryDay(tables, 0);
              (weekNumbers ? lastTable.selectAll! : lastTable.weekdays[0]).focus();

              await press(calendar, tabKey);
              expectFocus(calendar, entryDay(tables, tables.length - 1));
              await press(calendar, tabKey);
              expectFocus(calendar, outsideButton);

              await press(calendar, `Shift+${tabKey}`);
              expectFocus(calendar, activeDay);
              await press(calendar, `Shift+${tabKey}`);
              expectFocus(calendar, weekNumbers ? tables[0].selectAll : tables[0].weekdays[0]);
            });
          });
        });
      });
    });

    describe('with disabled days', () => {
      it('focuses the first enabled day of the same table with Tab', async () => {
        await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
        const calendar: SbbCalendarElement = await fixture(html`
          <sbb-calendar
            value="2025-04-08T00:00:00"
            amount="2"
            week-numbers
            multiple
            .dateFilter=${(d: Date | null): boolean => !!d && d.getDate() > 5}
          ></sbb-calendar>
        `);
        const tables = getTables(calendar);

        tables[1].selectAll!.focus();
        await press(calendar, tabKey);
        expect(label(calendar, getFocused(calendar))).to.be.equal(
          'sbb-calendar-day(2025-05-06) in table 1',
        );

        tables[1].weekdays[0].focus();
        await press(calendar, tabKey);
        expect(label(calendar, getFocused(calendar))).to.be.equal(
          'sbb-calendar-day(2025-05-06) in table 1',
        );

        tables[0].weeknumbers[0].focus();
        await press(calendar, tabKey);
        expect(label(calendar, getFocused(calendar))).to.be.equal(
          'sbb-calendar-day(2025-04-08) in table 0',
        );
      });
    });

    describe('with the selected day in the second month', () => {
      // The stubbed today (2023-10-10) leads to October and November 2023 being displayed.
      const allDaysOfOctoberAndNovember = Array.from({ length: 61 }, (_, i) =>
        toIso8601(new Date(2023, 9, 1 + i)),
      );
      const slottedDays: Record<string, string[]> = {
        default: [],
        enhanced: allDaysOfOctoberAndNovember,
        mixed: ['2023-10-05', '2023-11-15'],
      };

      Object.entries(slottedDays).forEach(([variant, slots]) => {
        (['horizontal', 'vertical'] as const).forEach((orientation) => {
          [true, false].forEach((weekNumbers) => {
            [true, false].forEach((multiple) => {
              it(`leaves the calendar with Tab after navigating back to the first month (variant=${variant} orientation=${orientation} week-numbers=${weekNumbers} multiple=${multiple})`, async () => {
                await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
                const calendar: SbbCalendarElement = await fixture(html`
                  <sbb-calendar
                    orientation=${orientation}
                    amount="2"
                    ?week-numbers=${weekNumbers}
                    ?multiple=${multiple}
                  >
                    ${slots.map((slot) => html`<sbb-calendar-day slot=${slot}></sbb-calendar-day>`)}
                  </sbb-calendar>
                `);
                await waitForLitRender(calendar);
                const outside = document.createElement('button');
                calendar.parentElement!.append(outside);

                const findDay = (iso: string): SbbCalendarDayElement =>
                  getDayCells(calendar).find((day) => toIso8601(day.value!) === iso)!;
                const focusedDay = (): string | null => {
                  const focused = getFocused(calendar);
                  return focused instanceof SbbCalendarDayElement
                    ? toIso8601(focused.value!)
                    : (focused?.localName ?? null);
                };

                // Select a day in the second month.
                const selectedDay = findDay('2023-11-01');
                selectedDay.focus();
                selectedDay.click();
                await waitForLitRender(calendar);
                expect(selectedDay.matches(':state(selected)')).to.be.true;
                expect(focusedDay()).to.be.equal('2023-11-01');

                // Navigate back to the last day of the first month.
                await press(calendar, orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp');
                expect(focusedDay()).to.be.equal('2023-10-31');

                await press(calendar, tabKey);
                expectFocus(calendar, outside, 'Tab from day 2023-10-31:');
              });
            });
          });
        });
      });
    });

    describe('roving tabindex of the days', () => {
      const slottedDays: Record<string, string[]> = {
        default: [],
        enhanced: Array.from({ length: 31 }, (_, i) => toIso8601(new Date(2023, 9, 1 + i))),
        mixed: ['2023-10-25'],
      };

      Object.entries(slottedDays).forEach(([variant, slots]) => {
        (['horizontal', 'vertical'] as const).forEach((orientation) => {
          it(`keeps a single day tab stop while navigating (variant=${variant} orientation=${orientation})`, async () => {
            const calendar: SbbCalendarElement = await fixture(html`
              <sbb-calendar orientation=${orientation} multiple week-numbers>
                ${slots.map((slot) => html`<sbb-calendar-day slot=${slot}></sbb-calendar-day>`)}
              </sbb-calendar>
            `);
            await waitForLitRender(calendar);

            const days = (): SbbCalendarDayElement[] => getDayCells(calendar);
            const focusedDay = (): string | null => {
              const focused = getFocused(calendar);
              return focused instanceof SbbCalendarDayElement
                ? toIso8601(focused.value!)
                : (focused?.localName ?? null);
            };

            days()
              .find((day) => toIso8601(day.value!) === '2023-10-10')!
              .focus();
            const key = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
            await press(calendar, key);
            await press(calendar, key);
            expect(focusedDay()).to.be.equal('2023-10-12');
            expect(
              days()
                .filter((day) => day.tabIndex === 0)
                .map((day) => toIso8601(day.value!)),
            ).to.be.deep.equal(['2023-10-12']);

            await press(calendar, `Shift+${tabKey}`);
            expect(focusedDay()).to.be.equal('sbb-calendar-select-all');
            await press(calendar, tabKey);
            expect(focusedDay()).to.be.equal('2023-10-12');
          });
        });
      });
    });

    describe('without multiple', () => {
      it('does not trap Tab and Shift+Tab with week-numbers and amount 2', async () => {
        const calendar = await createCalendar('horizontal', 2, true, false);
        const outside = document.createElement('button');
        calendar.parentElement!.append(outside);
        const tables = getTables(calendar);
        expect(tables[0].selectAll).to.be.null;
        expect(tables[0].weekdays.length).to.be.equal(0);

        calendar.focus();
        expect(getDayActiveElementValue()).to.be.equal('2025-04-08');
        await press(calendar, tabKey);
        expectFocus(calendar, outside);

        await press(calendar, `Shift+${tabKey}`);
        expect(getDayActiveElementValue()).to.be.equal('2025-04-08');
        await press(calendar, `Shift+${tabKey}`);
        expect(getFocused(calendar)!.localName).to.be.equal('sbb-secondary-button');
      });
    });

    describe('event handling', () => {
      let calendar: SbbCalendarElement;
      let tables: TableCells[];

      const dispatchKeydown = (target: Element, key: string): KeyboardEvent => {
        const event = new KeyboardEvent('keydown', {
          key,
          bubbles: true,
          composed: true,
          cancelable: true,
        });
        target.dispatchEvent(event);
        return event;
      };

      beforeEach(async () => {
        calendar = await createCalendar('horizontal', 2, true);
        tables = getTables(calendar);
      });

      it('prevents default if the focus is moved', async () => {
        tables[0].weekdays[0].focus();
        expect(dispatchKeydown(tables[0].weekdays[0], 'ArrowRight').defaultPrevented).to.be.true;
        expectFocus(calendar, tables[0].weekdays[1]);

        expect(dispatchKeydown(tables[0].weekdays[1], tabKey).defaultPrevented).to.be.true;
        expect(dispatchKeydown(tables[0].selectAll!, 'ArrowDown').defaultPrevented).to.be.true;
        expectFocus(calendar, tables[0].weeknumbers[0]);
      });

      it('does not prevent default for keys that do not move the focus', () => {
        tables[0].weekdays[0].focus();
        // Weekdays are only navigated horizontally in this orientation
        expect(dispatchKeydown(tables[0].weekdays[0], 'ArrowDown').defaultPrevented).to.be.false;
        expect(dispatchKeydown(tables[0].weekdays[0], 'a').defaultPrevented).to.be.false;
        expect(dispatchKeydown(tables[0].weekdays[0], 'Enter').defaultPrevented).to.be.false;
        expect(dispatchKeydown(tables[0].weeknumbers[0], 'ArrowRight').defaultPrevented).to.be
          .false;
        expectFocus(calendar, tables[0].weekdays[0]);
      });

      it('ignores keydown events of elements outside of the cells', () => {
        const control = calendar.shadowRoot!.querySelector('.sbb-calendar__control')!;
        expect(dispatchKeydown(control, 'ArrowRight').defaultPrevented).to.be.false;
        expect(dispatchKeydown(control, tabKey).defaultPrevented).to.be.false;
        expect(dispatchKeydown(control, 'Home').defaultPrevented).to.be.false;
      });
    });

    describe('rtl', () => {
      let calendar: SbbCalendarElement;

      beforeEach(async () => {
        document.documentElement.setAttribute('dir', 'rtl');
        calendar = await createCalendar('horizontal', 2, true);
      });

      afterEach(() => {
        document.documentElement.removeAttribute('dir');
      });

      it('mirrors the horizontal arrow keys of the weekday and select-all group', async () => {
        const [first, second] = getTables(calendar);

        first.weekdays[0].focus();
        await press(calendar, 'ArrowLeft');
        expectFocus(calendar, first.weekdays[1]);
        await press(calendar, 'ArrowRight');
        expectFocus(calendar, first.weekdays[0]);
        await press(calendar, 'ArrowRight');
        expectFocus(calendar, first.selectAll);
        await press(calendar, 'ArrowRight');
        expectFocus(calendar, second.weekdays.at(-1));
        await press(calendar, 'ArrowLeft');
        expectFocus(calendar, first.selectAll);

        // Home/End and vertical keys are not affected
        await press(calendar, 'End');
        expectFocus(calendar, second.weekdays.at(-1));
        await press(calendar, 'Home');
        expectFocus(calendar, first.selectAll);
        await press(calendar, 'ArrowDown');
        expectFocus(calendar, first.weeknumbers[0]);
      });
    });
  });

  describe('misconfiguration', () => {
    it('handles days with no slot', async () => {
      const elem = await fixture(html`
        <sbb-calendar min="2026-01-10" max="2026-01-20">
          <sbb-calendar-day></sbb-calendar-day>
        </sbb-calendar>
      `);

      const day = elem.querySelector<SbbCalendarDayElement>('sbb-calendar-day')!;
      // also, expect not to raise errors
      expect(day.disabled).to.be.false;

      day.slot = '2026-01-25';
      await waitForLitRender(elem);

      expect(day.disabled).to.be.true;
    });
  });
});
