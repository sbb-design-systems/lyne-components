import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-platform.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-platform', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-platform config='${config}'></sbb-timetable-platform>`);

    element = await page.find('sbb-timetable-platform');
    expect(element)
      .toHaveClass('hydrated');
  });

});
