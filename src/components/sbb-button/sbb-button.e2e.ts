import events from './sbb-button.events';
import {
  E2EElement, E2EPage, newE2EPage
} from '@stencil/core/testing';

describe('sbb-button', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-button label="I am a button"></sbb-button>');
    element = await page.find('sbb-button');
  });

  it('renders', async () => {
    element = await page.find('sbb-button');
    expect(element)
      .toHaveClass('hydrated');
  });

  it('renders button text', async () => {
    const buttonText = 'Custom Button Text';

    element.setProperty('label', buttonText);
    await page.waitForChanges();
    const button = await page.find('sbb-button >>> .button__label');

    expect(button.textContent)
      .toEqual(buttonText);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      element.setProperty('text', 'Custom Button Text');
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy)
        .toHaveReceivedEventTimes(1);
    });

    it('dispatches correct event payload on click with no id', async () => {
      element.setProperty('text', 'Custom Button Text');
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy)
        .toHaveReceivedEventDetail(null);
    });

    it('dispatches correct event payload on click with id', async () => {
      const buttonId = 'buttonId';

      element.setProperty('text', 'Custom Button Text');
      element.setProperty('eventId', buttonId);
      await page.waitForChanges();
      const button = await page.find('sbb-button >>> button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy)
        .toHaveReceivedEventDetail(buttonId);
    });
  });
});
