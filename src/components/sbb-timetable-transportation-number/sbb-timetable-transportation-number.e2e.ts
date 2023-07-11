import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-transportation-number.sample-data';

const config = JSON.stringify(sampleData.bus);

describe('sbb-timetable-transportation-number', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-transportation-number config='${config}'></sbb-timetable-transportation-number>`,
    );

    element = await page.find('sbb-timetable-transportation-number');
    expect(element).toHaveClass('hydrated');
  });
});
