import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  let element: E2EElement, page: E2EPage, input: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-time-input input='input-1'></sbb-time-input>
      <input id='input-1' />
      <button id="trigger-change"></button>
    `);
    await page.waitForChanges();

    element = await page.find('sbb-time-input');
    input = await page.find('input');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should emit event', async () => {
    const changeSpy = await element.spyOnEvent('change');
    await input.focus();
    await input.press('1');
    await page.click('#trigger-change');
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
  });

  it('should watch for value changes and interpret valid values', async () => {
    await page.evaluate(() => {
      const input = document.getElementById('input-1') as HTMLInputElement;
      input.value = ':00';
      input.dispatchEvent(new Event('change'));
    });
    expect(await input.getProperty('value')).toEqual('00:00');
  });

  it('should handle deletion', async () => {
    await page.evaluate(
      () => ((document.getElementById('input-1') as HTMLInputElement).value = '12:00'),
    );

    await page.waitForChanges();
    await input.press('Home');
    await input.press('Delete');
    await input.press('Delete');

    expect(await input.getProperty('value')).toEqual(':00');
    await input.press('Enter');
    expect(await input.getProperty('value')).toEqual('00:00');
  });

  it('should watch for valueAsDate changes', async () => {
    await element.callMethod('setValueAsDate', '2023-01-01T15:00:00');
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual('15:00');
  });
});
