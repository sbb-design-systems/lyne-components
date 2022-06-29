import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-transportation-details.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-details', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-transportation-details config='${config}'></sbb-timetable-transportation-details>`
    );

    element = await page.find('sbb-timetable-transportation-details');
    expect(element).toHaveClass('hydrated');
  });
});
