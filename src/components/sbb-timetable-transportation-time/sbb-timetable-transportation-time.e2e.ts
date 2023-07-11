import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-transportation-time.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-time', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-transportation-time config='${config}'></sbb-timetable-transportation-time>`,
    );

    element = await page.find('sbb-timetable-transportation-time');
    expect(element).toHaveClass('hydrated');
  });
});
