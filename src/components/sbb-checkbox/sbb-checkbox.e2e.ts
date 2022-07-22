import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-checkbox.events';

describe('sbb-checkbox', () => {
  let element, page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-checkbox></sbb-checkbox>');
    element = await page.find('sbb-checkbox');
  });

  it('renders', async () => {
    element = await page.find('sbb-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('emit event on click', async () => {
      await page.waitForChanges();
      const checkbox = await page.find('sbb-checkbox');
      const changeSpy = await page.spyOnEvent(events.sbbCheckboxChange);

      await checkbox.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });
  });
});
