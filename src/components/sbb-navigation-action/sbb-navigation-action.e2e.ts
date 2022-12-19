import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-action', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      '<sbb-navigation-action id="outer-id">Navigation Action</sbb-navigation-action>'
    );

    // Set id of the inner-button for later comparing of active element
    await page.evaluate(
      () =>
        (document.getElementById('outer-id').shadowRoot.querySelector('button,a').id = 'inner-id')
    );

    element = await page.find('sbb-navigation-action');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const navigationAction = await page.find('sbb-navigation-action >>> .sbb-navigation-action');
      const changeSpy = await page.spyOnEvent('click');

      await navigationAction.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host click to action element', async () => {
      const navigationAction = await page.find('sbb-navigation-action >>> .sbb-navigation-action');

      const changeSpy = await navigationAction.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host focus event to action element', async () => {
      const navigationAction = await page.find('sbb-navigation-action >>> .sbb-navigation-action');

      const changeSpy = await navigationAction.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);

      // Although the inner native button receives the focus, the active element is the host
      expect(await page.evaluate(() => document.activeElement.id)).toBe('outer-id');
      expect(await page.evaluate(() => document.activeElement.shadowRoot.activeElement.id)).toBe(
        'inner-id'
      );
    });
  });

  it('renders as a button and triggers click event', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-navigation-action>Label</sbb-navigation-action>');

    element = await page.find('sbb-navigation-action');
    expect(element).toHaveClass('hydrated');

    const button = await page.find('sbb-navigation-action >>> button');
    const clickedSpy = await page.spyOnEvent('click');
    await button.click();
    expect(clickedSpy).toHaveReceivedEventTimes(1);
  });
});
