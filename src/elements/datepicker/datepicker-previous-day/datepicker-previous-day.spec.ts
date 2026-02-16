import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbDateInputElement } from '../../date-input.ts';
import type { SbbFormFieldElement } from '../../form-field.ts';

import { SbbDatepickerPreviousDayElement } from './datepicker-previous-day.component.ts';

import '../datepicker.ts';
import '../../date-input.ts';
import '../../form-field/form-field.ts';

describe(`sbb-datepicker-previous-day`, () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerPreviousDayElement = await fixture(
        html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
      );
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    });
  });

  it('renders and click', async () => {
    const root = await fixture(html`
      <div>
        <sbb-datepicker-previous-day input="datepicker-input"></sbb-datepicker-previous-day>
        <sbb-date-input id="datepicker-input" value="2022-12-31"></sbb-date-input>
      </div>
    `);

    const element = root.querySelector<SbbDatepickerPreviousDayElement>(
      'sbb-datepicker-previous-day',
    )!;
    const input = root.querySelector<SbbDateInputElement>('sbb-date-input')!;

    const changeSpy = new EventSpy('change', input);
    const blurSpy = new EventSpy('blur', input);

    assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    expect(input.value).to.be.equal('Sa, 31.12.2022');

    element.click();
    await changeSpy.calledOnce();

    expect(changeSpy.count).to.be.equal(1);
    expect(blurSpy.count).to.be.equal(1);
    expect(input.value).to.be.equal('Fr, 30.12.2022');
  });

  it('date input is created after the component', async () => {
    const element = await fixture(html`
      <div>
        <sbb-datepicker-previous-day input="datepicker-input"></sbb-datepicker-previous-day>
      </div>
    `);

    const nextButton: SbbDatepickerPreviousDayElement =
      element.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
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
          <sbb-datepicker-previous-day input="datepicker-input"></sbb-datepicker-previous-day>
        </div>
        <div id="other"></div>
      </div>
    `);

    const nextButton = element.querySelector<SbbDatepickerPreviousDayElement>(
      'sbb-datepicker-previous-day',
    )!;
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
    let element: SbbDatepickerPreviousDayElement, input: SbbDateInputElement;

    beforeEach(async () => {
      const form = await fixture<SbbFormFieldElement>(html`
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-date-input value="2023-01-21"></sbb-date-input>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      element = form.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      input = form.querySelector<SbbDateInputElement>('sbb-date-input')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    });

    it('should assign itself to correct slot', async () => {
      expect(element.slot).to.be.equal('prefix');
    });

    it('should assign itself to correct slot if placed before date input', async () => {
      const form = await fixture<SbbFormFieldElement>(html`
        <sbb-form-field>
          <sbb-date-input value="2023-01-21"></sbb-date-input>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      expect(form.querySelector('sbb-datepicker-previous-day')!.slot).to.be.equal('suffix');
    });

    it('click', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
    });

    it('disabled due min value equals to value', async () => {
      const form: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-date-input value="2023-01-21" min="2023-01-21"></sbb-date-input>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = form.querySelector<SbbDateInputElement>('sbb-date-input')!;
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      expect(form.querySelector('sbb-datepicker-previous-day')?.disabled).to.be.true;

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
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        <sbb-date-input disabled></sbb-date-input>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `);

    const element = page.querySelector<SbbDatepickerPreviousDayElement>(
      'sbb-datepicker-previous-day',
    )!;
    expect(element.disabled).to.be.true;
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        <sbb-date-input readonly></sbb-date-input>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `);

    const element = page.querySelector<SbbDatepickerPreviousDayElement>(
      'sbb-datepicker-previous-day',
    )!;
    expect(element.disabled).to.be.true;
  });
});
