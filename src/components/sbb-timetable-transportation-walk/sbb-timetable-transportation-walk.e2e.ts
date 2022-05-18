import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-transportation-walk.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-walk', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-transportation-walk config='${config}'></sbb-timetable-transportation-walk>`);

    element = await page.find('sbb-timetable-transportation-walk');
    expect(element)
      .toHaveClass('hydrated');
  });

});
