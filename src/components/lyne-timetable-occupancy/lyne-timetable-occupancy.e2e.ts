import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-occupancy.sample-data';

const config = JSON.stringify(sampleData[3]);

describe('lyne-timetable-occupancy', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-occupancy config='${config}'></lyne-timetable-occupancy>`);

    element = await page.find('lyne-timetable-occupancy');
    expect(element)
      .toHaveClass('hydrated');
  });

});
