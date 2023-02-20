import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-datepicker></sbb-datepicker>');

    element = await page.find('sbb-datepicker');
    expect(element).toHaveClass('hydrated');
  });

  it('emits value', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-datepicker></sbb-datepicker><button></button>');

    element = await page.find('sbb-datepicker');
    expect(element).toHaveClass('hydrated');

    expect(await element.getProperty('value')).toBeNull();
    expect(await element.getProperty('valueAsDate')).toBeNull();
    const changeSpy = await page.spyOnEvent('change');
    const input: E2EElement = await page.find('sbb-datepicker >>> input');
    await input.focus();
    await input.type('11-1-20');
    await page.waitForChanges();
    const button: E2EElement = await page.find('button');
    await button.focus();
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(await element.getProperty('value')).toEqual('11.01.1920');
    expect(await element.getProperty('valueAsDate')).not.toBeNull();
  });
});
