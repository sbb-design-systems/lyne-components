import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-duration.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-duration', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-duration config='${config}'></lyne-timetable-duration>`);

    element = await page.find('lyne-timetable-duration');
    expect(element)
      .toHaveClass('hydrated');
  });

});
