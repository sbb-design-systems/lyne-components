import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-header-action.events';

describe('sbb-header-action', () => {
  let element, page;

  it('renders as a button and trigger click', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-header-action>Action</sbb-header-action>');

    element = await page.find('sbb-header-action');
    expect(element).toHaveClass('hydrated');

    const button = await page.find('sbb-header-action >>> button');
    const clickedSpy = await page.spyOnEvent(events.click);

    await button.click();
    expect(clickedSpy).toHaveReceivedEventTimes(1);
  });
});
