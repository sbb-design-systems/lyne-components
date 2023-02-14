import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-next-day', () => {
  let element: E2EElement, picker: E2EElement, button: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <sbb-datepicker value="21-01-2023"></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    element = await page.find('sbb-datepicker-next-day');
    picker = await page.find('sbb-datepicker');
    button = await page.find('sbb-datepicker-next-day >>> button');
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('click', async () => {
    expect(await picker.getProperty('value')).toEqual('21.01.2023');

    const changeSpy = await page.spyOnEvent('click');
    await button.click();
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEventTimes(1);

    expect(await picker.getProperty('value')).toEqual('22.01.2023');
  });
});
