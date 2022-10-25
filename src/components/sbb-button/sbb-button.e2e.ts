import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-button', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      '<sbb-button id="outer-id" button-id="inner-id">I am a button</sbb-button>'
    );
    element = await page.find('sbb-button');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> .sbb-button');
      const changeSpy = await page.spyOnEvent('click');

      await button.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', true);

      await page.waitForChanges();

      const button = await page.find('sbb-button >>> .sbb-button');
      const changeSpy = await page.spyOnEvent('click');

      await button.click();
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('should dispatch event on click if static', async () => {
      element.setAttribute('static', true);

      await page.waitForChanges();

      const button = await page.find('sbb-button >>> .sbb-button');
      const changeSpy = await page.spyOnEvent('click');

      await button.click();
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
      const button = await page.find('sbb-button >>> .sbb-button');

      const changeSpy = await button.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host focus event to action element', async () => {
      const button = await page.find('sbb-button >>> .sbb-button');

      const changeSpy = await button.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);

      // Even the inner native button receives the focus, the active element is the host
      expect(await page.evaluate(() => document.activeElement.id)).toBe('outer-id');
    });
  });
});
