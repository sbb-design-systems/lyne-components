import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row-column-headers.sample-data';

const config = JSON.stringify(sampleData);

describe('sbb-timetable-row-column-headers', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-row-column-headers config='${config}'></sbb-timetable-row-column-headers>`,
    );

    element = await page.find('sbb-timetable-row-column-headers');
    expect(element).toHaveClass('hydrated');
  });
});
