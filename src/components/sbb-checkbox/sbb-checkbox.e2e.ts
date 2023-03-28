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
      const changeSpy = await page.spyOnEvent('change');
      await element.click();
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('emit event on keypress', async () => {
      await page.waitForChanges();
      const changeSpy = await page.spyOnEvent('change');
      await element.press('Tab');
      await element.press('Space');
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEvent();
    });
  });

  describe('indeterminate', () => {
    it('should set indeterminate to false after checked', async () => {
      page = await newE2EPage();
      await page.setContent('<sbb-checkbox indeterminate>Label</sbb-checkbox>');
      element = await page.find('sbb-checkbox');
      await page.waitForChanges();

      expect(await element.getProperty('checked')).toBe(false);
      expect(await element.getProperty('indeterminate')).toBe(true);

      await element.click();
      await page.waitForChanges();

      expect(await element.getProperty('checked')).toBe(true);
      expect(await element.getProperty('indeterminate')).toBeFalsy();
    });

    it('should update indeterminate state of input', async () => {
      await page.waitForChanges();

      expect(await element.getProperty('indeterminate')).toBeFalsy();

      element.setProperty('indeterminate', true);
      await page.waitForChanges();

      expect(await element.getProperty('indeterminate')).toBe(true);
    });
  });
});
