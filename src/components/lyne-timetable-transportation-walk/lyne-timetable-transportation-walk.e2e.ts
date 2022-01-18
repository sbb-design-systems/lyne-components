import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-walk.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-transportation-walk', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-transportation-walk config='${config}'></lyne-timetable-transportation-walk>`);

    element = await page.find('lyne-timetable-transportation-walk');
    expect(element)
      .toHaveClass('hydrated');
  });

});
