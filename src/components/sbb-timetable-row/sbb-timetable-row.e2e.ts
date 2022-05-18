import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-row', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-row config='${config}'></lyne-timetable-row>`);

    element = await page.find('lyne-timetable-row');
    expect(element)
      .toHaveClass('hydrated');
  });

});
