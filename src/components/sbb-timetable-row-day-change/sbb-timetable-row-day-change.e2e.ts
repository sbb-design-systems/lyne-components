import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row-day-change.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-row-day-change', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-row-day-change config='${config}'></sbb-timetable-row-day-change>`,
    );

    element = await page.find('sbb-timetable-row-day-change');
    expect(element).toHaveClass('hydrated');
  });
});
