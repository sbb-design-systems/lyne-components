import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-travel-hints.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-travel-hints', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-travel-hints config='${config}'></lyne-timetable-travel-hints>`);

    element = await page.find('lyne-timetable-travel-hints');
    expect(element)
      .toHaveClass('hydrated');
  });

});
