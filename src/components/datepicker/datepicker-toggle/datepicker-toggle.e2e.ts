import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbCalendarElement } from '../../calendar';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import type { SbbFormFieldElement } from '../../form-field';
import type { SbbTooltipTriggerElement } from '../../tooltip';
import { SbbTooltipElement } from '../../tooltip';
import type { SbbDatepickerElement } from '../datepicker';

import { SbbDatepickerToggleElement } from './datepicker-toggle';

import '../datepicker';

describe('sbb-datepicker-toggle', () => {
  it('renders standalone', async () => {
    const element: SbbDatepickerToggleElement = await fixture(
      html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`,
    );
    assert.instanceOf(element, SbbDatepickerToggleElement);

    const tooltipTrigger: SbbTooltipTriggerElement =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    expect(tooltipTrigger).to.have.attribute('disabled');
  });

  it('renders and opens tooltip with picker', async () => {
    await fixture(html`
      <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
      <sbb-datepicker input="datepicker-input" id="datepicker" value="01-01-2023"></sbb-datepicker>
      <input id="datepicker-input" />
    `);
    const element: SbbDatepickerToggleElement = document.querySelector('sbb-datepicker-toggle');
    assert.instanceOf(element, SbbDatepickerToggleElement);

    const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen, element);
    const tooltipTrigger: SbbTooltipTriggerElement =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    const tooltip: SbbTooltipElement = element.shadowRoot.querySelector('sbb-tooltip');

    await waitForLitRender(element);
    expect(tooltipTrigger).not.to.have.attribute('disabled');
    expect(tooltip).to.have.attribute('data-state', 'closed');

    tooltipTrigger.click();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(tooltip).to.have.attribute('data-state', 'opened');
  });

  it('renders and opens tooltip programmatically', async () => {
    await fixture(html`
      <sbb-datepicker-toggle date-picker="datepicker" disable-animation></sbb-datepicker-toggle>
      <sbb-datepicker input="datepicker-input" id="datepicker" value="01-01-2023"></sbb-datepicker>
      <input id="datepicker-input" />
    `);
    const element: SbbDatepickerToggleElement = document.querySelector('sbb-datepicker-toggle');
    const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen, element);
    const tooltipTrigger: SbbTooltipTriggerElement =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    const tooltip: SbbTooltipElement = element.shadowRoot.querySelector('sbb-tooltip');
    await waitForLitRender(element);
    assert.instanceOf(element, SbbDatepickerToggleElement);
    expect(tooltipTrigger).not.to.have.attribute('disabled');
    expect(tooltip).to.have.attribute('data-state', 'closed');

    (document.querySelector('sbb-datepicker-toggle') as SbbDatepickerToggleElement).open();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(tooltip).to.have.attribute('data-state', 'opened');
  });

  it('datepicker is created after the component', async () => {
    const doc = await fixture(html`
      <div id="parent">
        <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
        <input id="datepicker-input" />
      </div>
    `);
    await waitForLitRender(doc);

    const toggle: SbbDatepickerToggleElement = document.querySelector('sbb-datepicker-toggle');
    const inputUpdated: EventSpy<Event> = new EventSpy(
      'inputUpdated',
      document.querySelector('#parent'),
    );
    const trigger: SbbTooltipTriggerElement =
      toggle.shadowRoot.querySelector('sbb-tooltip-trigger');
    // there's no datepicker, so no event and the tooltipTrigger is disabled due _datePickerElement not set
    expect(toggle).not.to.be.null;
    expect(inputUpdated.count).to.be.equal(0);
    expect(trigger.getAttribute('disabled')).to.be.equal('');

    const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
    picker.setAttribute('input', 'datepicker-input');
    picker.setAttribute('id', 'datepicker');
    picker.setAttribute('value', '01-01-2023');
    doc.appendChild(picker);
    await waitForLitRender(doc);

    // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
    expect(inputUpdated.count).to.be.equal(2);
    expect(trigger.getAttribute('disabled')).to.be.null;
  });

  it('datepicker is created after the component with different parent', async () => {
    const doc = await fixture(html`
      <div id="parent">
        <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
        <input id="datepicker-input" />
      </div>
      <div id="other"></div>
    `);
    await waitForLitRender(doc);

    const toggle: SbbDatepickerToggleElement = document.querySelector('sbb-datepicker-toggle');
    const inputUpdated: EventSpy<Event> = new EventSpy(
      'inputUpdated',
      document.querySelector('#parent'),
    );
    const trigger: SbbTooltipTriggerElement =
      toggle.shadowRoot.querySelector('sbb-tooltip-trigger');
    // there's no datepicker, so no event and the tooltipTrigger is disabled due _datePickerElement not set
    expect(toggle).not.to.be.null;
    expect(inputUpdated.count).to.be.equal(0);
    expect(trigger.getAttribute('disabled')).to.be.equal('');

    const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
    picker.setAttribute('input', 'datepicker-input');
    picker.setAttribute('id', 'datepicker');
    picker.setAttribute('value', '01-01-2023');
    document.querySelector('#other').appendChild(picker);
    await waitForLitRender(doc);

    // the datepicker is connected on a different parent, so no changes are triggered
    expect(inputUpdated.count).to.be.equal(0);
    expect(trigger.getAttribute('disabled')).to.be.equal('');
  });

  it('renders in form field, open calendar and change date', async () => {
    const form: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
        <input />
      </sbb-form-field>
    `);
    const element: SbbDatepickerToggleElement = form.querySelector('sbb-datepicker-toggle');
    const input: HTMLInputElement = form.querySelector('input');
    const tooltip: SbbTooltipElement = element.shadowRoot.querySelector('sbb-tooltip');
    expect(tooltip).to.have.attribute('data-state', 'closed');
    const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen, element);
    const changeSpy = new EventSpy('change', input);
    const blurSpy = new EventSpy('blur', input);
    assert.instanceOf(element, SbbDatepickerToggleElement);

    const tooltipTrigger: SbbTooltipTriggerElement =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    tooltipTrigger.click();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(tooltip).to.have.attribute('data-state', 'opened');

    const calendar: SbbCalendarElement = element.shadowRoot.querySelector('sbb-calendar');
    calendar.dispatchEvent(
      new CustomEvent('dateSelected', {
        detail: new Date('2022-01-01'),
      }),
    );
    await waitForLitRender(element);

    expect(input.value).to.be.equal('Sa, 01.01.2022');
    expect(changeSpy.count).to.be.equal(1);
    expect(blurSpy.count).to.be.equal(1);
  });
});
