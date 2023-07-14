import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-header-action', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-header-action id="focus-id">Action</sbb-header-action>');
    await page.waitForChanges();

    element = await page.find('sbb-header-action');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const changeSpy = await page.spyOnEvent('click');

      await element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const changeSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Space', async () => {
      const changeSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('should receive focus', async () => {
      await element.focus();
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
    });
  });
});
