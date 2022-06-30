import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-row', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-row config='${config}'></sbb-timetable-row>`);

    element = await page.find('sbb-timetable-row');
    expect(element).toHaveClass('hydrated');
  });
});
