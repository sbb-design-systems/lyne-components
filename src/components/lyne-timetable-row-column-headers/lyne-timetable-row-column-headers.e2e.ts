import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-row-column-headers.sample-data';

const config = JSON.stringify(sampleData);

describe('lyne-timetable-row-column-headers', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-row-column-headers config='${config}'></lyne-timetable-row-column-headers>`);

    element = await page.find('lyne-timetable-row-column-headers');
    expect(element)
      .toHaveClass('hydrated');
  });

});
