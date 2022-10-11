import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from '../sbb-link/sbb-link.events';

describe('sbb-link', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-link>Link as Button</sbb-link>');
    element = await page.find('sbb-link');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const link = await page.find('sbb-link >>> .sbb-link');
      const changeSpy = await page.spyOnEvent(events.click);

      await link.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('doesnt dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', true);

      await page.waitForChanges();

      const link = await page.find('sbb-link >>> .sbb-link');
      const changeSpy = await page.spyOnEvent(events.click);

      await link.click();
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('doesnt dispatch event on click if static', async () => {
      element.setAttribute('static', true);

      await page.waitForChanges();

      const link = await page.find('sbb-link >>> .sbb-link');
      const changeSpy = await page.spyOnEvent(events.click);

      await link.click();
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
      const changeSpy = await page.spyOnEvent(events.click);

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });
  });
});
