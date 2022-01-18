import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-row-header.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-row-header', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-row-header config='${config}'></lyne-timetable-row-header>`);

    element = await page.find('lyne-timetable-row-header');
    expect(element)
      .toHaveClass('hydrated');
  });

});
