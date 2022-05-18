import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-barrier-free.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-barrier-free', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-barrier-free config='${config}'></lyne-timetable-barrier-free>`);

    element = await page.find('lyne-timetable-barrier-free');
    expect(element)
      .toHaveClass('hydrated');
  });

});
