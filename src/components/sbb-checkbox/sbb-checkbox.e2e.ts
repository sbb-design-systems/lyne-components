import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-checkbox', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-checkbox></sbb-checkbox>');
    element = await page.find('sbb-checkbox');
  });

  it('should render', async () => {
    element = await page.find('sbb-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('emit event on click', async () => {
      await page.waitForChanges();
      const checkbox = await page.find('sbb-checkbox');
      const changeSpy = await page.spyOnEvent('change');
      await checkbox.click();
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('emit event on keypress', async () => {
      await page.waitForChanges();
      const checkbox = await page.find('sbb-checkbox');
      const changeSpy = await page.spyOnEvent('change');
      await checkbox.press('Tab');
      await checkbox.press('Space');
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEvent();
    });
  });
});
