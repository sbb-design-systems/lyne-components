import events from './sbb-button.events';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-button', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-button>I am a button</sbb-button>');
    element = await page.find('sbb-button');
  });

  it('renders', async () => {
    element = await page.find('sbb-button');
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> .sbb-button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('doesnt dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', true);

      await page.waitForChanges();

      const button = await page.find('sbb-button >>> .sbb-button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('doesnt dispatch event on click if static', async () => {
      element.setAttribute('static', true);

      await page.waitForChanges();

      const button = await page.find('sbb-button >>> .sbb-button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy).not.toHaveReceivedEvent();
    });
  });
});
