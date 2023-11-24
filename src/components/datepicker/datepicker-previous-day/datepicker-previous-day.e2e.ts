import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import { SbbFormField } from '../../form-field';
import type { SbbDatepicker } from '../datepicker';

import { SbbDatepickerPreviousDay } from './datepicker-previous-day';

import '../datepicker';

const ssrModules = ['./datepicker-previous-day.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-datepicker-previous-day rendered with ${fixture.name}`, () => {
    afterEach(() => {
      cleanupFixtures();
    });

    describe('standalone', () => {
      it('renders', async () => {
        const element: SbbDatepickerPreviousDay = await fixture(
          html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
          { modules: ssrModules },
        );
        assert.instanceOf(element, SbbDatepickerPreviousDay);
      });
    });

    describe('with picker', () => {
      it('renders and click', async () => {
        await fixture(
          html`
            <input id="datepicker-input" value="01-01-2023" />
            <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
            <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
          `,
          { modules: ssrModules },
        );
        const element: SbbDatepickerPreviousDay = document.querySelector(
          'sbb-datepicker-previous-day',
        );
        const input: HTMLInputElement = document.querySelector('input');
        await waitForLitRender(element);
        assert.instanceOf(element, SbbDatepickerPreviousDay);
        expect(input.value).to.be.equal('Su, 01.01.2023');

        const changeSpy = new EventSpy('change', input);
        const blurSpy = new EventSpy('blur', input);
        element.click();
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy.count).to.be.equal(1);
        expect(blurSpy.count).to.be.equal(1);

        expect(input.value).to.be.equal('Sa, 31.12.2022');
      });

      it('datepicker is created after the component', async () => {
        const doc = await fixture(
          html`
            <div id="parent">
              <input id="datepicker-input" value="01-01-2023" />
              <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
            </div>
          `,
          { modules: ssrModules },
        );
        await waitForLitRender(doc);

        const prevButton: SbbDatepickerPreviousDay = doc.querySelector(
          'sbb-datepicker-previous-day',
        );
        const inputUpdated: EventSpy<Event> = new EventSpy(
          'inputUpdated',
          document.querySelector('#parent'),
        );
        // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
        expect(prevButton).not.to.be.null;
        expect(inputUpdated.count).to.be.equal(0);
        expect(prevButton.dataset.disabled).to.be.equal('');

        const picker: SbbDatepicker = document.createElement('sbb-datepicker');
        picker.setAttribute('input', 'datepicker-input');
        picker.setAttribute('id', 'datepicker');
        picker.setAttribute('value', '01-01-2023');
        doc.appendChild(picker);
        await waitForLitRender(doc);

        // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
        expect(inputUpdated.count).to.be.equal(2);
        expect(prevButton.dataset.disabled).to.be.undefined;
      });

      it('datepicker is created after the component with different parent', async () => {
        const doc = await fixture(
          html`
            <div id="parent">
              <input id="datepicker-input" value="01-01-2023" />
              <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
            </div>
            <div id="other"></div>
          `,
          { modules: ssrModules },
        );
        await waitForLitRender(doc);

        const prevButton: SbbDatepickerPreviousDay = doc.querySelector(
          'sbb-datepicker-previous-day',
        );
        const inputUpdated: EventSpy<Event> = new EventSpy(
          'inputUpdated',
          document.querySelector('#parent'),
        );
        // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
        expect(prevButton).not.to.be.null;
        expect(inputUpdated.count).to.be.equal(0);
        expect(prevButton.dataset.disabled).to.be.equal('');

        const picker: SbbDatepicker = document.createElement('sbb-datepicker');
        picker.setAttribute('input', 'datepicker-input');
        picker.setAttribute('id', 'datepicker');
        picker.setAttribute('value', '01-01-2023');
        document.querySelector('#other').appendChild(picker);
        await waitForLitRender(doc);

        // the datepicker is connected on a different parent, so no changes are triggered
        expect(inputUpdated.count).to.be.equal(0);
        expect(prevButton.dataset.disabled).to.be.equal('');
      });
    });

    describe('in form field', () => {
      let element: SbbDatepickerPreviousDay, input: HTMLInputElement;

      beforeEach(async () => {
        const form: SbbFormField = await fixture(
          html`
            <sbb-form-field>
              <input value="20-01-2023" />
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `,
          { modules: ssrModules },
        );
        element = form.querySelector('sbb-datepicker-previous-day');
        input = form.querySelector('input');
        await waitForLitRender(element);
      });

      it('renders', async () => {
        assert.instanceOf(element, SbbDatepickerPreviousDay);
      });

      it('click', async () => {
        expect(input.value).to.be.equal('Fr, 20.01.2023');
        const changeSpy = new EventSpy('change', input);
        const blurSpy = new EventSpy('blur', input);
        element.click();
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy.count).to.be.equal(1);
        expect(blurSpy.count).to.be.equal(1);
        expect(input.value).to.be.equal('Th, 19.01.2023');
      });

      it('disabled due min equals to value', async () => {
        const form: SbbFormField = await fixture(
          html`
            <sbb-form-field>
              <input value="20-01-2023" min="1674172800" />
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `,
          { modules: ssrModules },
        );
        input = form.querySelector('input');
        await waitForLitRender(element);

        expect(input.value).to.be.equal('Fr, 20.01.2023');
        expect(form.querySelector('sbb-datepicker-previous-day')).to.have.attribute(
          'data-disabled',
        );

        element.click();
        await waitForLitRender(element);
        expect(input.value).to.be.equal('Fr, 20.01.2023');
      });

      it('disabled due disabled picker', async () => {
        expect(input.value).to.be.equal('Fr, 20.01.2023');
        document.querySelector('input').setAttribute('disabled', '');
        await waitForLitRender(element);

        expect(element).to.have.attribute('data-disabled');
        element.click();
        await waitForLitRender(element);
        expect(input.value).to.be.equal('Fr, 20.01.2023');
      });
    });
  });
}
