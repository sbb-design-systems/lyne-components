import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-timetable-row-button.events';

describe('sbb-timetable-row-button', () => {
  let element, page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-timetable-row-button></sbb-timetable-row-button>');
  });

  it('renders', async () => {
    element = await page.find('sbb-timetable-row-button');
    expect(element).toHaveClass('hydrated');
  });

  describe('toggle expanded attribute', () => {
    it('emit event on click', async () => {
      await page.waitForChanges();
      const timetableRowButton = await page.find('sbb-timetable-row-button');
      const changeSpy = await page.spyOnEvent(events.sbbTimetableRowButtonClick);
      await timetableRowButton.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });
  });
});
