import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-details.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-transportation-details', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-transportation-details config='${config}'></lyne-timetable-transportation-details>`);

    element = await page.find('lyne-timetable-transportation-details');
    expect(element)
      .toHaveClass('hydrated');
  });

});
