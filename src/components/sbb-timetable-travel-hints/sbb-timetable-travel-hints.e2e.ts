import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-travel-hints.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-travel-hints', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-timetable-travel-hints config='${config}'></sbb-timetable-travel-hints>`,
    );

    element = await page.find('sbb-timetable-travel-hints');
    expect(element).toHaveClass('hydrated');
  });
});
