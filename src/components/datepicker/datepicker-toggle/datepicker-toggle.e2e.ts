import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import { SbbDatepickerToggle } from './datepicker-toggle';
import { SbbTooltipTrigger } from '../../tooltip';
import { SbbTooltip } from '../../tooltip';
import { SbbFormField } from '../../form-field';
import { SbbCalendar } from '../../calendar';

import '../datepicker';
import '../../form-field';
import './datepicker-toggle';

describe('sbb-datepicker-toggle', () => {
  it('renders standalone', async () => {
    const element: SbbDatepickerToggle = await fixture(
      html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`,
    );
    assert.instanceOf(element, SbbDatepickerToggle);

    const tooltipTrigger: SbbTooltipTrigger =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    expect(tooltipTrigger).to.have.attribute('disabled');
  });

  it('renders and opens tooltip with picker', async () => {
    await fixture(html`
      <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
      <sbb-datepicker input="datepicker-input" id="datepicker" value="01-01-2023"></sbb-datepicker>
      <input id="datepicker-input" />
    `);
    const element: SbbDatepickerToggle = document.querySelector('sbb-datepicker-toggle');
    assert.instanceOf(element, SbbDatepickerToggle);

    const didOpenEventSpy = new EventSpy('did-open', element);
    const tooltipTrigger: SbbTooltipTrigger =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    const tooltip: SbbTooltip = element.shadowRoot.querySelector('sbb-tooltip');

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
    const element: SbbDatepickerToggle = document.querySelector('sbb-datepicker-toggle');
    const didOpenEventSpy = new EventSpy('did-open', element);
    const tooltipTrigger: SbbTooltipTrigger =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    const tooltip: SbbTooltip = element.shadowRoot.querySelector('sbb-tooltip');
    await waitForLitRender(element);
    assert.instanceOf(element, SbbDatepickerToggle);
    expect(tooltipTrigger).not.to.have.attribute('disabled');
    expect(tooltip).to.have.attribute('data-state', 'closed');

    (document.querySelector('sbb-datepicker-toggle') as SbbDatepickerToggle).open();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(tooltip).to.have.attribute('data-state', 'opened');
  });

  it('renders in form field, open calendar and change date', async () => {
    const form: SbbFormField = await fixture(html`
      <sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
        <input />
      </sbb-form-field>
    `);
    const element: SbbDatepickerToggle = form.querySelector('sbb-datepicker-toggle');
    const input: HTMLInputElement = form.querySelector('input');
    const tooltip: SbbTooltip = element.shadowRoot.querySelector('sbb-tooltip');
    expect(tooltip).to.have.attribute('data-state', 'closed');
    const didOpenEventSpy = new EventSpy('did-open', element);
    const changeSpy = new EventSpy('change', input);
    const blurSpy = new EventSpy('blur', input);
    assert.instanceOf(element, SbbDatepickerToggle);

    const tooltipTrigger: SbbTooltipTrigger =
      element.shadowRoot.querySelector('sbb-tooltip-trigger');
    tooltipTrigger.click();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(tooltip).to.have.attribute('data-state', 'opened');

    const calendar: SbbCalendar = element.shadowRoot.querySelector('sbb-calendar');
    calendar.dispatchEvent(
      new CustomEvent('date-selected', {
        detail: new Date('2022-01-01'),
      }),
    );
    await waitForLitRender(element);

    expect(input.value).to.be.equal('Sa, 01.01.2022');
    expect(changeSpy.count).to.be.equal(1);
    expect(blurSpy.count).to.be.equal(1);
  });
});
