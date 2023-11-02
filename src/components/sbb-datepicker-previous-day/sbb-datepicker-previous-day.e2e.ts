import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';
import { SbbFormField } from '../sbb-form-field';
import { SbbDatepickerPreviousDay } from './sbb-datepicker-previous-day';

import '../sbb-datepicker';
import '../sbb-form-field';
import './sbb-datepicker-previous-day';

describe('sbb-datepicker-previous-day', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerPreviousDay = await fixture(
        html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
      );
      assert.instanceOf(element, SbbDatepickerPreviousDay);
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      await fixture(html`
        <input id="datepicker-input" value="01-01-2023" />
        <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
      `);
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
  });

  describe('in form field', () => {
    let element: SbbDatepickerPreviousDay, input: HTMLInputElement;

    beforeEach(async () => {
      const form: SbbFormField = await fixture(html`
        <sbb-form-field>
          <input value="20-01-2023" />
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
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
      const form: SbbFormField = await fixture(html`
        <sbb-form-field>
          <input value="20-01-2023" min="1674172800" />
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = form.querySelector('input');
      await waitForLitRender(element);

      expect(input.value).to.be.equal('Fr, 20.01.2023');
      expect(form.querySelector('sbb-datepicker-previous-day')).to.have.attribute('data-disabled');

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
