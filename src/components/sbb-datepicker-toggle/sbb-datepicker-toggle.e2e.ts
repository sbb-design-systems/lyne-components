import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-datepicker-toggle', () => {
  it('renders standalone', async () => {
    const page: E2EPage = await newE2EPage({
      html: '<sbb-datepicker-toggle></sbb-datepicker-toggle>',
    });
    await page.waitForChanges();

    const element: E2EElement = await page.find('sbb-datepicker-toggle');
    const tooltipTrigger: E2EElement = await page.find(
      'sbb-datepicker-toggle >>> sbb-tooltip-trigger',
    );
    expect(element).toHaveClass('hydrated');
    expect(tooltipTrigger).toHaveAttribute('disabled');
  });

  it('renders and opens tooltip with picker', async () => {
    const page: E2EPage = await newE2EPage({
      html: `
          <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
          <sbb-datepicker input='datepicker-input' id='datepicker' value="01-01-2023"></sbb-datepicker>
          <input id="datepicker-input">
        `,
    });
    const element: E2EElement = await page.find('sbb-datepicker-toggle');
    const didOpenEventSpy = await element.spyOnEvent('did-open');
    const tooltipTrigger: E2EElement = await page.find(
      'sbb-datepicker-toggle >>> sbb-tooltip-trigger',
    );
    const tooltip: E2EElement = await page.find('sbb-datepicker-toggle >>> sbb-tooltip');
    await page.waitForChanges();
    expect(element).toHaveClass('hydrated');
    expect(tooltipTrigger).not.toHaveAttribute('disabled');
    expect(tooltip).toEqualAttribute('data-state', 'closed');

    await tooltipTrigger.click();
    await page.waitForChanges();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(tooltip).toEqualAttribute('data-state', 'opened');
  });

  it('renders and opens tooltip programmatically', async () => {
    const page: E2EPage = await newE2EPage({
      html: `
          <sbb-datepicker-toggle date-picker="datepicker" disable-animation></sbb-datepicker-toggle>
          <sbb-datepicker input='datepicker-input' id='datepicker' value="01-01-2023"></sbb-datepicker>
          <input id="datepicker-input">
        `,
    });
    const element: E2EElement = await page.find('sbb-datepicker-toggle');
    const didOpenEventSpy = await element.spyOnEvent('did-open');
    const tooltipTrigger: E2EElement = await page.find(
      'sbb-datepicker-toggle >>> sbb-tooltip-trigger',
    );
    const tooltip: E2EElement = await page.find('sbb-datepicker-toggle >>> sbb-tooltip');
    await page.waitForChanges();
    expect(element).toHaveClass('hydrated');
    expect(tooltipTrigger).not.toHaveAttribute('disabled');
    expect(tooltip).toEqualAttribute('data-state', 'closed');

    await page.evaluate(() =>
      (document.querySelector('sbb-datepicker-toggle') as HTMLSbbDatepickerToggleElement).open(),
    );

    await page.waitForChanges();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(tooltip).toEqualAttribute('data-state', 'opened');
  });

  it('renders in form field, open calendar and change date', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
        <input/>
      </sbb-form-field>
    `);
    await page.waitForChanges();
    const tooltip: E2EElement = await page.find('sbb-datepicker-toggle >>> sbb-tooltip');
    expect(tooltip).toEqualAttribute('data-state', 'closed');
    const element: E2EElement = await page.find('sbb-datepicker-toggle');
    const input: E2EElement = await page.find('input');
    const didOpenEventSpy = await element.spyOnEvent('did-open');
    const changeSpy = await input.spyOnEvent('change');
    const blurSpy = await input.spyOnEvent('blur');
    expect(element).toHaveClass('hydrated');

    const tooltipTrigger: E2EElement = await page.find(
      'sbb-datepicker-toggle >>> sbb-tooltip-trigger',
    );
    await tooltipTrigger.click();
    await page.waitForChanges();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(tooltip).toEqualAttribute('data-state', 'opened');

    const calendar: E2EElement = await page.find('sbb-datepicker-toggle >>> sbb-calendar');
    await calendar.triggerEvent('date-selected', {
      detail: new Date('2022-01-01'),
    });
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('Sa, 01.01.2022');
    expect(changeSpy).toHaveReceivedEventTimes(1);
    expect(blurSpy).toHaveReceivedEventTimes(1);
  });
});
