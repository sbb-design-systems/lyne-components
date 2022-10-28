import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-link', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-link id="outer-id" link-id="inner-id">Link as Button</sbb-link>');
    element = await page.find('sbb-link');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const link = await page.find('sbb-link >>> .sbb-link');
      const changeSpy = await page.spyOnEvent('click');

      await link.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', true);

      await page.waitForChanges();

      const link = await page.find('sbb-link >>> .sbb-link');
      const changeSpy = await page.spyOnEvent('click');

      await link.click();
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('should dispatch event on click if static', async () => {
      element.setAttribute('static', true);

      await page.waitForChanges();

      const link = await page.find('sbb-link >>> .sbb-link');
      const changeSpy = await page.spyOnEvent('click');

      await link.click();
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should stop propagating host click if disabled', async () => {
      element.setProperty('disabled', true);

      const clickSpy = await page.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(clickSpy).not.toHaveReceivedEvent();
    });

    it('should forward host click to action element', async () => {
      const link = await page.find('sbb-link >>> .sbb-link');

      const changeSpy = await link.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host focus event to action element', async () => {
      const link = await page.find('sbb-link >>> .sbb-link');

      const changeSpy = await link.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);

      // Even the inner native link receives the focus, the active element is the host
      expect(await page.evaluate(() => document.activeElement.id)).toBe('outer-id');
      expect(await page.evaluate(() => document.activeElement.shadowRoot.activeElement.id)).toBe(
        'inner-id'
      );
    });
  });
});
