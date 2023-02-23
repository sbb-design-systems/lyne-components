import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-toggle-check', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle-check id="outer-id"></sbb-toggle-check>');
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
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host click to input element', async () => {
      const input = await page.find('sbb-toggle-check >>> input');
      const changeSpy = await input.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host focus event to the input element', async () => {
      const input = await page.find('sbb-toggle-check >>> input');

      const changeSpy = await input.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);

      // Although the inner native button receives the focus, the active element is the host
      expect(await page.evaluate(() => document.activeElement.id)).toBe('outer-id');
    });
  });
});
