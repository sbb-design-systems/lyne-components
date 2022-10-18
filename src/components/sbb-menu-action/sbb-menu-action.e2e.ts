import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-menu-action.events';

describe('sbb-menu-action', () => {
  let element, page;

  it('renders as a button and triggers click event', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-menu-action></sbb-menu-action>');

    element = await page.find('sbb-menu-action');
    expect(element).toHaveClass('hydrated');

    const button = await page.find('sbb-menu-action >>> button');
    const clickedSpy = await page.spyOnEvent(events.click);
    await button.click();
    expect(clickedSpy).toHaveReceivedEventTimes(1);
  });
});
