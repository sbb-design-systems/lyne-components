import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-occupancy', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-occupancy></lyne-timetable-occupancy>');

    element = await page.find('lyne-timetable-occupancy');
    expect(element)
      .toHaveClass('hydrated');
  });

});
