import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy } from '../../core/testing.ts';

import { SbbTimetableFormSwapButtonElement } from './timetable-form-swap-button.component.ts';
import '../timetable-form.ts';
import '../timetable-form-field.ts';

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
});
