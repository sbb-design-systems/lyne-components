import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbDateInputElement } from '../../date-input.ts';
import type { SbbFormFieldElement } from '../../form-field.ts';

import { SbbDatepickerNextDayElement } from './datepicker-next-day.component.ts';

import '../datepicker.ts';
import '../../date-input.ts';
import '../../form-field/form-field.ts';

describe(`sbb-datepicker-next-day`, () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerNextDayElement = await fixture(
        html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
      );
      assert.instanceOf(element, SbbDatepickerNextDayElement);
    });
  });

  it('renders and click', async () => {
    const root = await fixture(html`
      <div>
        <sbb-date-input id="datepicker-input" value="2022-12-31"></sbb-date-input>
        <sbb-datepicker-next-day input="datepicker-input"></sbb-datepicker-next-day>
      </div>
    `);

    const element = root.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;

    const changeSpy = new EventSpy('change', input);
    const blurSpy = new EventSpy('blur', input);

    assert.instanceOf(element, SbbDatepickerNextDayElement);
    expect(input.value).to.be.equal('Sa, 31.12.2022');

    element.click();
    await changeSpy.calledOnce();

    expect(changeSpy.count).to.be.equal(1);
    expect(blurSpy.count).to.be.equal(1);
    expect(input.value).to.be.equal('Su, 01.01.2023');
  });

  it('date input is created after the component', async () => {
    const element = await fixture(html`
      <div>
        <sbb-datepicker-next-day input="datepicker-input"></sbb-datepicker-next-day>
      </div>
    `);

    const nextButton: SbbDatepickerNextDayElement =
      element.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    // there's no date input, so the button is disabled
    expect(nextButton).not.to.be.null;
    expect(nextButton.disabled).to.be.true;

    const input = document.createElement('sbb-date-input');
    input.setAttribute('id', 'datepicker-input');
    input.setAttribute('value', '01-01-2023');
    element.appendChild(input);
    await waitForLitRender(element);

    expect(nextButton.disabled).to.be.false;
  });

  it('date input is created after the component with different parent', async () => {
    const element = await fixture(html`
      <div>
        <div id="parent">
          <sbb-datepicker-next-day input="datepicker-input"></sbb-datepicker-next-day>
        </div>
        <div id="other"></div>
      </div>
    `);

    const nextButton =
      element.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    // there's no date input, so the button is disabled
    expect(nextButton).not.to.be.null;
    expect(nextButton.disabled).to.be.true;

    const input = document.createElement('sbb-date-input');
    input.setAttribute('id', 'datepicker-input');
    input.setAttribute('value', '01-01-2023');
    element.querySelector<HTMLDivElement>('#other')!.appendChild(input);
    await waitForLitRender(element);

    expect(nextButton.disabled).to.be.false;
  });

  describe('in form field', () => {
    let element: SbbDatepickerNextDayElement, input: SbbDateInputElement;

    beforeEach(async () => {
      const form = await fixture<SbbFormFieldElement>(html`
        <sbb-form-field>
          <sbb-date-input value="2023-01-21"></sbb-date-input>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      element = form.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      input = form.querySelector<SbbDateInputElement>('sbb-date-input')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerNextDayElement);
    });

    it('should assign itself to correct slot', async () => {
      expect(element.slot).to.be.equal('suffix');
    });

    it('should assign itself to correct slot if placed before date input', async () => {
      const form = await fixture<SbbFormFieldElement>(html`
        <sbb-form-field>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-date-input value="2023-01-21"></sbb-date-input>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      expect(form.querySelector('sbb-datepicker-next-day')!.slot).to.be.equal('prefix');
    });

    it('click', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 22.01.2023');
    });

    it('navigates to invalid date', async () => {
      input.dateFilter = (d) => d!.getTime() < 1674255600001;
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      const changeSpy = new EventSpy('change', input);
      expect(input.validity.valid).to.be.true;

      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 22.01.2023');
      expect(input.validity.valid).to.be.false;
    });

    it('disabled due max value equals to value', async () => {
      const form: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <sbb-date-input value="2023-01-21" max="2023-01-21"></sbb-date-input>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = form.querySelector<SbbDateInputElement>('sbb-date-input')!;
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      expect(form.querySelector('sbb-datepicker-next-day')?.disabled).to.be.true;

      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });

    it('disabled due disabled picker', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      input.toggleAttribute('disabled', true);

      await waitForLitRender(element);

      expect(element.disabled).to.be.true;
      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });
  });

  it('renders with datepicker and input disabled', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-date-input disabled></sbb-date-input>
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    const element = page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    expect(element.disabled).to.be.true;
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-date-input readonly></sbb-date-input>
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    const element = page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    expect(element.disabled).to.be.true;
  });
});
