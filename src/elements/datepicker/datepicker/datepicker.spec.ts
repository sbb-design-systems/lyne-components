import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';
import { type SinonStub, stub } from 'sinon';

import type { SbbCalendarDayElement } from '../../calendar.ts';
import { SbbCalendarElement } from '../../calendar.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';
import { i18nDateChangedTo } from '../../core/i18n.ts';
import {
  fixture,
  sbbBreakpointLargeMinPx,
  tabKey,
  typeInElement,
} from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbDateInputElement } from '../../date-input.ts';
import type { SbbFormFieldElement } from '../../form-field.ts';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.ts';

import { SbbDatepickerElement } from './datepicker.component.ts';

import '../../date-input.ts';
import '../../form-field.ts';
import '../datepicker-previous-day.ts';
import '../datepicker-next-day.ts';
import '../datepicker-toggle.ts';

describe(`sbb-datepicker`, () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').returns(new Date(2022, 4, 1, 0, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  it('renders', async () => {
    const element = await fixture(html`<sbb-datepicker></sbb-datepicker>`);
    assert.instanceOf(element, SbbDatepickerElement);
  });

  it('should register related elements with datepicker after input', async () => {
    const root = await fixture(html`
      <div>
        <sbb-date-input id="datepicker-input" value="2021-12-20"></sbb-date-input>
        <sbb-datepicker-toggle
          input="datepicker-input"
          datepicker="datepicker"
        ></sbb-datepicker-toggle>
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
      </div>
    `);

    const element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

    expect(element.input).to.be.equal(input);
    expect(toggle.input).to.be.equal(input);
    expect(toggle.datepicker).to.be.equal(element);
    expect(element.trigger).to.be.equal(toggle);
  });

  it('should register related elements with datepicker before input', async () => {
    const root = await fixture(html`
      <div>
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        <sbb-datepicker-toggle
          input="datepicker-input"
          datepicker="datepicker"
        ></sbb-datepicker-toggle>
        <sbb-date-input id="datepicker-input" value="2021-12-20"></sbb-date-input>
      </div>
    `);

    const element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

    expect(element.input).to.be.equal(input);
    expect(toggle.input).to.be.equal(input);
    expect(toggle.datepicker).to.be.equal(element);
    expect(element.trigger).to.be.equal(toggle);
  });

  it('should register related elements in form field with datepicker after input', async () => {
    const root = await fixture(html`
      <sbb-form-field>
        <sbb-date-input value="2021-12-20"></sbb-date-input>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `);

    const element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

    expect(element.input).to.be.equal(input);
    expect(toggle.input).to.be.equal(input);
    expect(toggle.datepicker).to.be.equal(element);
    expect(element.trigger).to.be.equal(toggle);
  });

  it('should register related elements in form field with datepicker before input', async () => {
    const root = await fixture(html`
      <sbb-form-field>
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-date-input></sbb-date-input>
      </sbb-form-field>
    `);

    const element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

    expect(element.input).to.be.equal(input);
    expect(toggle.input).to.be.equal(input);
    expect(toggle.datepicker).to.be.equal(element);
    expect(element.trigger).to.be.equal(toggle);
  });

  it('renders and opens datepicker programmatically', async () => {
    const root = await fixture(html`
      <div>
        <sbb-datepicker-toggle
          input="datepicker-input"
          datepicker="datepicker"
        ></sbb-datepicker-toggle>
        <sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
        <sbb-date-input id="datepicker-input"></sbb-date-input>
      </div>
    `);
    const datepicker = root.querySelector('sbb-datepicker')!;
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    const openSpy = new EventSpy(SbbDatepickerElement.events.open, datepicker);
    await waitForLitRender(toggle);
    expect(toggle).not.to.have.attribute('disabled');
    expect(datepicker).to.match(':state(state-closed)');

    datepicker.open();

    await openSpy.calledOnce();

    expect(datepicker).to.match(':state(state-opened)');
  });

  it('renders in form field, open datepicker and change date', async () => {
    const root: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
        <sbb-date-input></sbb-date-input>
      </sbb-form-field>
    `);
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    const datepicker = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    expect(datepicker).to.match(':state(state-closed)');
    const openSpy = new EventSpy(SbbDatepickerElement.events.open, datepicker);
    const changeSpy = new EventSpy('change', input);
    const blurSpy = new EventSpy('blur', input);

    toggle.click();
    await openSpy.calledOnce();
    expect(datepicker).to.match(':state(state-opened)');

    const calendar = datepicker.shadowRoot!.querySelector('sbb-calendar')!;
    calendar.dispatchEvent(
      new CustomEvent(SbbCalendarElement.events.dateselected, {
        detail: new Date('2022-01-01'),
      }),
    );
    await waitForLitRender(datepicker);

    expect(input.value).to.be.equal('Sa, 01.01.2022');
    expect(defaultDateAdapter.toIso8601((calendar.selected as Date)!)).to.be.equal('2022-01-01');
    expect(changeSpy.count).to.be.equal(1);
    expect(blurSpy.count).to.be.equal(1);

    // Clear the input value and expect the calendar to clear the previous selected date
    input.value = '';
    input.dispatchEvent(new InputEvent('input'));
    input.dispatchEvent(new InputEvent('change'));
    await waitForLitRender(toggle);

    expect(input.value).to.be.equal('');
    expect(calendar.selected).to.be.null;
  });

  it('handles view property', async function (this: Context) {
    // Test is flaky in Chromium
    this.retries(3);

    const root: SbbFormFieldElement = await fixture(
      html`<sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker view="year"></sbb-datepicker>
        <sbb-date-input></sbb-date-input>
      </sbb-form-field>`,
    );

    const datepicker = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;

    const openSpy = new EventSpy(SbbDatepickerElement.events.open, datepicker);
    const closeSpy = new EventSpy(SbbDatepickerElement.events.close, datepicker);

    // Open calendar
    datepicker.open();
    await openSpy.calledOnce();

    // We have to wait another tick
    await aTimeout(0);

    // Year view should be active
    const calendar = datepicker.shadowRoot!.querySelector('sbb-calendar')!;
    expect(calendar.shadowRoot!.querySelector('.sbb-calendar__table-year-view')!).not.to.be.null;

    // Select year
    calendar.shadowRoot!.querySelectorAll('button')[5].click();
    await waitForLitRender(root);
    await waitForCondition(() => !calendar.matches(':state(transition)'));

    // Select month
    calendar.shadowRoot!.querySelectorAll('button')[5].click();
    await waitForLitRender(root);
    await waitForCondition(() => !calendar.matches(':state(transition)'));

    // Select day
    calendar.shadowRoot!.querySelectorAll('sbb-calendar-day')[4].click();
    await waitForLitRender(root);
    await waitForCondition(() => !calendar.matches(':state(transition)'));

    // Expect selected date and closed calendar
    expect(defaultDateAdapter.toIso8601((calendar.selected as Date)!)).to.be.equal('2020-05-05');
    await closeSpy.calledOnce();

    // Open again
    datepicker.open();
    await openSpy.calledTimes(2);

    // Should open with year view again
    expect(calendar.shadowRoot!.querySelector('.sbb-calendar__table-year-view')!).not.to.be.null;
    expect(
      calendar.shadowRoot!.querySelector('.sbb-calendar__selected')!.textContent!.trim(),
    ).to.be.equal('2020');

    // Close again
    await sendKeys({ press: 'Escape' });
    await closeSpy.calledTimes(2);

    // Changing to month view
    datepicker.view = 'month';
    await waitForLitRender(root);

    // Open again
    datepicker.open();
    await openSpy.calledTimes(3);

    // Month view should be active and correct year preselected
    expect(calendar.shadowRoot!.querySelector('.sbb-calendar__table-month-view')!).not.to.be.null;
    expect(
      calendar
        .shadowRoot!.querySelector('.sbb-calendar__controls-change-date')!
        .textContent!.trim(),
    ).to.be.equal('2020');
  });

  it('renders correctly the calendar when wide is set', async () => {
    await setViewport({ width: sbbBreakpointLargeMinPx, height: 600 });
    const element: SbbFormFieldElement = await fixture(
      html`<sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
        <sbb-date-input></sbb-date-input>
      </sbb-form-field>`,
    );

    const datepicker = element.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const openSpy = new EventSpy(SbbDatepickerElement.events.open, datepicker);

    // Open calendar
    datepicker.open();
    await openSpy.calledOnce();

    // We have to wait another tick
    await aTimeout(0);

    const calendar = datepicker.shadowRoot!.querySelector('sbb-calendar')!;
    expect(calendar.wide, 'calendar.wide').to.be.false;
    expect(
      calendar.shadowRoot!.querySelectorAll('.sbb-calendar__controls-change-date')!.length,
    ).to.be.equal(1);

    datepicker.wide = true;
    await waitForLitRender(element);
    expect(calendar.wide, 'calendar.wide').to.be.true;
    expect(
      calendar.shadowRoot!.querySelectorAll('.sbb-calendar__controls-change-date')!.length,
    ).to.be.equal(2);

    datepicker.input!.dateFilter = (d) => d?.getFullYear() !== 2022;
    await waitForLitRender(element);
    const days = calendar.shadowRoot!.querySelectorAll<SbbCalendarDayElement>('sbb-calendar__day')!;
    for (const button of days) {
      expect(button.classList.contains('sbb-calendar__crossed-out'), button.slot).to.be.true;
    }
  });

  const commonBehaviorTest: (template: TemplateResult) => void = (template: TemplateResult) => {
    let element: SbbDatepickerElement, input: SbbDateInputElement;

    beforeEach(async () => {
      const root = await fixture(template);
      element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
      input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerElement);
      expect(input).dom.to.be.equal(
        `<sbb-date-input contenteditable="plaintext-only" id="datepicker-input" placeholder="DD.MM.YYYY">`,
      );
      expect(element.input).to.be.equal(input);
    });

    it('should interpret valid values and set accessibility labels', async () => {
      const testCases = [
        {
          value: '5.5.0',
          interpretedAs: 'Fr, 05.05.2000',
          accessibilityValue: 'Friday, 05.05.2000',
        },
        {
          value: '8.2.98',
          interpretedAs: 'Su, 08.02.1998',
          accessibilityValue: 'Sunday, 08.02.1998',
        },
        {
          value: '31-12-2020',
          interpretedAs: 'Th, 31.12.2020',
          accessibilityValue: 'Thursday, 31.12.2020',
        },
        {
          value: '5 5 21',
          interpretedAs: 'We, 05.05.2021',
          accessibilityValue: 'Wednesday, 05.05.2021',
        },
        {
          value: '3/7/26',
          interpretedAs: 'Fr, 03.07.2026',
          accessibilityValue: 'Friday, 03.07.2026',
        },
        {
          value: '1.12.2019',
          interpretedAs: 'Su, 01.12.2019',
          accessibilityValue: 'Sunday, 01.12.2019',
        },
        {
          value: '6\\1\\2020',
          interpretedAs: 'Mo, 06.01.2020',
          accessibilityValue: 'Monday, 06.01.2020',
        },
        {
          value: '5,5,2012',
          interpretedAs: 'Sa, 05.05.2012',
          accessibilityValue: 'Saturday, 05.05.2012',
        },
      ];

      for (const testCase of testCases) {
        // Clear input
        input.value = '';

        typeInElement(input, testCase.value);
        input.blur();
        await waitForLitRender(element);

        expect(input.value).to.be.equal(testCase.interpretedAs);
        const paragraphElement = document
          .querySelector<SbbDatepickerElement>('sbb-datepicker')!
          .shadowRoot!.querySelector<HTMLParagraphElement>('p');
        expect(paragraphElement!.innerText).to.be.equal(
          `${i18nDateChangedTo['en']} ${testCase.accessibilityValue}`,
        );
      }
    });

    it('should not touch invalid values', async () => {
      const testCases = [
        { value: '.12.2020', interpretedAs: '.12.2020' },
        { value: '24..1995', interpretedAs: '24..1995' },
        { value: '24.12.', interpretedAs: '24.12.' },
        { value: '34.06.2020', interpretedAs: '34.06.2020' },
        { value: '24.15.2014', interpretedAs: '24.15.2014' },
        { value: 'invalid', interpretedAs: 'invalid' },
      ];

      for (const testCase of testCases) {
        // Clear input
        input.value = '';

        typeInElement(input, testCase.value);
        await sendKeys({ press: tabKey });
        expect(input.value).to.be.equal(testCase.interpretedAs);
        const paragraphElement = document
          .querySelector<SbbDatepickerElement>('sbb-datepicker')!
          .shadowRoot!.querySelector<HTMLParagraphElement>('p');
        expect(paragraphElement!.innerText).to.be.equal('');
      }
    });
  };

  describe('with input', () => {
    commonBehaviorTest(html`
      <div>
        <sbb-datepicker input="datepicker-input"></sbb-datepicker>
        <sbb-date-input id="datepicker-input"></sbb-date-input>
        <button></button>
      </div>
    `);
  });

  describe('with form-field', () => {
    commonBehaviorTest(html`
      <div>
        <sbb-form-field>
          <sbb-datepicker></sbb-datepicker>
          <sbb-date-input id="datepicker-input"></sbb-date-input>
        </sbb-form-field>
        <button></button>
      </div>
    `);
  });

  describe('trigger connection', () => {
    let root: HTMLDivElement, element: SbbDatepickerElement, input: SbbDateInputElement;

    beforeEach(async () => {
      root = await fixture(html`
        <div>
          <sbb-datepicker input="input-1"></sbb-datepicker>
          <sbb-date-input id="input-1"></sbb-date-input>
        </div>
      `);
      element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
      input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    });

    it('updates trigger connected by id', async () => {
      input.id = '';
      await waitForLitRender(root);
      expect(element.input).to.be.equal(null);

      input.id = 'input-1';
      await waitForLitRender(root);
      expect(element.input).to.be.equal(input);
    });

    it('accepts trigger as HTML Element', async () => {
      input.id = '';
      await waitForLitRender(element);
      expect(element.input).to.be.equal(null);

      element.input = input;
      await waitForLitRender(element);
      expect(element.input).to.be.equal(input);
    });

    it('allows removing the trigger', async () => {
      expect(element.input).to.be.equal(input);

      element.input = null;
      await waitForLitRender(element);
      expect(element.input).to.be.equal(null);
    });
  });
});
