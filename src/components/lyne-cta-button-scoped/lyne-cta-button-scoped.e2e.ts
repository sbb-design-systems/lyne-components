import events from './lyne-cta-button-scoped.events';
import { newE2EPage } from '@stencil/core/testing';

describe('lyne-cta-button-scoped', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-cta-button-scoped></lyne-cta-button-scoped>');
    element = await page.find('lyne-cta-button-scoped');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-cta-button-scoped></lyne-cta-button-scoped>');

    element = await page.find('lyne-cta-button-scoped');
    expect(element)
      .toHaveClass('hydrated');
  });

  it('renders button text', async () => {
    const buttonText = 'Custom Button Text';

    element.setProperty('label', buttonText);
    await page.waitForChanges();
    const button = await page.find('lyne-cta-button-scoped .label');

    expect(button.textContent)
      .toEqual(buttonText);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      element.setProperty('text', 'Custom Button Text');
      await page.waitForChanges();
      const button = await page.find('lyne-cta-button-scoped button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy)
        .toHaveReceivedEventTimes(1);
    });

    it('dispatches correct event payload on click with no id', async () => {
      element.setProperty('text', 'Custom Button Text');
      await page.waitForChanges();
      const button = await page.find('lyne-cta-button-scoped button');
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
      const button = await page.find('lyne-cta-button-scoped button');
      const changeSpy = await page.spyOnEvent(events.click);

      await button.click();
      expect(changeSpy)
        .toHaveReceivedEventDetail(buttonId);
    });
  });

});
