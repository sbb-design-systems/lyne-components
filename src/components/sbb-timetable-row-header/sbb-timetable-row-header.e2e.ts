import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row-header.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-row-header', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-row-header config='${config}'></sbb-timetable-row-header>`,
    );

    element = await page.find('sbb-timetable-row-header');
    expect(element).toHaveClass('hydrated');
  });
});
