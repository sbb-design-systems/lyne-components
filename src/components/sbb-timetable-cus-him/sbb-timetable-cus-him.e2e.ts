import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-cus-him.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-cus-him', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-timetable-cus-him config='${config}'></sbb-timetable-cus-him>`);

    element = await page.find('sbb-timetable-cus-him');
    expect(element).toHaveClass('hydrated');
  });
});
