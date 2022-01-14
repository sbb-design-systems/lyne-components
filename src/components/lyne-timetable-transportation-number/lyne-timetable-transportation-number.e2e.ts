import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-number.sample-data';

const config = JSON.stringify(sampleData.bus);

describe('lyne-timetable-transportation-number', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-transportation-number config='${config}'></lyne-timetable-transportation-number>`);

    element = await page.find('lyne-timetable-transportation-number');
    expect(element)
      .toHaveClass('hydrated');
  });

});
