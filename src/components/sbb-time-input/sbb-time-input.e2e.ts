import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-time-input></sbb-time-input>
      <button id="trigger-change"></button>
    `);
    element = await page.find('sbb-time-input');
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should emit event', async () => {
    const changeSpy = await element.spyOnEvent('change');
    const input = await page.find('sbb-time-input >>> input');
    await input.focus();
    await input.press('1');
    await page.click('#trigger-change');
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
  });

  it('should watch for value changes', async () => {
    element.setProperty('value', '11');
    await page.waitForChanges();
    const input = await page.find('sbb-time-input >>> input');
    expect(await input.getProperty('value')).toEqual('11:00');
  });

  it('should watch for value changes and interpret valid values', async () => {
    element.setProperty('value', ':00');
    await page.waitForChanges();
    const input = await page.find('sbb-time-input >>> input');
    expect(await input.getProperty('value')).toEqual('00:00');
  });

  it('should watch for value changes and clear invalid values', async () => {
    element.setProperty('value', ':');
    await page.waitForChanges();
    const input = await page.find('sbb-time-input >>> input');
    expect(await input.getProperty('value')).toEqual('');
  });

  it('should watch for valueAsDate changes', async () => {
    element.setProperty('valueAsDate', '2023-01-01T15:00:00');
    await page.waitForChanges();
    const input = await page.find('sbb-time-input >>> input');
    expect(await input.getProperty('value')).toEqual('15:00');
  });
});
