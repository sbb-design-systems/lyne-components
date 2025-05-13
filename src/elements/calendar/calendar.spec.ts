import { assert, expect } from '@open-wc/testing';
import { SbbBreakpointLargeMin } from '@sbb-esta/lyne-design-tokens';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button/secondary-button.js';
import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.js';

import { SbbCalendarElement } from './calendar.component.js';

import '../button.js';

describe(`sbb-calendar`, () => {
  let element: SbbCalendarElement;

  const getActiveElementValue: () => string | null = () =>
    document.activeElement!.shadowRoot!.activeElement!.getAttribute('value');
  const getActiveElementText: () => string = () =>
    (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText;

  const waitForTransition = async (): Promise<void> => {
    //Wait for the transition to be over
    await waitForCondition(() => !element.hasAttribute('data-transition'));

    await waitForLitRender(element);

    //Wait for the new table to be rendered completely
    await waitForCondition(
      () => Array.from(element.shadowRoot!.querySelectorAll('.sbb-calendar__cell')).length > 0,
    );
  };

  const goToNextView = async (element: SbbCalendarElement): Promise<void> => {
    const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
      "sbb-secondary-button[icon-name='chevron-small-right-small']",
    )!;

    nextButton.click();
    await waitForTransition();
  };

  describe('horizontal', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar now="2023-01-10" selected="2023-01-15"></sbb-calendar>`,
      );
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbCalendarElement);
    });

    it('highlights current day', async () => {
      const currentDayButton = element.shadowRoot!.querySelector('button[value="2023-01-10"]');
      expect(currentDayButton).to.have.class('sbb-calendar__cell-current');
    });

    it('renders and navigates to next month', async () => {
      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-01-01');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-next',
      )!;
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-02-01');
    });

    it('renders and navigates to previous month', async () => {
      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-01-01');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-previous',
      )!;
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2022-12-01');
    });

    it('sets max and next month button gets disabled', async () => {
      element.max = new Date('2023-01-29');
      await waitForLitRender(element);

      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-01-01');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-next',
      )!;
      expect(nextMonthButton).to.have.attribute('disabled');
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-01-01');
    });

    it('sets min and previous month button gets disabled', async () => {
      element.min = new Date('2023-01-15');
      await waitForLitRender(element);

      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-01-01');

      const nextMonthButton = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-previous',
      ) as HTMLElement;
      expect(nextMonthButton).to.have.attribute('disabled');
      nextMonthButton.click();
      await waitForLitRender(element);

      // this works because the first element from querySelector is the first day of the month; it's not valid in vertical
      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('value')).to.be.equal('2023-01-01');
    });

    it('selects a different date', async () => {
      const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);
      const selectedDate = element.shadowRoot!.querySelector('button[value="2023-01-15"]');

      expect(selectedDate).to.have.class('sbb-calendar__selected');

      const newSelectedDate = element.shadowRoot!.querySelector(
        'button[value="2023-01-18"]',
      ) as HTMLElement;
      expect(newSelectedDate).not.to.have.class('sbb-calendar__selected');
      newSelectedDate.click();
      await selectedSpy.calledOnce();

      expect(selectedDate).not.to.have.class('sbb-calendar__selected');
      expect(newSelectedDate).to.have.class('sbb-calendar__selected');
      expect(selectedSpy.count).to.be.greaterThan(0);
    });

    it("clicks on disabled day and doesn't change selection", async () => {
      const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);

      element.max = new Date('2023-01-29');
      await waitForLitRender(element);

      const day = element.shadowRoot!.querySelector('button[value="2023-01-30"]') as HTMLElement;
      expect(day).to.have.attribute('disabled');
      expect(day).not.to.have.class('sbb-calendar__selected');
      day.click();
      await waitForLitRender(element);

      expect(day).not.to.have.class('sbb-calendar__selected');
      expect(selectedSpy.count).not.to.be.greaterThan(0);
    });

    it('changes to year and month selection views', async () => {
      const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
        '.sbb-calendar__date-selection',
      )!;

      expect(yearSelectionButton).not.to.be.null;
      yearSelectionButton.click();
      await waitForTransition();

      const yearSelection: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__year-selection',
      )!;
      expect(yearSelection).not.to.be.null;
      expect(yearSelection).dom.to.be.equal(`
        <button aria-label="Choose date 2016 - 2039" class="sbb-calendar__controls-change-date" id="sbb-calendar__year-selection" type="button">
          2016 - 2039
          <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-up-small" role="img"></sbb-icon>
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

      await waitForTransition();

      const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__month-selection',
      )!;
      expect(monthSelection).not.to.be.null;
      expect(monthSelection).dom.to.be.equal(`
        <button aria-label="Choose date 2023" class="sbb-calendar__controls-change-date" id="sbb-calendar__month-selection" type="button">
          2023
          <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-up-small" role="img"></sbb-icon>
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

      await waitForTransition();

      const dayCells = Array.from(element.shadowRoot!.querySelectorAll('.sbb-calendar__day'));
      expect(dayCells.length).to.be.equal(31);
    });

    it('opens year view', async () => {
      element.view = 'year';
      await waitForLitRender(element);

      expect(element.shadowRoot!.querySelector('.sbb-calendar__table-year-view')).not.to.be.null;
    });

    it('opens month view', async () => {
      element.view = 'month';
      await waitForLitRender(element);

      expect(element.shadowRoot!.querySelector('.sbb-calendar__table-month-view')).not.to.be.null;
      expect(
        element.shadowRoot!.querySelector('#sbb-calendar__month-selection')!.textContent!.trim(),
      ).to.be.equal('2023');
    });

    it('opens month view with selected date', async () => {
      element.selected = new Date('2017-01-22');
      element.view = 'month';
      await waitForLitRender(element);

      expect(
        element.shadowRoot!.querySelector('#sbb-calendar__month-selection')!.textContent!.trim(),
      ).to.be.equal('2017');
    });

    it('opens month view with current date', async () => {
      element.selected = null;
      element.now = new Date('2022-08-15');
      element.view = 'month';
      await waitForLitRender(element);

      expect(
        element.shadowRoot!.querySelector('#sbb-calendar__month-selection')!.textContent!.trim(),
      ).to.be.equal('2022');
    });

    describe('keyboard navigation', () => {
      it('it should focus on the selected date if it is in the view', () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
      });

      it('it should focus on the first of the month if selected date is not in the view', async () => {
        const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
          '#sbb-calendar__controls-next',
        )!;
        nextMonthButton.click();
        await waitForLitRender(element);
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-02-01');
      });

      it('it should not navigate when unmapped keys are pressed', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'a' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: '1' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
      });

      it('it should not navigate out of bounds', async () => {
        element.focus();
        // go to upper bound
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
        // no navigation before
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
        // go to lower bound
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
        // no navigation after
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
      });

      it('it should navigate left', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-14');
      });

      it('it should navigate right', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-16');
      });

      it('it should navigate up', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-08');
      });

      it('it should navigate down', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-22');
      });

      it('it should navigate to first day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
      });

      it('it should navigate to last day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
      });

      it('it should navigate to column start', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-01');
      });

      it('it should navigate to column end', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-29');
      });
    });
  });

  describe('vertical', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar
          now="2023-01-10"
          selected="2023-01-15"
          orientation="vertical"
        ></sbb-calendar>`,
      );
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbCalendarElement);
    });

    describe('keyboard navigation', () => {
      it('it should focus on the selected date if it is in the view', () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
      });

      it('it should focus on the first of the month if selected date is not in the view', async () => {
        const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
          '#sbb-calendar__controls-next',
        )!;
        nextMonthButton.click();
        await waitForLitRender(element);
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-02-01');
      });

      it('it should navigate left', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-08');
      });

      it('it should navigate right', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-22');
      });

      it('it should navigate up', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-14');
      });

      it('it should navigate down', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-16');
      });

      it('it should navigate to first day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');

        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);

        expect(getActiveElementValue()).to.be.equal('2023-01-01');
      });

      it('it should navigate to last day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-31');
      });

      it('it should navigate to column start', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-09');
      });

      it('it should navigate to column end', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2023-01-15');
      });
    });
  });

  it('renders with min and max', async () => {
    const page: HTMLElement = await fixture(
      html`<sbb-calendar selected="2023-01-20" min="2023-01-09" max="2023-01-29"></sbb-calendar>`,
    );

    const buttonPrevDay = page.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
      "sbb-secondary-button[icon-name='chevron-small-left-small']",
    );
    expect(buttonPrevDay).to.have.attribute('disabled');
    const buttonNextDay = page.shadowRoot!.querySelector(
      "sbb-secondary-button[icon-name='chevron-small-right-small']",
    );
    expect(buttonNextDay).to.have.attribute('disabled');

    const emptyCells = page.shadowRoot!.querySelectorAll('td:not(:has(> button))');
    expect(emptyCells.length).to.be.equal(6);

    const lastDisabledMinDate = page.shadowRoot!.querySelector("[value='2023-01-08']");
    expect(lastDisabledMinDate).to.have.attribute('disabled');
    expect(lastDisabledMinDate).to.have.attribute('aria-disabled', 'true');
    const firstNotDisabledMinDate = page.shadowRoot!.querySelector("[value='2023-01-09']");
    expect(firstNotDisabledMinDate).not.to.have.attribute('disabled');
    expect(firstNotDisabledMinDate).to.have.attribute('aria-disabled', 'false');

    const lastNotDisabledMaxDate = page.shadowRoot!.querySelector("[value='2023-01-29']");
    expect(lastNotDisabledMaxDate).not.to.have.attribute('disabled');
    expect(lastNotDisabledMaxDate).to.have.attribute('aria-disabled', 'false');
    const firstDisabledMaxDate = page.shadowRoot!.querySelector("[value='2023-01-30']");
    expect(firstDisabledMaxDate).to.have.attribute('disabled');
    expect(firstDisabledMaxDate).to.have.attribute('aria-disabled', 'true');
  });

  describe('wide horizontal', () => {
    beforeEach(async () => {
      await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
    });

    it('changes to year and month selection views', async () => {
      element = await fixture(
        html`<sbb-calendar now="2023-01-10" selected="2023-01-15" wide></sbb-calendar>`,
      );

      // Open year selection
      element
        .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
        .click();

      await waitForTransition();

      // Open month selection
      element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2063"]')!.click();

      await waitForTransition();

      element.shadowRoot!.querySelector<HTMLButtonElement>('[aria-label="December 2063"]')!.click();

      await waitForTransition();

      // Day view should be opened with December 2062
      expect(
        element
          .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
          .innerText.trim(),
      ).to.be.equal('December 2063');
    });

    it('renders with min and max', async () => {
      await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
      element = await fixture(
        html`<sbb-calendar
          now="2024-11-04"
          selected="2024-11-20"
          min="2023-11-04"
          max="2026-12-31"
          wide
        ></sbb-calendar>`,
      );

      // Open year selection
      element
        .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
        .click();

      await waitForTransition();

      // Open month selection
      element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!.click();

      await waitForTransition();

      // Check if January 2024 is clickable (first possible)
      expect(
        element.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="January 2024"]'),
      ).not.to.have.attribute('disabled');

      // Check if November 2023 is clickable
      expect(
        element.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="November 2023"]'),
      ).not.to.have.attribute('disabled');

      // Navigate to max page
      await goToNextView(element);
      await goToNextView(element);

      const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
        "sbb-secondary-button[icon-name='chevron-small-right-small']",
      )!;
      expect(nextButton).to.have.attribute('disabled');

      // Check if December 2026 is clickable (last possible)
      expect(
        element.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="December 2026"]'),
      ).not.to.have.attribute('disabled');
    });

    describe('keyboard navigation', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<sbb-calendar now="2025-01-31" selected="2025-01-31" wide></sbb-calendar>`,
        );
      });

      it('it should navigate left', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-30');
      });

      it('it should navigate right', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-02-01');
      });

      it('it should navigate up', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-24');
      });

      it('it should navigate down', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-02-07');
      });

      it('it should navigate to first day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-01');
      });

      it('it should navigate to last day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
      });

      it('it should navigate to column start', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-03');
      });

      it('it should navigate to column end', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
      });
    });
  });

  describe('wide vertical', () => {
    beforeEach(async () => {
      await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
    });

    describe('keyboard navigation', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<sbb-calendar
            now="2025-01-29"
            selected="2025-01-29"
            orientation="vertical"
            wide
          ></sbb-calendar>`,
        );
      });

      it('it should navigate left', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
      });

      it('it should navigate right', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-02-05');
      });

      it('it should navigate up', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-28');
      });

      it('it should navigate down', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-30');
      });

      it('it should navigate to first day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-01');
      });

      it('it should navigate to last day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
      });

      it('it should navigate to column start', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-27');
      });

      it('it should navigate to column end', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-29');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-02-02');
      });
    });
  });

  describe('keyboard navigation for year view', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar now="2023-01-10" selected="2023-01-15"></sbb-calendar>`,
      );

      const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
        '.sbb-calendar__date-selection',
      )!;

      expect(yearSelectionButton).not.to.be.null;
      yearSelectionButton.click();
      await waitForTransition();

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

  describe('date filter applied', () => {
    // selected date is 2025-01-22, Wednesday
    beforeEach(async () => {
      element = await fixture(html`<sbb-calendar selected="2025-01-22"></sbb-calendar>`);
    });

    it('focus the first available day if the selected date is disabled by dateFilter', async () => {
      // the dateFilter function excludes even days
      element.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 1;
      await waitForLitRender(element);
      element.focus();
      expect(getActiveElementValue()).to.be.equal('2025-01-01');
    });

    it('focus the selected date if not disabled by dateFilter', async () => {
      // the dateFilter function excludes odd days
      element.dateFilter = (d: Date | null): boolean => !!d && d.getDate() % 2 === 0;
      await waitForLitRender(element);
      element.focus();
      expect(getActiveElementValue()).to.be.equal('2025-01-22');
    });

    describe('keyboard navigation in horizontal variant', async () => {
      // the dateFilter removes 2 days each 5 and all the thursdays; start date is 2025-01-22, Wed
      beforeEach(async () => {
        element.wide = true;
        element.orientation = 'horizontal';
        element.dateFilter = (d: Date | null): boolean =>
          !!d && (d.getDate() - 1) % 5 < 3 && d.getDay() !== 4;
        await waitForLitRender(element);
      });

      it('it should navigate left', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-21');
      });

      it('it should navigate right', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-26');
      });

      it('it should navigate up', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-08');
      });

      it('it should navigate down', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-02-12');
      });

      it('it should navigate to first day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-01');
      });

      it('it should navigate to last day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
      });

      it('it should navigate to column start', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-01');
      });

      it('it should navigate to column end', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
      });
    });

    describe('keyboard navigation in vertical variant', async () => {
      // the dateFilter removes 2 days each 5 and all the thursdays; start date is 2025-01-22, Wed
      beforeEach(async () => {
        element.wide = true;
        element.orientation = 'vertical';
        element.dateFilter = (d: Date | null): boolean =>
          !!d && (d.getDate() - 1) % 5 < 3 && d.getDay() !== 4;
        await waitForLitRender(element);
      });

      it('it should navigate left', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-08');
      });

      it('it should navigate right', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-02-12');
      });

      it('it should navigate up', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-21');
      });

      it('it should navigate down', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-26');
      });

      it('it should navigate to first day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-01');
      });

      it('it should navigate to last day', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'End' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-31');
      });

      it('it should navigate to column start', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-21');
      });

      it('it should navigate to column end', async () => {
        element.focus();
        expect(getActiveElementValue()).to.be.equal('2025-01-22');
        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);
        expect(getActiveElementValue()).to.be.equal('2025-01-26');
      });
    });
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
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);

        // In horizontal variant, the first cell of each row is the one with the week number
        const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
        const cells = Array.from(rows).map((e) => e.querySelector('td')!);
        expect(cells.length).to.be.equal(5);
        // Due to the multiple property, cells have buttons instead than span.
        expect(cells[0].querySelector('span')).to.be.null;
        const firstButton = cells[0].querySelector('button')!;
        expect(firstButton).not.to.be.null;
        expect(firstButton.textContent!.trim()).to.be.equal('14');
        firstButton.click();
        await selectedSpy.calledOnce();
        let selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(6);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sun Apr 06 2025');
        // if the same button is clicked twice, nothing happens (selected dates don't change)
        firstButton.click();
        expect(selectedSpy.calledTimes(1));

        // With the first row selected, add the second one (emulate Control + click)
        const secondButton = cells[1].querySelector('button')!;
        secondButton.dispatchEvent(
          new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(2);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(13);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Mon Apr 07 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');

        // Click on Wed button: all missing Wednesdays are added (emulate Control + click)
        const header = calendar.shadowRoot!.querySelectorAll('thead th')!;
        const headerButtons = Array.from(header).map((e) => e.querySelector('button')!);
        expect(headerButtons.length).to.be.equal(8);
        headerButtons[3].dispatchEvent(
          new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(3);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(16);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');
        expect(selectedDates[13].toDateString()).to.be.equal('Wed Apr 16 2025');
        expect(selectedDates[14].toDateString()).to.be.equal('Wed Apr 23 2025');
        expect(selectedDates[15].toDateString()).to.be.equal('Wed Apr 30 2025');

        // Click again on Wed button: all Wednesdays are removed (emulate Control + click)
        headerButtons[3].dispatchEvent(
          new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(4);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(11);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Thu Apr 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Thu Apr 10 2025');

        // Click on a single day to add it (emulate Control + click)
        const thirdRowButtons = rows[2].querySelectorAll('button');
        thirdRowButtons[6].dispatchEvent(
          new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(5);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(12);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[11].toDateString()).to.be.equal('Sat Apr 19 2025');

        // Click on a single day to without Control to reset the list to this single element
        thirdRowButtons[7].click();
        await selectedSpy.calledTimes(6);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(1);
        expect(selectedDates[0].toDateString()).to.be.equal('Sun Apr 20 2025');
      });

      it('renders multiple wide', async () => {
        await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
        const calendar: HTMLElement = await fixture(
          html`<sbb-calendar
            selected="2025-04-08T00:00:00"
            wide
            week-numbers
            multiple
          ></sbb-calendar>`,
        );
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);

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
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun May 04 2025');

        // Clicking on the first week button in the next month should not change the selection,
        // since the dates are the same as before
        const firstButtonSecondMonth = cells[5].querySelector('button')!;
        firstButtonSecondMonth.click();
        expect(selectedSpy.calledTimes(1));

        // Clicks on the first button of the first month does not select dates in the previous (not rendered) one
        const firstButton = cells[0].querySelector('button')!;
        firstButton.click();
        await selectedSpy.calledTimes(2);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(6);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sun Apr 06 2025');

        // Clicking again on the first button of the second month will select dates in the last week of the previous month
        firstButtonSecondMonth.click();
        await selectedSpy.calledTimes(3);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun May 04 2025');
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
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);

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
        expect(selectedDates.length).to.be.equal(6);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sun Apr 06 2025');
        // if the same button is clicked twice, nothing happens (selected dates don't change)
        firstButton.click();
        expect(selectedSpy.calledTimes(1));

        // With the first row selected, add the second one (emulate Command + click)
        const secondButton = cells[2].querySelector('button')!;
        secondButton.dispatchEvent(
          new MouseEvent('click', { metaKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(2);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(13);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Mon Apr 07 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');

        // Click on Wed button: all missing Wednesdays are added (emulate Command + click)
        const rows = calendar.shadowRoot!.querySelectorAll('tbody tr');
        const weekDayCells = Array.from(rows).map((e) => e.querySelector('td button')!);
        expect(weekDayCells.length).to.be.equal(7);
        weekDayCells[2].dispatchEvent(
          new MouseEvent('click', { metaKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(3);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(16);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[12].toDateString()).to.be.equal('Sun Apr 13 2025');
        expect(selectedDates[13].toDateString()).to.be.equal('Wed Apr 16 2025');
        expect(selectedDates[14].toDateString()).to.be.equal('Wed Apr 23 2025');
        expect(selectedDates[15].toDateString()).to.be.equal('Wed Apr 30 2025');

        // Click again on Wed button: all Wednesdays are removed (emulate Command + click)
        weekDayCells[2].dispatchEvent(
          new MouseEvent('click', { metaKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(4);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(11);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Thu Apr 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Tue Apr 08 2025');
        expect(selectedDates[7].toDateString()).to.be.equal('Thu Apr 10 2025');

        // Click on a single day to add it (emulate Control + click)
        const thirdRowButtons = rows[2].querySelectorAll('button');
        thirdRowButtons[5].dispatchEvent(
          new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true }),
        );
        await selectedSpy.calledTimes(5);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(12);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[11].toDateString()).to.be.equal('Wed Apr 30 2025');

        // Click on a single day to without Control to reset the list to this single element
        thirdRowButtons[3].click();
        await selectedSpy.calledTimes(6);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(1);
        expect(selectedDates[0].toDateString()).to.be.equal('Wed Apr 16 2025');
      });

      it('renders multiple wide', async () => {
        await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
        const calendar: HTMLElement = await fixture(
          html` <sbb-calendar
            selected="2025-04-08T00:00:00"
            orientation="vertical"
            week-numbers
            multiple
            wide
          ></sbb-calendar>`,
        );
        const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);

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
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun May 04 2025');

        // Clicking on the first week button in the next month should not change the selection,
        // since the dates are the same as before
        const firstButtonSecondMonth = cellsNext[0].querySelector('button')!;
        firstButtonSecondMonth.click();
        expect(selectedSpy.calledTimes(1));

        // Clicks on the first button of the first month does not select dates in the previous (not rendered) one
        const firstButton = cellsPrev[1].querySelector('button')!;
        firstButton.click();
        await selectedSpy.calledTimes(2);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(6);
        expect(selectedDates[0].toDateString()).to.be.equal('Tue Apr 01 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Wed Apr 02 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sun Apr 06 2025');

        // Clicking again on the first button of the second month will select dates in the last week of the previous month
        firstButtonSecondMonth.click();
        await selectedSpy.calledTimes(3);
        selectedDates = (selectedSpy.lastEvent as CustomEvent<Date[]>).detail;
        expect(selectedDates.length).to.be.equal(7);
        expect(selectedDates[0].toDateString()).to.be.equal('Mon Apr 28 2025');
        expect(selectedDates[1].toDateString()).to.be.equal('Tue Apr 29 2025');
        expect(selectedDates[5].toDateString()).to.be.equal('Sat May 03 2025');
        expect(selectedDates[6].toDateString()).to.be.equal('Sun May 04 2025');
      });
    });
  });
});
