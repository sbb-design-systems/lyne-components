import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-toggle-check.events';

describe('sbb-toggle-check', () => {
  let element, page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle-check></sbb-toggle-check>');
    element = await page.find('sbb-toggle-check');
  });

  it('renders', async () => {
    element = await page.find('sbb-toggle-check');
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('emit event on click', async () => {
      await page.waitForChanges();
      const toggle = await page.find('sbb-toggle-check');
      const changeSpy = await page.spyOnEvent(events.sbbChange);

      await toggle.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });
  });
});
