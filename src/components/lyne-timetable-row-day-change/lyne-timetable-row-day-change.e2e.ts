import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-row-day-change', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-row-day-change></lyne-timetable-row-day-change>');

    element = await page.find('lyne-timetable-row-day-change');
    expect(element)
      .toHaveClass('hydrated');
  });

});
