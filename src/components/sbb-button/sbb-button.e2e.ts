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

  it('renders button text', async () => {
    await page.waitForChanges();
    const button = await page.find('sbb-button >>> .sbb-button__label');

    expect(button.innerHTML).toEqual('<slot></slot>');
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('dispatches correct event payload on click with no id', async () => {
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy).toHaveReceivedEventDetail(null);
    });

    it('dispatches correct event payload on click with id', async () => {
      const buttonId = 'buttonId';

      element.setProperty('eventId', buttonId);
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy).toHaveReceivedEventDetail(buttonId);
    });
  });
});
