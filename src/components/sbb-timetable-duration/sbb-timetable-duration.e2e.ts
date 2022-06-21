import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-duration.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-duration', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-duration config='${config}'></sbb-timetable-duration>`);

    element = await page.find('sbb-timetable-duration');
    expect(element).toHaveClass('hydrated');
  });
});
