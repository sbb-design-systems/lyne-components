import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-occupancy.sample-data';

const config = JSON.stringify(sampleData[3]);

describe('sbb-timetable-occupancy', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-occupancy config='${config}'></sbb-timetable-occupancy>`);

    element = await page.find('sbb-timetable-occupancy');
    expect(element)
      .toHaveClass('hydrated');
  });

});
