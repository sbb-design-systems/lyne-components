import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import { SbbPopoverElement } from '../../popover.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import { SbbDatepickerToggleElement } from './datepicker-toggle.component.js';

import '../datepicker.js';
import '../../date-input.js';
import '../../form-field/form-field.js';

describe(`sbb-datepicker-toggle`, () => {
  it('renders', async () => {
    const element: SbbDatepickerToggleElement = await fixture(
      html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`,
    );
    assert.instanceOf(element, SbbDatepickerToggleElement);
  });

  it('renders and opens datepicker via click', async () => {
    const root = await fixture(html`
      <div>
        <sbb-datepicker-toggle
          input="datepicker-input"
          datepicker="datepicker"
        ></sbb-datepicker-toggle>
        <sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
        <sbb-date-input id="datepicker-input"></sbb-date-input>
      </div>
    `);
    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    const datepicker = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input = root.querySelector('sbb-date-input')!;
    const openSpy = new EventSpy(SbbPopoverElement.events.open, datepicker);

    expect(toggle.datepicker).to.be.equal(datepicker);
    expect(toggle.input).to.be.equal(input);
    expect(toggle.disabled, 'toggle.disabled').to.be.false;
    expect(datepicker).to.have.attribute('data-state', 'closed');

    toggle.click();
    await openSpy.calledOnce();

    expect(datepicker).to.have.attribute('data-state', 'opened');
  });

  it('datepicker is created after the component', async () => {
    const root = await fixture(html`
      <div id="parent">
        <sbb-datepicker-toggle
          input="datepicker-input"
          datepicker="datepicker"
        ></sbb-datepicker-toggle>
        <sbb-date-input id="datepicker-input"></sbb-date-input>
      </div>
    `);

    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    expect(toggle).not.to.be.null;
    expect(toggle.datepicker).to.be.null;

    const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
    picker.setAttribute('input', 'datepicker-input');
    picker.setAttribute('id', 'datepicker');
    picker.setAttribute('value', '01-01-2023');
    root.appendChild(picker);
    await waitForLitRender(root);

    expect(toggle.datepicker).to.be.equal(picker);
  });

  it('datepicker is created after the component with different parent', async () => {
    const root = await fixture(html`
      <div>
        <div id="parent">
          <sbb-datepicker-toggle datepicker="datepicker"></sbb-datepicker-toggle>
          <sbb-date-input id="datepicker-input"></sbb-date-input>
        </div>
        <div id="other"></div>
      </div>
    `);

    const toggle = root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

    const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
    picker.setAttribute('input', 'datepicker-input');
    picker.setAttribute('id', 'datepicker');
    picker.setAttribute('value', '01-01-2023');
    root.querySelector<HTMLDivElement>('#other')!.appendChild(picker);
    await waitForLitRender(root);

    expect(toggle.datepicker).to.be.equal(picker);
    expect(toggle.disabled).to.be.false;
  });

  it('renders in form field', async () => {
    const form: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-date-input></sbb-date-input>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `);
    const toggle = form.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    const input = form.querySelector<SbbDateInputElement>('sbb-date-input')!;
    const datepicker = form.querySelector<SbbDatepickerElement>('sbb-datepicker')!;

    expect(toggle).to.have.attribute('slot', 'suffix');
    expect(toggle.input).to.be.equal(input);
    expect(toggle.datepicker).to.be.equal(datepicker);
    expect(toggle.disabled).to.be.false;
  });

  it('renders in form field before input', async () => {
    const form: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-date-input></sbb-date-input>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `);
    const toggle = form.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

    expect(toggle).to.have.attribute('slot', 'prefix');
  });
});
