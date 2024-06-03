import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import { i18nDateChangedTo } from '../../core/i18n.js';
import { fixture, typeInElement } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';

import { SbbDatepickerElement } from './datepicker.js';

import '../../form-field.js';

describe(`sbb-datepicker with ${fixture.name}`, () => {
  it('renders', async () => {
    const element = await fixture(html`<sbb-datepicker></sbb-datepicker>`, {
      modules: ['./datepicker.ts'],
    });
    assert.instanceOf(element, SbbDatepickerElement);
  });

  it('renders and formats date', async () => {
    const element = await fixture(
      html`
        <div>
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        </div>
      `,
      { modules: ['./datepicker.ts'] },
    );

    const input: HTMLInputElement = element.querySelector<HTMLInputElement>('input')!;

    expect(input.value).to.be.equal('Su, 01.01.2023');
  });

  it('renders and interprets iso string date', async () => {
    const element = await fixture(
      html`
        <div>
          <input id="datepicker-input" value="2021-12-20" />
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        </div>
      `,
      { modules: ['./datepicker.ts'] },
    );

    const input: HTMLInputElement = element.querySelector<HTMLInputElement>('input')!;

    expect(input.value).to.be.equal('Mo, 20.12.2021');
  });

  it('renders and interprets timestamp', async () => {
    const element = await fixture(
      html`
        <div>
          <input id="datepicker-input" value="1594512000000" />
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        </div>
      `,
      { modules: ['./datepicker.ts'] },
    );

    const input: HTMLInputElement = element.querySelector<HTMLInputElement>('input')!;

    expect(input.value).to.be.equal('Su, 12.07.2020');
  });

  const commonBehaviorTest: (template: TemplateResult) => void = (template: TemplateResult) => {
    let element: SbbDatepickerElement, input: HTMLInputElement, button: HTMLButtonElement;

    beforeEach(async () => {
      const root = await fixture(template, {
        modules: ['./datepicker.ts', '../../form-field.ts'],
      });
      element = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
      input = root.querySelector<HTMLInputElement>('input')!;
      button = root.querySelector<HTMLButtonElement>('button')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerElement);
      expect(input).dom.to.be.equal(
        '<input id="datepicker-input" placeholder="DD.MM.YYYY" type="text">',
      );
    });

    it('renders and emit event on value change', async function (this: Context) {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '20/01/2023');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and interpret two digit year correctly in 2000s', async function (this: Context) {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '20/01/12');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input.value).to.be.equal('Fr, 20.01.2012');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and interpret two digit year correctly in 1900s', async function (this: Context) {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '20/01/99');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input.value).to.be.equal('We, 20.01.1999');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects missing month error', async () => {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '20..2012');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects missing year error', async () => {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '20.05.');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects invalid month error', async () => {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '20.00.2012');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects invalid day error', async () => {
      const changeSpy = new EventSpy('change', element);
      typeInElement(input, '00.05.2020');
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders with errors when typing letters', async () => {
      expect(input.value).to.be.equal('');
      typeInElement(input, 'invalid', { key: 'Enter', keyCode: 13 });
      await waitForLitRender(element);
      expect(input.value).to.be.equal('invalid');
      expect(input).to.have.attribute('data-sbb-invalid');
    });

    it('renders and emits event when input parameter changes', async () => {
      const datePickerUpdatedSpy = new EventSpy('datePickerUpdated');
      element.wide = true;
      await waitForCondition(() => datePickerUpdatedSpy.events.length === 1);
      expect(datePickerUpdatedSpy.count).to.be.equal(1);
      element.dateFilter = () => false;
      await waitForLitRender(element);
      await waitForCondition(() => datePickerUpdatedSpy.events.length === 2);
      expect(datePickerUpdatedSpy.count).to.be.equal(2);
    });

    it('renders and interprets date with custom parse and format functions', async () => {
      const changeSpy = new EventSpy('change', element);

      element.dateParser = (s) => {
        s = s.replace(/\D/g, ' ').trim();
        const date = s.split(' ');
        const now = new Date(2023, 8, 15, 0, 0, 0, 0);
        return new Date(now.getFullYear(), +date[1] - 1, +date[0]);
      };
      element.format = (d) => {
        //Intl.DateTimeFormat API is not available in test environment.
        const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const weekday = weekdays[d.getDay()];
        const date = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(
          2,
          '0',
        )}`;
        return `${weekday}, ${date}`;
      };
      await waitForLitRender(element);
      typeInElement(input, '7.8', { key: 'Enter', keyCode: 13 });
      await waitForCondition(() => changeSpy.events.length === 1);
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Mo, 07.08');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should emit validation change event', async () => {
      let validationChangeSpy = new EventSpy('validationChange', element);

      typeInElement(input, '20');
      input.blur();
      await waitForLitRender(element);

      // Then validation event should emit with false
      await waitForCondition(() => validationChangeSpy.events.length === 1);
      expect((validationChangeSpy.lastEvent as CustomEvent).detail['valid']).to.be.equal(false);
      expect(input).to.have.attribute('data-sbb-invalid');

      // When adding valid date
      typeInElement(input, '.');
      await sendKeys({ press: 'Tab' });

      // Then validation event should not be emitted a second time
      expect(validationChangeSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('data-sbb-invalid');

      // Reset event spy
      validationChangeSpy = new EventSpy('validationChange', element);

      // When adding missing parts of a valid date
      typeInElement(input, '8.23');
      input.blur();

      // Then validation event should be emitted with true
      await waitForCondition(() => validationChangeSpy.events.length === 1);
      expect((validationChangeSpy.lastEvent as CustomEvent).detail['valid']).to.be.equal(true);
      expect(input).not.to.have.attribute('data-sbb-invalid');
    });

    it('should interpret valid values and set accessibility labels', async function (this: Context) {
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

    it('should not touch invalid values', async function (this: Context) {
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
        await sendKeys({ press: 'Tab' });
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
        <input id="datepicker-input" />
        <button></button>
      </div>
    `);
  });

  describe('with form-field', () => {
    commonBehaviorTest(html`
      <div>
        <sbb-form-field>
          <sbb-datepicker></sbb-datepicker>
          <input id="datepicker-input" />
        </sbb-form-field>
        <button></button>
      </div>
    `);
  });
});
