import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-park-and-rail.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-park-and-rail', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-park-and-rail config='${config}'></lyne-timetable-park-and-rail>`);

    element = await page.find('lyne-timetable-park-and-rail');
    expect(element)
      .toHaveClass('hydrated');
  });

});
