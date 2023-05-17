import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-button', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-button id="focus-id">I am a button</sbb-button>');
    element = await page.find('sbb-button');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const clickSpy = await page.spyOnEvent('click');

      await element.click();
      await waitForCondition(() => clickSpy.events.length === 1);
      expect(clickSpy).toHaveReceivedEventTimes(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', true);

      await page.waitForChanges();

      const clickSpy = await page.spyOnEvent('click');

      await element.click();
      expect(clickSpy).not.toHaveReceivedEvent();
    });

    it('should dispatch event on click if static', async () => {
      element.setAttribute('static', true);

      await page.waitForChanges();

      const clickSpy = await page.spyOnEvent('click');

      await element.click();
      expect(clickSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Enter', async () => {
      const clickSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(clickSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Space', async () => {
      const clickSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(clickSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const clickSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(clickSpy).toHaveReceivedEvent();
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const clickSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(clickSpy).not.toHaveReceivedEvent();
    });

    it('should stop propagating host click if disabled', async () => {
      element.setProperty('disabled', true);

      const clickSpy = await page.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(clickSpy).not.toHaveReceivedEvent();
    });

    it('should receive focus', async () => {
      await element.focus();
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
    });
  });
});
