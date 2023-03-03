import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-menu-action', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-menu-action id="focus-id">Menu Action</sbb-menu-action>');

    element = await page.find('sbb-menu-action');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const menuAction = await page.find('sbb-menu-action');
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
