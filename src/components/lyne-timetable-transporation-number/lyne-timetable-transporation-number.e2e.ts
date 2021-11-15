import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-transporation-number', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-transporation-number></lyne-timetable-transporation-number>');

    element = await page.find('lyne-timetable-transporation-number');
    expect(element)
      .toHaveClass('hydrated');
  });

});
