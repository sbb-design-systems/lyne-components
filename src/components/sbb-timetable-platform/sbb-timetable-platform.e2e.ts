import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-platform.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-platform', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-platform config='${config}'></lyne-timetable-platform>`);

    element = await page.find('lyne-timetable-platform');
    expect(element)
      .toHaveClass('hydrated');
  });

});
