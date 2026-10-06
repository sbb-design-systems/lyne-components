import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbAutocompleteElement } from '../../autocomplete.ts';
import { fixture } from '../../core/testing/private.ts';
import { EventSpy } from '../../core/testing.ts';
import type { SbbOptionElement } from '../../option.ts';

import '../../option.ts';
import { SbbTimetableFormSwapButtonElement } from './timetable-form-swap-button.component.ts';
import '../../timetable-form.ts';

describe('sbb-timetable-form-swap-button', () => {
  let element: SbbTimetableFormSwapButtonElement;

  describe('with from to fields', () => {
    let fromInput: HTMLInputElement;
    let toInput: HTMLInputElement;

    beforeEach(async () => {
      const root = await fixture(html`
        <form class="sbb-timetable-form">
          <sbb-timetable-form>
            <sbb-timetable-form-field>
              <label>From</label>
              <input type="text" name="from" />
            </sbb-timetable-form-field>
            <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
            <sbb-timetable-form-field>
              <label>To</label>
              <input type="text" name="to" />
            </sbb-timetable-form-field>
          </sbb-timetable-form>
        </form>
      `);
      element = root.querySelector('sbb-timetable-form-swap-button')!;
      fromInput = root.querySelector('input[name="from"]')!;
      toInput = root.querySelector('input[name="to"]')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbTimetableFormSwapButtonElement);
    });

    it('should swap the value of the input fields', async () => {
      const inputSpy = new EventSpy('input');
      const changeSpy = new EventSpy('change');

      fromInput.value = 'from';
      toInput.value = 'to';
      element.click();

      expect(fromInput.value).to.be.equal('to');
      expect(toInput.value).to.be.equal('from');
      expect(inputSpy.count).to.be.equal(2);
      expect(changeSpy.count).to.be.equal(2);

      fromInput.value = '';
      toInput.value = 'to';
      element.click();

      expect(fromInput.value).to.be.equal('to');
      expect(toInput.value).to.be.equal('');
      expect(inputSpy.count).to.be.equal(4);
      expect(changeSpy.count).to.be.equal(4);

      fromInput.value = '';
      toInput.value = '';
      element.click();

      expect(fromInput.value).to.be.equal('');
      expect(toInput.value).to.be.equal('');
      expect(inputSpy.count).to.be.equal(4); // Should not emit the events if both inputs are empty
      expect(changeSpy.count).to.be.equal(4);
    });
  });

  describe('with Via field', () => {
    let inputs: HTMLInputElement[];

    beforeEach(async () => {
      const root = await fixture(html`
        <form class="sbb-timetable-form">
          <sbb-timetable-form>
            <sbb-timetable-form-field>
              <label>From</label>
              <input type="text" name="from" />
            </sbb-timetable-form-field>
            <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
            <sbb-timetable-form-field>
              <label>Via</label>
              <input type="text" name="via1" />
            </sbb-timetable-form-field>
            <sbb-timetable-form-field>
              <label>Via</label>
              <input type="text" name="via2" />
            </sbb-timetable-form-field>
            <sbb-timetable-form-field>
              <label>To</label>
              <input type="text" name="to" />
            </sbb-timetable-form-field>
          </sbb-timetable-form>
        </form>
      `);
      element = root.querySelector('sbb-timetable-form-swap-button')!;
      inputs = Array.from(root.querySelectorAll('input'));
    });

    it('should reverse values of the input fields', async () => {
      const inputSpy = new EventSpy('input');
      const changeSpy = new EventSpy('change');

      inputs.forEach((input, i) => {
        input.value = (i + 1).toString();
      });

      element.click();

      expect(inputs.map((f) => f.value)).to.be.eql(['4', '3', '2', '1']);
      expect(inputSpy.count).to.be.equal(4);
      expect(changeSpy.count).to.be.equal(4);

      inputs[1].value = '';
      element.click();

      expect(inputs.map((f) => f.value)).to.be.eql(['1', '2', '', '4']);
      expect(inputSpy.count).to.be.equal(8);
      expect(changeSpy.count).to.be.equal(8);
    });

    it('should not emit events if all inputs are empty', async () => {
      const inputSpy = new EventSpy('input');
      const changeSpy = new EventSpy('change');

      inputs.forEach((input) => (input.value = ''));

      element.click();

      expect(inputs.map((f) => f.value)).to.be.eql(['', '', '', '']);
      expect(inputSpy.count).to.be.equal(0);
      expect(changeSpy.count).to.be.equal(0);
    });
  });

  describe('with autocomplete', () => {
    let root: HTMLFormElement;
    let fromInput: HTMLInputElement;
    let toInput: HTMLInputElement;
    let fromAc: SbbAutocompleteElement;
    let toAc: SbbAutocompleteElement;

    beforeEach(async () => {
      root = await fixture(html`
        <form class="sbb-timetable-form">
          <sbb-timetable-form id="sbb-timetable-form">
            <sbb-timetable-form-field id="sbb-timetable-form-field-from">
              <label>From</label>
              <input id="sbb-timetable-form-field-input-from" type="text" name="from" />
              <sbb-autocomplete
                id="sbb-timetable-form-field-autocomplete-from"
                origin="test"
                trigger="sbb-timetable-form-field-input-from"
              >
                <sbb-option value="Option A">Option A</sbb-option>
                <sbb-option value="Option B">Option B</sbb-option>
                <sbb-option value="Option C">Option C</sbb-option>
              </sbb-autocomplete>
            </sbb-timetable-form-field>
            <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
            <sbb-timetable-form-field id="sbb-timetable-form-field-to">
              <label>To</label>
              <input id="sbb-timetable-form-field-input-to" type="text" name="to" />
              <sbb-autocomplete
                id="sbb-timetable-form-field-autocomplete-to"
                origin="test"
                trigger="sbb-timetable-form-field-input-to"
              >
                <sbb-option value="Option D">Option D</sbb-option>
                <sbb-option value="Option E">Option E</sbb-option>
                <sbb-option value="Option F">Option F</sbb-option>
              </sbb-autocomplete>
            </sbb-timetable-form-field>
            <div id="test"></div>
          </sbb-timetable-form>
        </form>
      `);
      element = root.querySelector('sbb-timetable-form-swap-button')!;
      fromInput = root.querySelector('input[name="from"]')!;
      toInput = root.querySelector('input[name="to"]')!;
      fromAc = root.querySelector('#sbb-timetable-form-field-autocomplete-from')!;
      toAc = root.querySelector('#sbb-timetable-form-field-autocomplete-to')!;
    });

    it('input event triggered by swapping do not open the panels', async () => {
      const beforeOpenFromSpy = new EventSpy(SbbAutocompleteElement.events.beforeopen, fromAc);
      const openFromSpy = new EventSpy(SbbAutocompleteElement.events.open, fromAc);
      const beforeOpenToSpy = new EventSpy(SbbAutocompleteElement.events.beforeopen, toAc);
      const openToSpy = new EventSpy(SbbAutocompleteElement.events.open, toAc);
      const inputSpy = new EventSpy('input');
      const changeSpy = new EventSpy('change');

      fromInput.click();
      await beforeOpenFromSpy.calledOnce();
      expect(beforeOpenFromSpy.count).to.be.equal(1);
      await openFromSpy.calledOnce();
      expect(openFromSpy.count).to.be.equal(1);
      expect(fromAc.isOpen).to.be.true;
      (root.querySelector("sbb-option[value='Option A']")! as SbbOptionElement).click();
      expect(fromInput.value).to.be.equal('Option A');
      expect(inputSpy.count).to.be.equal(1);
      expect(changeSpy.count).to.be.equal(1);
      expect(fromAc.isOpen).to.be.false;

      toInput.click();
      await beforeOpenToSpy.calledOnce();
      expect(beforeOpenToSpy.count).to.be.equal(1);
      await openToSpy.calledOnce();
      expect(openToSpy.count).to.be.equal(1);
      expect(toAc.isOpen).to.be.true;
      (root.querySelector("sbb-option[value='Option E']")! as SbbOptionElement).click();
      expect(toInput.value).to.be.equal('Option E');
      expect(inputSpy.count).to.be.equal(2);
      expect(changeSpy.count).to.be.equal(2);
      expect(toAc.isOpen).to.be.false;

      element.click();
      expect(fromInput.value).to.be.equal('Option E');
      expect(toInput.value).to.be.equal('Option A');
      expect(fromAc.isOpen).to.be.false;
      expect(toAc.isOpen).to.be.false;
      expect(inputSpy.count).to.be.equal(4);
      expect(changeSpy.count).to.be.equal(4);
    });
  });
});
