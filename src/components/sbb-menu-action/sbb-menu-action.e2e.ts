import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-menu-action', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      '<sbb-menu-action id="outer-id" menu-action-id="inner-id">Menu Action</sbb-menu-action>'
    );
    element = await page.find('sbb-menu-action');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const menuAction = await page.find('sbb-menu-action >>> .sbb-menu-action');
      const changeSpy = await page.spyOnEvent('click');

      await menuAction.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', true);

      await page.waitForChanges();

      const menuAction = await page.find('sbb-menu-action >>> .sbb-menu-action');
      const changeSpy = await page.spyOnEvent('click');

      await menuAction.click();
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('should stop propagating host click if disabled', async () => {
      element.setProperty('disabled', true);

      const clickSpy = await page.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(clickSpy).not.toHaveReceivedEvent();
    });

    it('should forward host click to action element', async () => {
      const menuAction = await page.find('sbb-menu-action >>> .sbb-menu-action');

      const changeSpy = await menuAction.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host focus event to action element', async () => {
      const menuAction = await page.find('sbb-menu-action >>> .sbb-menu-action');

      const changeSpy = await menuAction.spyOnEvent('focus');

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
    await page.setContent('<sbb-menu-action></sbb-menu-action>');

    element = await page.find('sbb-menu-action');
    expect(element).toHaveClass('hydrated');

    const button = await page.find('sbb-menu-action >>> button');
    const clickedSpy = await page.spyOnEvent('click');
    await button.click();
    expect(clickedSpy).toHaveReceivedEventTimes(1);
  });
});
