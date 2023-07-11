import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-park-and-rail.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-park-and-rail', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-park-and-rail config='${config}'></sbb-timetable-park-and-rail>`,
    );

    element = await page.find('sbb-timetable-park-and-rail');
    expect(element).toHaveClass('hydrated');
  });
});
