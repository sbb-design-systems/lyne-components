import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-timetable-row', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-row></sbb-timetable-row>`);
    element = await page.find('sbb-timetable-row');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('emits an event when clicked', async () => {
      await page.waitForChanges();
      const card = await page.find('sbb-timetable-row >>> sbb-card');
      const changeSpy = await page.spyOnEvent('click');

      await card.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });
  });
});
