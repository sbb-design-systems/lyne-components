import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-cus-him', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-cus-him></lyne-timetable-cus-him>');

    element = await page.find('lyne-timetable-cus-him');
    expect(element)
      .toHaveClass('hydrated');
  });

});
