import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-barrier-free.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-barrier-free', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-barrier-free config='${config}'></sbb-timetable-barrier-free>`,
    );

    element = await page.find('sbb-timetable-barrier-free');
    expect(element).toHaveClass('hydrated');
  });
});
