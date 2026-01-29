import { expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit';
import { type SinonStub, stub } from 'sinon';

import type { SbbSecondaryButtonElement } from '../../button.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import { fixture, sbbBreakpointLargeMinPx } from '../../core/testing/private.ts';
import { waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';
import type { SbbMonthChangeEvent } from '../calendar-enhanced/calendar-enhanced.component.ts';
import { SbbCalendarEnhancedElement } from '../calendar-enhanced/calendar-enhanced.component.ts';
import {
  createSlottedDays,
  monthChangeHandler,
} from '../calendar-enhanced/calendar-enhanced.helper.private.ts';

import type { SbbCalendarBaseElement } from './calendar-base-element.ts';

const getActiveElementText: () => string = () =>
  (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText;

const getActiveElementValue = (element: SbbCalendarBaseElement): string | null => {
  if (element instanceof SbbCalendarEnhancedElement) {
    return (document.activeElement as SbbCalendarDayElement).value;
  } else {
    return document.activeElement!.shadowRoot!.activeElement!.getAttribute('value');
  }
};

const getWaitFromTransitionQuery = (element: SbbCalendarBaseElement): NodeListOf<any> => {
  if (element instanceof SbbCalendarEnhancedElement) {
    return element.querySelectorAll('sbb-calendar-day');
  } else {
    return element.shadowRoot!.querySelectorAll('.sbb-calendar__cell');
  }
};

const getDaysCellsQuery = (
  element: SbbCalendarBaseElement,
): NodeListOf<SbbCalendarDayElement | HTMLButtonElement> => {
  if (element instanceof SbbCalendarEnhancedElement) {
    return element.querySelectorAll<SbbCalendarDayElement>('sbb-calendar-day');
  } else {
    return element.shadowRoot!.querySelectorAll<HTMLButtonElement>('.sbb-calendar__day');
  }
};

export const waitForTransition = async (element: SbbCalendarBaseElement): Promise<void> => {
  // Wait for the transition to be over
  await waitForCondition(() => !element.matches(':state(transition)'));

  await waitForLitRender(element);

  // Wait for the new table to be rendered completely
  await waitForCondition(() => Array.from(getWaitFromTransitionQuery(element)).length > 0);
};

export const focusesCurrentDay = async (element: SbbCalendarBaseElement): Promise<void> => {
  // Open year selection
  const yearSelectionButton = element.shadowRoot!.querySelector<HTMLElement>(
    '.sbb-calendar__date-selection',
  )!;
  yearSelectionButton.click();
  await waitForTransition(element);

  // Select same year
  const year2023Button =
    element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!;

  year2023Button.click();
  await waitForTransition(element);

  const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
    '#sbb-calendar__month-selection',
  )!;
  expect(monthSelection).not.to.be.null;

  const october2023Button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[aria-label="October 2023"]',
  )!;
  expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(october2023Button);

  october2023Button.click();
  await waitForTransition(element);
};

export const focusesSelectedMonth = async (element: SbbCalendarBaseElement): Promise<void> => {
  element.selected = new Date('2023-10-15');
  await waitForLitRender(element);

  // Open year selection
  const yearSelectionButton = element.shadowRoot!.querySelector<HTMLElement>(
    '.sbb-calendar__date-selection',
  )!;
  yearSelectionButton.click();
  await waitForTransition(element);

  // Select same year
  const year2023Button =
    element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!;
  expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(year2023Button);

  year2023Button.click();
  await waitForTransition(element);

  // Check that we're in month selection view
  const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
    '#sbb-calendar__month-selection',
  )!;
  expect(monthSelection).not.to.be.null;

  const october2023Button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[aria-label="October 2023"]',
  )!;
  expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(october2023Button);

  october2023Button.click();
  await waitForTransition(element);
};

export const focusesFirstMonthDifferentYear = async (
  element: SbbCalendarBaseElement,
): Promise<void> => {
  element.selected = new Date('2023-10-15');
  await waitForLitRender(element);

  // Open year selection
  const yearSelectionButton = element.shadowRoot!.querySelector<HTMLElement>(
    '.sbb-calendar__date-selection',
  )!;
  yearSelectionButton.click();
  await waitForTransition(element);

  // Select a different year (2024, not the current year 2023)
  const yearButton = element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2024"]')!;
  yearButton.click();
  await waitForTransition(element);

  // Check that we're in month selection view
  const monthSelection = element.shadowRoot!.querySelector<HTMLElement>(
    '#sbb-calendar__month-selection',
  )!;
  expect(monthSelection).not.to.be.null;

  // Check that the first month (January) has tabindex="0" (is focused)
  const january2024Button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[aria-label="January 2024"]',
  )!;
  expect(document.activeElement!.shadowRoot!.activeElement).to.be.equal(january2024Button);

  january2024Button.click();
  await waitForTransition(element);
};

describe('sbb-calendar-base', async () => {
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

  ['sbb-calendar', 'sbb-calendar-enhanced'].forEach((selector) => {
    let element: SbbCalendarBaseElement;

    describe(`${selector}`, async () => {
      before(() => {
        today = new Date(2023, 0, 10, 0, 0, 0, 0);
      });

      after(() => {
        today = null;
      });

      describe('horizontal', () => {
        beforeEach(async () => {
          element = await fixture(
            selector === 'sbb-calendar'
              ? html`<sbb-calendar selected="2023-01-15"></sbb-calendar>`
              : html` <sbb-calendar-enhanced
                  selected="2023-01-15"
                  @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e)}
                >
                  ${createSlottedDays(2023, 1)}
                </sbb-calendar-enhanced>`,
          );
        });

        it('avoids taking focus on updating', async () => {
          document.body.focus();
          expect(document.activeElement).to.be.equal(document.body);

          // Trigger an update which triggers updated().
          element.wide = true;
          await waitForTransition(element);

          expect(document.activeElement).to.be.equal(document.body);
        });

        it('changes to year and month selection views', async () => {
          const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
            '.sbb-calendar__date-selection',
          )!;

          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForTransition(element);

          const yearSelection: HTMLElement = element.shadowRoot!.querySelector(
            '#sbb-calendar__year-selection',
          )!;
          expect(yearSelection).not.to.be.null;
          expect(yearSelection).dom.to.be.equal(`
            <button aria-label="Choose date 2016 - 2039" class="sbb-calendar__controls-change-date" id="sbb-calendar__year-selection" type="button">
              2016 - 2039
              <sbb-icon name="chevron-small-up-small"></sbb-icon>
            </button>
          `);

          const yearCells: HTMLElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('.sbb-calendar__table-year'),
          );
          expect(yearCells.length).to.be.equal(24);
          expect(yearCells[0]).dom.to.be.equal(`
            <td class="sbb-calendar__table-data sbb-calendar__table-year">
              <button aria-disabled="false" aria-label="2016" aria-pressed="false" class="sbb-calendar__cell sbb-calendar__pill" data-year="2016" tabindex="-1">
                2016
              </button>
            </td>
          `);

          const yearButton: HTMLButtonElement =
            element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!;
          expect(yearButton).to.have.class('sbb-calendar__selected');
          expect(yearCells[yearCells.length - 1].innerText).to.be.equal('2039');

          yearButton.click();

          await waitForTransition(element);

          const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
            '#sbb-calendar__month-selection',
          )!;
          expect(monthSelection).not.to.be.null;
          expect(monthSelection).dom.to.be.equal(`
            <button aria-label="Choose date 2023" class="sbb-calendar__controls-change-date" id="sbb-calendar__month-selection" type="button">
              2023
              <sbb-icon name="chevron-small-up-small"></sbb-icon>
            </button>
          `);

          const monthCells: HTMLElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('.sbb-calendar__table-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          expect(monthCells[0]).dom.to.be.equal(`
            <td class="sbb-calendar__table-data sbb-calendar__table-month">
              <button
                aria-disabled="false"
                aria-label="January 2023"
                aria-pressed="true"
                class="sbb-calendar__cell sbb-calendar__pill sbb-calendar__selected sbb-calendar__cell-current"
                data-month="1"
                tabindex="0">
                Jan
              </button>
            </td>
          `);

          monthCells[0].querySelector('button')!.click();
          await waitForLitRender(element);

          await waitForTransition(element);

          const dayCells: (SbbCalendarDayElement | HTMLButtonElement)[] = Array.from(
            getDaysCellsQuery(element),
          );
          expect(dayCells.length).to.be.equal(31);
          expect(dayCells[0].value).to.be.equal('2023-01-01');
        });

        it('reset view if day is not selected when year/month are changed', async () => {
          // We move from Dec 2023 to Sep 2030
          const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
            '.sbb-calendar__date-selection',
          )!;
          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForTransition(element);

          const yearButton: HTMLButtonElement =
            element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2030"]')!;
          expect(yearButton).not.to.be.null;
          yearButton.click();
          await waitForTransition(element);

          const monthCells: HTMLElement[] = Array.from(
            element.shadowRoot!.querySelectorAll('.sbb-calendar__table-month'),
          );
          expect(monthCells.length).to.be.equal(12);
          monthCells[8].querySelector('button')!.click();
          await waitForLitRender(element);
          await waitForTransition(element);
          const dayCells = Array.from(getDaysCellsQuery(element));
          expect(dayCells.length).to.be.equal(30);
          expect(dayCells[0].value).to.be.equal('2030-09-01');

          // Without selecting a day, change to the year view
          yearSelectionButton.click();
          await waitForTransition(element);
          // Go back to day view again by clicking once more
          const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
            '#sbb-calendar__year-selection',
          )!;
          monthSelection.click();
          await waitForTransition(element);
          // We expect to be in the month of the selected day (Dec 2023)
          const dayCells2 = Array.from(getDaysCellsQuery(element));
          expect(dayCells2.length).to.be.equal(31);
          expect(dayCells2[0].value).to.be.equal('2023-01-01');
        });

        it('does not create horizontal scrollbar when calendar is 100% width in overflow container', async () => {
          const container = document.createElement('div');
          container.style.width = '400px';
          container.style.overflow = 'auto';
          document.body.appendChild(container);

          const testElement = document.createElement(selector);
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

          expect(element.shadowRoot!.querySelector('.sbb-calendar__table-year-view')).not.to.be
            .null;
        });

        it('opens month view', async () => {
          element.view = 'month';
          await waitForLitRender(element);

          expect(element.shadowRoot!.querySelector('.sbb-calendar__table-month-view')).not.to.be
            .null;
          expect(
            element
              .shadowRoot!.querySelector('#sbb-calendar__month-selection')!
              .textContent!.trim(),
          ).to.be.equal('2023');
        });

        it('opens month view with selected date', async () => {
          element.selected = new Date('2017-01-22');
          element.view = 'month';
          await waitForLitRender(element);

          expect(
            element
              .shadowRoot!.querySelector('#sbb-calendar__month-selection')!
              .textContent!.trim(),
          ).to.be.equal('2017');
        });

        it('opens month view with current date', async () => {
          element.selected = null;
          element.view = 'month';
          await waitForLitRender(element);

          expect(
            element
              .shadowRoot!.querySelector('#sbb-calendar__month-selection')!
              .textContent!.trim(),
          ).to.be.equal('2023');
        });

        describe('keyboard navigation', () => {
          it('it should focus on the selected date if it is in the view', () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
          });

          it('it should focus on the first of the month if selected date is not in the view', async () => {
            const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
              '#sbb-calendar__controls-next',
            )!;
            nextMonthButton.click();
            await waitForLitRender(element);
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-02-01');
          });

          it('it should not navigate when unmapped keys are pressed', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'a' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: '1' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
          });

          it('it should not navigate out of bounds', async () => {
            element.focus();
            // go to upper bound
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
            // no navigation before
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
            // go to lower bound
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
            // no navigation after
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-14');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-16');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-08');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-22');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-29');
          });
        });
      });

      describe('vertical', () => {
        beforeEach(async () => {
          element = await fixture(
            selector === 'sbb-calendar'
              ? html`<sbb-calendar selected="2023-01-15" orientation="vertical"></sbb-calendar>`
              : html` <sbb-calendar-enhanced
                  selected="2023-01-15"
                  orientation="vertical"
                  @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e)}
                >
                  ${createSlottedDays(2023, 1)}
                </sbb-calendar-enhanced>`,
          );
        });

        describe('keyboard navigation', () => {
          it('it should focus on the selected date if it is in the view', () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
          });

          it('it should focus on the first of the month if selected date is not in the view', async () => {
            const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
              '#sbb-calendar__controls-next',
            )!;
            nextMonthButton.click();
            await waitForLitRender(element);
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-02-01');
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-08');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-22');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-14');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-16');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');

            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);

            expect(getActiveElementValue(element)).to.be.equal('2023-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-09');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2023-01-15');
          });
        });
      });

      describe('wide', () => {
        beforeEach(async () => {
          await setViewport({ width: sbbBreakpointLargeMinPx, height: 1000 });
        });

        describe('horizontal', () => {
          it('changes to year and month selection views', async function () {
            // Flaky on WebKit
            this.retries(3);

            element = await fixture(
              selector === 'sbb-calendar'
                ? html`<sbb-calendar selected="2023-01-15" wide></sbb-calendar>`
                : html`<sbb-calendar-enhanced
                    selected="2023-01-15"
                    wide
                    @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e)}
                  >
                    ${createSlottedDays(2023, 1)} ${createSlottedDays(2023, 2)}
                  </sbb-calendar-enhanced>`,
            );

            // Open year selection
            element
              .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
              .click();

            await waitForTransition(element);

            // Open month selection
            element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2063"]')!.click();

            await waitForTransition(element);

            element
              .shadowRoot!.querySelector<HTMLButtonElement>('[aria-label="December 2063"]')!
              .click();

            await waitForTransition(element);

            // Day view should be opened with December 2062
            expect(
              element
                .shadowRoot!.querySelector<HTMLButtonElement>(
                  'button.sbb-calendar__date-selection',
                )!
                .innerText.trim(),
            ).to.be.equal('December 2063');
          });

          it('renders with min and max', async () => {
            element = await fixture(
              selector === 'sbb-calendar'
                ? html`<sbb-calendar
                    selected="2024-11-20"
                    min="2023-11-04"
                    max="2026-12-31"
                    wide
                  ></sbb-calendar>`
                : html`<sbb-calendar-enhanced
                    selected="2024-11-20"
                    min="2023-11-04"
                    max="2026-12-31"
                    wide
                  >
                    ${createSlottedDays(2024, 11)} ${createSlottedDays(2024, 12)}
                  </sbb-calendar-enhanced>`,
            );

            // Open year selection
            element
              .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
              .click();

            await waitForTransition(element);

            // Open month selection
            element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!.click();

            await waitForTransition(element);

            // Check if January 2024 is clickable (first possible)
            expect(
              element.shadowRoot!.querySelector<HTMLButtonElement>(
                'button[aria-label="January 2024"]',
              ),
            ).not.to.have.attribute('disabled');

            // Check if November 2023 is clickable
            expect(
              element.shadowRoot!.querySelector<HTMLButtonElement>(
                'button[aria-label="November 2023"]',
              ),
            ).not.to.have.attribute('disabled');

            // Navigate to max page
            const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
              'sbb-secondary-button#sbb-calendar__controls-next',
            )!;

            nextButton.click();
            await waitForTransition(element);
            nextButton.click();
            await waitForTransition(element);
            expect(nextButton).to.have.attribute('disabled');

            // Check if December 2026 is clickable (last possible)
            expect(
              element.shadowRoot!.querySelector<HTMLButtonElement>(
                'button[aria-label="December 2026"]',
              ),
            ).not.to.have.attribute('disabled');
          });

          describe('keyboard navigation', () => {
            beforeEach(async () => {
              element = await fixture(
                selector === 'sbb-calendar'
                  ? html`<sbb-calendar selected="2025-01-31" wide></sbb-calendar>`
                  : html`<sbb-calendar-enhanced selected="2025-01-31" wide>
                      ${createSlottedDays(2025, 1)} ${createSlottedDays(2025, 2)}
                    </sbb-calendar-enhanced>`,
              );
            });

            it('it should navigate left', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-30');
            });

            it('it should navigate right', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-02-01');
            });

            it('it should navigate up', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowUp' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-24');
            });

            it('it should navigate down', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-02-07');
            });

            it('it should navigate to first day', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'Home' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-01');
            });

            it('it should navigate to last day', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'End' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
            });

            it('it should navigate to column start', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'PageUp' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-03');
            });

            it('it should navigate to column end', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
              await sendKeys({ press: 'PageDown' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
            });
          });
        });

        describe('vertical', () => {
          beforeEach(async () => {
            element = await fixture(
              selector === 'sbb-calendar'
                ? html`
                    <sbb-calendar selected="2025-01-29" orientation="vertical" wide></sbb-calendar>
                  `
                : html`
                    <sbb-calendar-enhanced selected="2025-01-29" orientation="vertical" wide>
                      ${createSlottedDays(2025, 1)} ${createSlottedDays(2025, 2)}
                    </sbb-calendar-enhanced>
                  `,
            );
          });

          describe('keyboard navigation', () => {
            it('it should navigate left', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            });

            it('it should navigate right', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-02-05');
            });

            it('it should navigate up', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowUp' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-28');
            });

            it('it should navigate down', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-30');
            });

            it('it should navigate to first day', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'Home' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-01');
            });

            it('it should navigate to last day', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'End' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
            });

            it('it should navigate to column start', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'PageUp' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-01-27');
            });

            it('it should navigate to column end', async () => {
              element.focus();
              expect(getActiveElementValue(element)).to.be.equal('2025-01-29');
              await sendKeys({ press: 'PageDown' });
              await waitForLitRender(element);
              expect(getActiveElementValue(element)).to.be.equal('2025-02-02');
            });
          });
        });
      });

      describe('keyboard navigation for year view', () => {
        beforeEach(async () => {
          element = await fixture(
            selector === 'sbb-calendar'
              ? html`<sbb-calendar selected="2023-01-15"></sbb-calendar>`
              : html`<sbb-calendar-enhanced selected="2023-01-15">
                  ${createSlottedDays(2023, 1)}
                </sbb-calendar-enhanced>`,
          );

          const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
            '.sbb-calendar__date-selection',
          )!;

          expect(yearSelectionButton).not.to.be.null;
          yearSelectionButton.click();
          await waitForTransition(element);

          const years = Array.from(element.shadowRoot!.querySelectorAll('.sbb-calendar__cell'));
          expect(years.length).to.equal(24);

          const selectedYear = years.find(
            (e) => (e as HTMLElement).innerText === '2023',
          ) as HTMLElement;
          await waitForLitRender(element);
          selectedYear.focus();
        });

        it('it should focus on the selected year if it is in the view', () => {
          element.focus();
          expect(getActiveElementText()).to.be.equal('2023');
        });

        it('it should focus on the first year if selected year is not in the view', async () => {
          const nextYearButton: HTMLElement = element.shadowRoot!.querySelector(
            '#sbb-calendar__controls-next',
          )!;
          nextYearButton.click();
          await waitForLitRender(element);
          element.focus();
          expect(getActiveElementText()).to.be.equal('2040');
        });

        it('it should navigate left', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2022');
        });

        it('it should navigate right', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowRight' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2024');
        });

        it('it should navigate up', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowUp' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2019');
        });

        it('it should navigate down', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'ArrowDown' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2027');
        });

        it('it should navigate to first day', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'Home' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2016');
        });

        it('it should navigate to last day', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'End' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2039');
        });

        it('it should navigate to column start', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'PageUp' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2019');
        });

        it('it should navigate to column end', async () => {
          expect(getActiveElementText()).to.be.equal('2023');

          element.focus();
          await sendKeys({ press: 'PageDown' });
          await waitForLitRender(element);

          expect(getActiveElementText()).to.be.equal('2039');
        });
      });

      describe('date-filter applied', () => {
        beforeEach(async () => {
          element = await fixture(
            selector === 'sbb-calendar'
              ? html`<sbb-calendar selected="2025-01-22"></sbb-calendar>`
              : html`<sbb-calendar-enhanced selected="2025-01-22">
                  ${createSlottedDays(2025, 1)}
                </sbb-calendar-enhanced>`,
          );
        });

        it('focus the first available day if the selected date is disabled by dateFilter', async () => {
          // the dateFilter function excludes even days
          element.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 1;
          await waitForLitRender(element);
          element.focus();
          expect(getActiveElementValue(element)).to.be.equal('2025-01-01');
        });

        it('focus the selected date if not disabled by dateFilter', async () => {
          // the dateFilter function excludes odd days
          element.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 0;
          await waitForLitRender(element);
          element.focus();
          expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
        });

        describe('keyboard navigation in horizontal variant', async () => {
          // the dateFilter removes 2 days each 5 and all the thursdays; start date is 2025-01-22, Wed
          beforeEach(async () => {
            element = await fixture(
              selector === 'sbb-calendar'
                ? html`<sbb-calendar
                    selected="2025-01-22"
                    wide
                    orientation="horizontal"
                  ></sbb-calendar>`
                : html`<sbb-calendar-enhanced selected="2025-01-22" wide orientation="horizontal">
                    ${createSlottedDays(2025, 1)} ${createSlottedDays(2025, 2)}
                  </sbb-calendar-enhanced>`,
            );
            element.dateFilter = (d: Date | null): boolean =>
              !!d && (d.getDate() - 1) % 5 < 3 && d.getDay() !== 4;
            await waitForLitRender(element);
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-21');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-26');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-08');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-02-12');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-01');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
          });
        });

        describe('keyboard navigation in vertical variant', async () => {
          // the dateFilter removes 2 days each 5 and all the thursdays; start date is 2025-01-22, Wed
          beforeEach(async () => {
            element = await fixture(
              selector === 'sbb-calendar'
                ? html`<sbb-calendar
                    selected="2025-01-22"
                    wide
                    orientation="vertical"
                  ></sbb-calendar> `
                : html`<sbb-calendar-enhanced selected="2025-01-22" wide orientation="vertical">
                    ${createSlottedDays(2025, 1)} ${createSlottedDays(2025, 2)}
                  </sbb-calendar-enhanced>`,
            );
            element.dateFilter = (d: Date | null): boolean =>
              !!d && (d.getDate() - 1) % 5 < 3 && d.getDay() !== 4;
            await waitForLitRender(element);
          });

          it('it should navigate left', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowLeft' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-08');
          });

          it('it should navigate right', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowRight' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-02-12');
          });

          it('it should navigate up', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-21');
          });

          it('it should navigate down', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'ArrowDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-26');
          });

          it('it should navigate to first day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'Home' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-01');
          });

          it('it should navigate to last day', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'End' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-31');
          });

          it('it should navigate to column start', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageUp' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-21');
          });

          it('it should navigate to column end', async () => {
            element.focus();
            expect(getActiveElementValue(element)).to.be.equal('2025-01-22');
            await sendKeys({ press: 'PageDown' });
            await waitForLitRender(element);
            expect(getActiveElementValue(element)).to.be.equal('2025-01-26');
          });
        });
      });
    });
  });
});
