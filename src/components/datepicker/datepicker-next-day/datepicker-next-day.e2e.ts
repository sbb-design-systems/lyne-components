import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import { SbbFormField } from '../../form-field';
import type { SbbDatepicker } from '../datepicker';

import { SbbDatepickerNextDay } from './datepicker-next-day';

import '../datepicker';

describe('sbb-datepicker-next-day', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerNextDay = await fixture(
        html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
      );
      assert.instanceOf(element, SbbDatepickerNextDay);
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page = await fixture(html`
        <div>
          <input id="datepicker-input" value="31-12-2022" />
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
          <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
        </div>
      `);

      const element: SbbDatepickerNextDay = page.querySelector('sbb-datepicker-next-day');
      await waitForLitRender(element);
      const input: HTMLInputElement = page.querySelector('input');

      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);

      assert.instanceOf(element, SbbDatepickerNextDay);
      expect(input.value).to.be.equal('Sa, 31.12.2022');

      await element.click();

      await waitForCondition(() => changeSpy.events.length >= 1);

      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 01.01.2023');
    });

    it('datepicker is created after the component', async () => {
      const doc = await fixture(html`
        <div id="parent">
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
        </div>
      `);
      await waitForLitRender(doc);

      const nextButton: SbbDatepickerNextDay = doc.querySelector('sbb-datepicker-next-day');
      const inputUpdated: EventSpy<Event> = new EventSpy(
        'inputUpdated',
        document.querySelector('#parent'),
      );
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(nextButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton.dataset.disabled).to.be.equal('');

      const picker: SbbDatepicker = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      doc.appendChild(picker);
      await waitForLitRender(doc);

      // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
      expect(inputUpdated.count).to.be.equal(2);
      expect(nextButton.dataset.disabled).to.be.undefined;
    });

    it('datepicker is created after the component with different parent', async () => {
      const doc = await fixture(html`
        <div id="parent">
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
        </div>
        <div id="other"></div>
      `);
      await waitForLitRender(doc);

      const nextButton: SbbDatepickerNextDay = doc.querySelector('sbb-datepicker-next-day');
      const inputUpdated: EventSpy<Event> = new EventSpy(
        'inputUpdated',
        document.querySelector('#parent'),
      );
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(nextButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton.dataset.disabled).to.be.equal('');

      const picker: SbbDatepicker = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      document.querySelector('#other').appendChild(picker);
      await waitForLitRender(doc);

      // the datepicker is connected on a different parent, so no changes are triggered
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton.dataset.disabled).to.be.equal('');
    });
  });

  describe('in form field', () => {
    let element: SbbDatepickerNextDay, input: HTMLInputElement;

    beforeEach(async () => {
      const form: SbbFormField = await fixture(html`
        <sbb-form-field>
          <input value="21-01-2023" />
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `);
      element = form.querySelector('sbb-datepicker-next-day');
      input = form.querySelector('input');
      await waitForLitRender(element);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerNextDay);
    });

    it('click', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 22.01.2023');
    });

    it('disabled due max value equals to value', async () => {
      const form: SbbFormField = await fixture(html`
        <sbb-form-field>
          <input value="21-01-2023" max="1674255600" />
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = form.querySelector('input');
      await waitForLitRender(element);

      expect(input.value).to.be.equal('Sa, 21.01.2023');
      await waitForLitRender(element);

      expect(form.querySelector('sbb-datepicker-next-day')).to.have.attribute('data-disabled');

      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });

    it('disabled due disabled picker', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      document.querySelector('input').setAttribute('disabled', '');

      await waitForLitRender(element);

      expect(element).to.have.attribute('data-disabled');
      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });
  });
});
