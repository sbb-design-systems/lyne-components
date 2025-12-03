import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import { clearElement, fixture, typeInElement } from '../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../core/testing.ts';
import type { SbbFormFieldElement } from '../form-field.ts';

import { SbbTimeInputElement } from './time-input.component.ts';

import '../form-field/form-field.ts';

describe(`sbb-time-input`, () => {
  let element: SbbTimeInputElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-time-input></sbb-time-input>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimeInputElement);
  });

  it('should configure input', async () => {
    expect(element).to.have.attribute('inputMode', 'numeric');
    expect(element).to.have.attribute('placeholder', 'HH:MM');
  });

  it('should emit form events', async () => {
    const changeSpy = new EventSpy('change', element);
    const inputSpy = new EventSpy('input', element);

    element.focus();
    await sendKeys({ press: '1' });
    element.blur();
    await waitForLitRender(element);

    await changeSpy.calledOnce().then(() => {
      expect(element.value).to.be.equal('01:00');
    });

    expect(inputSpy.count, 'sbb-time-input input event').to.be.equal(1);
    expect(changeSpy.count, 'sbb-time-input change event').to.be.equal(1);
  });

  it('should validate', async () => {
    expect(element.validity.rangeOverflow).to.be.false;

    // When entering 99
    typeInElement(element, '99');
    element.blur();

    expect(element).to.match(':invalid');
    expect(element.validity.rangeOverflow).to.be.true;

    // When adding another 9 (999)
    element.focus();
    await sendKeys({ press: 'ArrowRight' }); // Fix for Firefox: de-highlight text
    typeInElement(element, '9');
    element.blur();

    expect(element).to.match(':invalid');
    expect(element.validity.rangeOverflow).to.be.true;

    // When deleting trailing two nines (convert value to 9 which is valid)
    element.focus();
    await sendKeys({ press: 'Backspace' });
    await sendKeys({ press: 'Backspace' });
    element.blur();

    expect(element).to.match(':valid');
    expect(element.validity.rangeOverflow).to.be.false;
  });

  it('should handle null as value', async () => {
    element.value = null!;

    expect(element.value).to.be.equal('');
    expect(element.valueAsDate).to.be.equal(null);
  });

  it('should handle undefined as value', async () => {
    element.value = undefined!;

    expect(element.value).to.be.equal('');
    expect(element.valueAsDate).to.be.equal(null);
  });

  it('should validate when empty', async () => {
    // Creating invalid entry
    typeInElement(element, '99');
    element.blur();
    await waitForLitRender(element);

    // When deleting input to achieve empty input
    element.focus();
    await sendKeys({ press: 'Backspace' });
    await sendKeys({ press: 'Backspace' });
    element.blur();

    expect(element).to.match(':valid');
  });

  it('should interpret valid values', async function (this: Context) {
    const testCases = [
      { value: '0', interpretedAs: '00:00' },
      { value: '1', interpretedAs: '01:00' },
      { value: '12', interpretedAs: '12:00' },
      { value: '123', interpretedAs: '01:23' },
      { value: '1.2', interpretedAs: '01:02' },
      { value: '1.12', interpretedAs: '01:12' },
      { value: '1,12', interpretedAs: '01:12' },
      { value: '1:12', interpretedAs: '01:12' },
      { value: '1h12', interpretedAs: '01:12' },
      { value: '1_12', interpretedAs: '01:12' },
      { value: '1;12', interpretedAs: '01:12' },
      { value: '1-12', interpretedAs: '01:12' },
      { value: '01:12', interpretedAs: '01:12' },
      { value: '12:', interpretedAs: '12:00' },
      { value: '12.3', interpretedAs: '12:03' },
      { value: ':00', interpretedAs: '00:00' },
      { value: ':01', interpretedAs: '00:01' },
      { value: ':1', interpretedAs: '00:01' },
      { value: 'h', interpretedAs: '00:00' },
      { value: '.', interpretedAs: '00:00' },
      { value: ':', interpretedAs: '00:00' },
    ];

    for (const testCase of testCases) {
      // Clear input
      element.value = '';

      typeInElement(element, testCase.value);
      element.blur();
      await waitForLitRender(element);
      expect(element.value).to.be.equal(testCase.interpretedAs);
    }
  });

  it('should not touch invalid values', async () => {
    const testCases = [
      { value: '99', interpretedAs: '99' },
      { value: '24', interpretedAs: '24' },
      { value: 'hh', interpretedAs: 'hh' },
      { value: '', interpretedAs: '' },
      { value: '00:66', interpretedAs: '00:66' },
    ];

    for (const testCase of testCases) {
      // Clear input
      element.value = '';

      if (testCase.value) {
        typeInElement(element, testCase.value);
      } else {
        clearElement(element);
      }

      element.blur();
      await waitForLitRender(element);
      expect(element.value).to.be.equal(testCase.interpretedAs);
    }
  });

  it('should prevent char insertion', async () => {
    typeInElement(element, '1V');
    expect(element.value).to.be.equal('1');
  });

  it('should handle deletion', async () => {
    element.value = '12:00';

    await waitForLitRender(element);
    element.focus();
    const selection = window.getSelection();
    selection!.collapse(element, 0);
    // Move the cursor to the start
    selection!.modify('move', 'backward', 'word');

    await sendKeys({ press: 'Delete' });
    await sendKeys({ press: 'Delete' });

    expect(element.value).to.be.equal(':00');
    await sendKeys({ press: 'Enter' });
    expect(element.value).to.be.equal('00:00');
  });

  it('should set and get value as a date', async () => {
    const date = new Date('2023-01-01T15:00:00');

    element.valueAsDate = date;
    await waitForLitRender(element);

    expect(element.value).to.be.equal('15:00');

    const dateCalculated = element.valueAsDate.getTime();
    expect(new Date(dateCalculated).getHours()).to.be.equal(date.getHours());
    expect(new Date(dateCalculated).getMinutes()).to.be.equal(date.getMinutes());
  });

  describe('form field integration', () => {
    let formField: SbbFormFieldElement;

    beforeEach(async () => {
      formField = await fixture(
        html`<sbb-form-field><sbb-time-input></sbb-time-input></sbb-form-field>`,
      );
      element = formField.querySelector('sbb-time-input')!;
    });

    it('should work with sbb-form-field', async () => {
      element.valueAsDate = new Date('2023-01-01T15:00:00');
      await waitForLitRender(element);
      expect(element.value).to.be.equal('15:00');
    });

    it('should detect empty state', async () => {
      expect(formField).to.match(':state(empty)');
    });

    it('detect non empty state, programmatically set', async () => {
      element.valueAsDate = new Date();
      await waitForLitRender(formField);

      expect(formField).not.to.match(':state(empty)');
    });

    it('should detect empty state, programmatically set', async () => {
      element.valueAsDate = new Date();
      await waitForLitRender(formField);
      expect(formField).not.to.match(':state(empty)');

      element.valueAsDate = null;
      expect(formField).to.match(':state(empty)');
    });

    it('should detect empty state, manual input', async () => {
      element.valueAsDate = new Date();
      await waitForLitRender(formField);
      expect(formField).not.to.match(':state(empty)');

      element.focus();

      // Delete the date by pressing backspace
      for (let i = 0; i < 5; i++) {
        await sendKeys({ press: 'Backspace' });
      }

      expect(formField).to.match(':state(empty)');
    });
  });

  describe('should handle disabled state', () => {
    let fieldset: HTMLFieldSetElement;

    beforeEach(async () => {
      fieldset = await fixture(
        html`<fieldset>
          <sbb-form-field><sbb-time-input></sbb-time-input></sbb-form-field>
        </fieldset>`,
      );
      element = fieldset.querySelector('sbb-time-input')!;
    });

    it('should handle disabled by attribute', async () => {
      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');

      element.toggleAttribute('disabled', true);
      await waitForLitRender(element);

      expect(element.disabled).to.be.true;
      expect(element).to.match(':disabled');
      expect(element).to.have.attribute('disabled');

      element.removeAttribute('disabled');
      await waitForLitRender(element);

      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');
    });

    it('should handle disabled by property', async () => {
      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');

      element.disabled = true;
      await waitForLitRender(element);

      expect(element.disabled).to.be.true;
      expect(element).to.match(':disabled');
      expect(element).to.have.attribute('disabled');

      element.disabled = false;
      await waitForLitRender(element);

      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');
    });

    it('should handle disabled fieldset by property', async () => {
      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');

      fieldset.disabled = true;
      await waitForLitRender(element);

      expect(element.disabled).to.be.true;
      expect(element).to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');

      fieldset.disabled = false;
      await waitForLitRender(element);

      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');
    });

    it('should handle disabled fieldset by attribute', async () => {
      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');

      fieldset.toggleAttribute('disabled', true);
      await waitForLitRender(element);

      expect(element.disabled).to.be.true;
      expect(element).to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');

      fieldset.removeAttribute('disabled');
      await waitForLitRender(element);

      expect(element.disabled).to.be.false;
      expect(element).not.to.match(':disabled');
      expect(element).not.to.have.attribute('disabled');
    });
  });

  it('should support asynchronously adding input by element reference', async () => {
    const root = await fixture(html`
      <div>
        <sbb-time-input></sbb-time-input>
      </div>
    `);
    element = root.querySelector<SbbTimeInputElement>('sbb-time-input')!;
    element.valueAsDate = new Date('2023-01-01T15:00:00');
    await waitForLitRender(element);

    expect(element.value).to.be.equal('15:00');
  });

  it('should support asynchronously adding input by id', async () => {
    const root = await fixture(html`
      <div>
        <sbb-time-input id="time-input"></sbb-time-input>
        <input id="input-2" />
      </div>
    `);
    element = root.querySelector<SbbTimeInputElement>('sbb-time-input')!;

    element.setAttribute('input', 'input-2');
    element.valueAsDate = new Date('2023-01-01T15:00:00');
    await waitForLitRender(element);

    expect(element.value).to.be.equal('15:00');
  });
});
