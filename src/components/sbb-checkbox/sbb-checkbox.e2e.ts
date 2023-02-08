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

  describe('indeterminate', () => {
    it('should set indeterminate to false after checked', async () => {
      page = await newE2EPage();
      await page.setContent('<sbb-checkbox indeterminate>Label</sbb-checkbox>');
      element = await page.find('sbb-checkbox');
      await page.waitForChanges();
      const input = await page.find('sbb-checkbox >>> input');

      expect(await input.getProperty('checked')).toBe(false);
      expect(await input.getProperty('indeterminate')).toBe(true);

      await element.click();
      await page.waitForChanges();

      expect(await input.getProperty('checked')).toBe(true);
      expect(await input.getProperty('indeterminate')).toBeFalsy();
    });

    it('should update indeterminate state of input', async () => {
      await page.waitForChanges();

      const input = await page.find('sbb-checkbox >>> input');
      expect(await input.getProperty('indeterminate')).toBeFalsy();

      element.setProperty('indeterminate', true);
      await page.waitForChanges();

      expect(await input.getProperty('indeterminate')).toBe(true);
    });
  });
});
