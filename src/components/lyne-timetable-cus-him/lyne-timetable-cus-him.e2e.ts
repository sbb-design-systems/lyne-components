import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-cus-him.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('lyne-timetable-cus-him', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-cus-him config='${config}'></lyne-timetable-cus-him>`);

    element = await page.find('lyne-timetable-cus-him');
    expect(element)
      .toHaveClass('hydrated');
  });

});
