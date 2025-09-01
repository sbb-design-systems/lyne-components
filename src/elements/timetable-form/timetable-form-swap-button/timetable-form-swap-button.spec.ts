import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy } from '../../core/testing.js';

import { SbbTimetableFormSwapButtonElement } from './timetable-form-swap-button.component.js';
import '../timetable-form.js';
import '../timetable-form-field.js';

describe('sbb-timetable-form-swap-button', () => {
  let element: SbbTimetableFormSwapButtonElement;
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

  it('should swap the value of the input siblings', async () => {
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
