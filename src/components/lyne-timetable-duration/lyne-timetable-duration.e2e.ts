import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-duration', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-duration></lyne-timetable-duration>');

    element = await page.find('lyne-timetable-duration');
    expect(element)
      .toHaveClass('hydrated');
  });

});
