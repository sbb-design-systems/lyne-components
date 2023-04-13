import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-toggle-check', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle-check id="focus-id"></sbb-toggle-check>');
    element = await page.find('sbb-toggle-check');
  });

  it('renders', async () => {
    element = await page.find('sbb-toggle-check');
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('emit event on click', async () => {
      await page.waitForChanges();
      const toggle = await page.find('sbb-toggle-check');
      const changeSpy = await page.spyOnEvent('change');

      await toggle.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should emit click on Space', async () => {
      const changeSpy = await element.spyOnEvent('click');

      element.press(' ');
      await page.waitForChanges();

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should recieve focus', async () => {
      const changeSpy = await element.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
    });
  });
});
