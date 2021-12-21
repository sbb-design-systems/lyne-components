import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-time.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-transportation-time', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-transportation-time config='${config}'></lyne-timetable-transportation-time>`);

    element = await page.find('lyne-timetable-transportation-time');
    expect(element)
      .toHaveClass('hydrated');
  });

});
