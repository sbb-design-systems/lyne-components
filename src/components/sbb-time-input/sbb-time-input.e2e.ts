import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-time-input></sbb-time-input>');
    element = await page.find('sbb-time-input');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should emit event', async () => {
    await page.waitForChanges();
    const changeSpy = await element.spyOnEvent('change');
    const input = await page.find('sbb-time-input >>> input');
    await input.focus();
    await input.press('1');
    await element.click();
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
  });
});
